import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './inputs/signIn.input';
import { DBSetup, UserTable } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { UsersService } from '@/users/users.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from '@/auth/types/jwt-auth.type';
import { AuthPayload } from '@/auth/entities/auth-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DB) private readonly db: DBSetup,
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}
  async validateLocalUser(signInInput: SignInInput) {
    const user = await this.userService.findOneByEmail(signInInput.email);
    const isMatchPassword = await verify(user.password, signInInput.password);
    if (!isMatchPassword) throw new UnauthorizedException('Contraseña incorrecta');

    return user;
  }
  async login(user: UserTable): Promise<AuthPayload> {
    const accessToken = await this.generateUserToken({ email: user.email, id: user.id });
    return {
      accessToken,
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
  }
  async generateUserToken(user: Pick<UserTable, 'id' | 'email'>) {
    const payload: AuthJwtPayload = { email: user.email, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }

  async validateUser(payload: AuthJwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
  }
}
