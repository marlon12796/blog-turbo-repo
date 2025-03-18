import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthConfig } from '@/common/config/auth.config';
import { AuthService } from '@/auth/auth.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    const authConfig = configService.get<AuthConfig>('auth');
    super({
      clientID: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
      callbackURL: authConfig.google.callbackUrl,
      scope: ['email', 'profile']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      if (!profile.emails?.length || !profile.photos?.length) {
        throw new UnauthorizedException('Google profile data is incomplete.');
      }

      const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        password: null
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
