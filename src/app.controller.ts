import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginRequest, RegistrationRequest } from './auth/auth.types';
import { LocalAuthGuard } from './auth/localAuth.guard';

@ApiSecurity('JWT token', ['JWT token'])
@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: LoginRequest })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async registration(@Body() registerDto: RegistrationRequest) {
    return this.authService.registration(registerDto);
  }
}
