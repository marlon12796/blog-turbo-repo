import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './inputs/signIn.input';
import { DBSetup, UserTable } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { UsersService } from '@/users/users.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

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
  async login(user: UserTable) {
    const accessToken = this.generateUserToken({ email: user.email, id: user.id });
  }
  async generateUserToken(user: Pick<UserTable, 'id' | 'email'>) {
    const payload = { email: user.email, id: user.id };

    return await this.jwtService.signAsync(payload);
  }
}
