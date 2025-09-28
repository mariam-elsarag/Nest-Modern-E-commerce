import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AcceptFormData } from 'src/common/decrators/accept-form-data.decorator';
import { RegisterDto } from './dto/register-request.dto';
import { LoginDto } from './dto/login-request.dto';

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
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
