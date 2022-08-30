import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginRequest } from './auth/auth.types';
import { JwtAuthGuard } from './auth/jwtAuth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // TODO: заменить на JWT
  @ApiBody({ type: LoginRequest })
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
