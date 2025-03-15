import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import jwtConfig from '@/common/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy.guard';

@Module({
  providers: [AuthResolver, AuthService, UsersService, JwtStrategy],
  imports: [DbModule, UsersModule, JwtModule.registerAsync(jwtConfig.asProvider()), ConfigModule.forFeature(jwtConfig)]
})
export class AuthModule {}
