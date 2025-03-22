import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { AuthPayload } from './entities/auth-payload.entity';
import { SignInInput } from './inputs/signIn.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    console.log(signInInput);
    const user = await this.authService.validateLocalUser(signInInput);
    return await this.authService.login(user);
  }
}
