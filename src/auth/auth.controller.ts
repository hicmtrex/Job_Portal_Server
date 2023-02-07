import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() userData: RegisterAuthDto, @Res() res: Response) {
    return this.authService.register(userData, res);
  }

  @Post('login')
  login(@Body() userData: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(userData, res);
  }

  @Get('refresh')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}
