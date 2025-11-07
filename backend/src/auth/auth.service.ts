import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register-request.dto';
import { LoginDto } from './dto/login-request.dto';
import { AccountStatus, UserRole } from 'src/common/utils/enum';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtPayload } from 'src/common/utils/types';
import { plainToInstance } from 'class-transformer';
import { MailService } from 'src/mail/mail.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { OtpQueryDto } from './dto/otp-query.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Address } from 'src/address/entities/address.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  /**
   *Create New account
   * @Param body (fullName, phone,email,password)
   * @returns message explain that otp has send to user email
   */
  async register(body: RegisterDto) {
    const { email, password } = body;
    await this.checkUserExist(email, true);
    const hashPassword = await this.hashPassword(password);
    const newUser = {
      ...body,
      password: hashPassword,
    };

    const user = await this.userRepository.save(newUser);
    const otp = await this.generateOtp(3, user);
    await this.mailService.activateAccountEmail(
      user.email,
      user.fullName,
      otp,
      `${process.env.FRONT_SERVER}/${user?.email}/activate-account`,
      'Activate Account',
      'activate your account',
      3,
    );
    return {
      message:
        'Registration successful. We’ve sent an activation code to your email to activate your account.',
      email: user.email,
    };
  }

  /**
   *Login
   * @param body
   * @returns
   */
  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.checkUserExist(email, false);

    if (user) {
      // check password
      if (user.password == null) {
        throw new BadRequestException(
          'The email or password you entered is incorrect.',
        );
      }
      // compare password
      if (
        user.password &&
        !(await this.comparePassword(password, user.password))
      ) {
        throw new BadRequestException(
          'The email or password you entered is incorrect.',
        );
      }

      //check status
      if (user.status === AccountStatus.Blocked) {
        throw new ForbiddenException(
          'Your account has been blocked. Please contact support for more information.',
        );
      }
      if (user.status === AccountStatus.Pending) {
        //will send otp

        if (
          !user?.otpExpiredAt ||
          (user.otpExpiredAt && this.isOtpExpire(user.otpExpiredAt))
        ) {
          const otp = await this.generateOtp(3, user);
          await this.mailService.activateAccountEmail(
            user.email,
            user.fullName,
            otp,
            `${process.env.FRONT_SERVER}/${user?.email}/activate-account`,
            'Activate Account',
            'activate your account',
            3,
          );
        }
        throw new BadRequestException({
          message:
            'Your account is not active. Please verify your account first. An OTP has been sent to your email for verification.',
          details: { email: email },
          error: 'activate_account',
        });
      }
      const payload: JwtPayload = {
        id: user.id,
        role: user.role,
        email: user.email,
      };
      const token = await this.generateJwtToken(payload);
      return plainToInstance(
        LoginResponseDto,
        { ...user, token },
        {
          excludeExtraneousValues: true,
        },
      );
    }
  }

  /**
   * Send otp
   * @param body
   * @param query
   * @returns message
   */
  async sendOtp(body: SendOtpDto, query: OtpQueryDto) {
    const { email } = body;
    const user = await this.checkUserExist(email, false);
    if (user) {
      const otp = await this.generateOtp(3, user);
      let type = 'Activate Account';
      let title = 'activate your account';
      let link = 'activate-account';
      if (query.type === 'forget') {
        type = 'Verify account';
        title = 'verify account';
        link = 'verify-account';
      }
      await this.mailService.activateAccountEmail(
        user.email,
        user.fullName,
        otp,
        `${process.env.FRONT_SERVER}/${user?.email}/${link}`,
        type,
        title,
        3,
      );
      return { message: 'OTP sent successfully' };
    }
  }

  /**
   *Verify otp
   * @param body
   * @param query
   * @returns message
   */
  async verifyOtp(body: VerifyOtpDto, query: OtpQueryDto) {
    const { email, otp } = body;
    const user = await this.checkUserExist(email, false);
    if (user) {
      // check if he has no otp
      if (!user.otp || !user.otpExpiredAt) {
        throw new BadRequestException('No OTP was generated for this user');
      }

      //check is it a valid otp
      if (!(await this.comparePassword(otp, user.otp))) {
        throw new BadRequestException('Invalid Otp');
      }

      // check expire
      if (this.isOtpExpire(user.otpExpiredAt)) {
        throw new BadRequestException('OTP expired');
      }

      if (query.type === 'forget') {
        user.isPasswordReset = true;
      } else {
        user.status = AccountStatus.Active;
      }
      user.otpExpiredAt = null;
      user.otp = null;
      await this.userRepository.save(user);
      return { message: 'OTP verified successfully' };
    }
  }

  /**
   * Reset password
   * @param body
   * @returns
   */
  async resetPassword(body: LoginDto) {
    const { email, password } = body;
    const user = await this.checkUserExist(email, false);
    if (user) {
      if (!user.isPasswordReset) {
        throw new BadRequestException(
          'Please verify the OTP before changing your password',
        );
      }

      if (user.status === AccountStatus.Pending) {
        throw new BadRequestException(
          'Please activate your account before changing  password',
        );
      }
      if (user.status === AccountStatus.Blocked) {
        throw new BadRequestException(
          'Your account has been blocked. Please contact support for more information.',
        );
      }
      const hashedPassword = await this.hashPassword(password);
      user.password = hashedPassword;
      user.passwordChangedAt = new Date();
      user.isPasswordReset = false;
      await this.userRepository.save(user);
      return { message: 'Password changed successfully' };
    }
  }

  async changePassword(body: ChangePasswordDto, user: User) {
    const { password, oldPassword } = body;
    if (user.status === AccountStatus.Pending) {
      throw new BadRequestException(
        'Please activate your account before changing  password',
      );
    }
    if (user.status === AccountStatus.Blocked) {
      throw new ForbiddenException(
        'Your account has been blocked. Please contact support for more information.',
      );
    }

    if (
      user.password &&
      !(await this.comparePassword(oldPassword, user.password))
    ) {
      throw new BadRequestException('Incorrect old password.');
    }

    if (
      user.password &&
      (await this.comparePassword(password, user.password))
    ) {
      throw new BadRequestException(
        'New password cannot be the same as the old password.',
      );
    }

    user.password = await this.hashPassword(password);
    user.passwordChangedAt = new Date();

    await this.userRepository.save(user);
    return { message: 'Password changed successfully' };
  }

  async inviteAdmin(body: CreateUserDto) {
    const { email, ...rest } = body;
    await this.checkUserExist(email, true);
    const user = await this.userRepository.save({
      ...body,
      status: AccountStatus.Active,
      role: UserRole.ADMIN,
    });
    const otp = await this.generateOtp(3, user);
    await this.mailService.activateAccountEmail(
      user.email,
      user.fullName,
      otp,
      `${process.env.ADMIN_SERVER}/${user?.email}/verify-account`,
      'Verify',
      'verify your email and set your password',
      3,
    );
    return {
      message: 'Admin invitation sent successfully with OTP.',
      ...body,
    };
  }

  async createOrReturnUserFromOrder(
    email: string,
    fullName: string,
    address: CreateAddressDto,
  ) {
    email = email.toLowerCase().trim();
    let user = await this.checkUserExist(email, false);

    if (!user?.id) {
      const newUser = this.userRepository.create({
        email,
        fullName,
        status: AccountStatus.Active,
      });

      user = await this.userRepository.save(newUser);

      await this.addressRepository.save({
        user,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      });
    }

    return user;
  }

  /**
   * Check user exist
   * @param email
   * @param showErrorIfExist
   * @returns user if showErrorIfExist false
   */
  private async checkUserExist(email: string, showErrorIfExist: boolean) {
    const user = await this.userRepository.findOne({
      where: { email: email.toLocaleLowerCase() },
    });
    if (showErrorIfExist) {
      if (user) {
        throw new BadRequestException({
          message: 'Email already exists',
          error: { email: 'Email already exists' },
        });
      }
    } else {
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  }

  /**
   * hash Password
   * @param password
   * @returns hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Compare password
   * @param password
   * @param hashPassword
   * @returns booleans
   */
  private async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  /**
   * Generate jwt token
   * @param payload
   * @returns access token
   */
  private async generateJwtToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }

  /**
   * Generate otp
   * @param expire
   * @param user
   * @returns otp
   */
  private async generateOtp(expire: number, user: User): Promise<string> {
    const otp = Math.floor(Math.random() * 900000 + 100000).toString();
    const hashedOtp = await this.hashPassword(otp);
    user.otp = hashedOtp;
    user.otpExpiredAt = new Date(Date.now() + expire * 60 * 1000);
    await this.userRepository.save(user);
    return otp;
  }

  /**
   * Check opt expire
   * @param otpExpireAt
   * @returns  boolean
   */
  private isOtpExpire(otpExpireAt: Date): boolean {
    return otpExpireAt.getTime() < Date.now();
  }
}
