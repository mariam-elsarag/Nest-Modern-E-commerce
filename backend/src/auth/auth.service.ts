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
import { AccountStatus } from 'src/common/utils/enum';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtPayload } from 'src/common/utils/types';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
    let newUser = {
      ...body,
      password: hashPassword,
    };

    newUser = await this.userRepository.save(newUser);
    // send otp for activate account will be her
    return {
      message:
        'Registration successful. We’ve sent an activation code to your email to activate your account.',
      email: newUser.email,
    };
  }

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

        throw new BadRequestException(
          'Your account is not active. Please verify your account first. An OTP has been sent to your email for verification.',
        );
      }
      const payload: JwtPayload = { id: user.id, role: user.role };
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
