import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import jwtConfig from '@/common/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from '@/auth/types/jwt-auth.type';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY) protected jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfiguration.secret
    });
  }

  async validate(payload: AuthJwtPayload) {
    const currentTime = Math.floor(Date.now() / 1000);
    const { exp, sub } = payload;
    if (exp <= currentTime) throw new UnauthorizedException('El token ha expirado.');

    const user = await this.authService.validateUser({ email: payload.email, sub });
    return user;
  }
}
