import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { RegisterDto } from './dto/register-request.dto';
import { LoginDto } from './dto/login-request.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { OtpQueryDto } from './dto/otp-query.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @AcceptFormData()
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @AcceptFormData()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req, @Res() res) {
    const result = await this.authService.validateGoogleUser(req.user);

    return res.redirect(
      `${process?.env?.FRONT_SERVER}?token=${result.accessToken}`,
    );
  }

  @Post('send-otp')
  @AcceptFormData()
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() body: SendOtpDto, @Query() query: OtpQueryDto) {
    return this.authService.sendOtp(body, query);
  }

  @Post('verify-otp')
  @AcceptFormData()
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() body: VerifyOtpDto, @Query() query: OtpQueryDto) {
    return this.authService.verifyOtp(body, query);
  }

  @Patch('reset-password')
  @AcceptFormData()
  async resetPassword(@Body() body: LoginDto) {
    return this.authService.resetPassword(body);
  }
}
