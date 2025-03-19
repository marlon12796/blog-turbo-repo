import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { CurrentUser } from './decorators/user.decorators';
import { UserTable } from '@/db/types/db.types';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleRedirect(@CurrentUser() user: UserTable, @Res() res: Response) {
    const userData = await this.authService.login(user);
    const url: string = this.configService.get('app.FRONTEND_URL');
    res.redirect(
      `${url}/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`
    );
  }
}
