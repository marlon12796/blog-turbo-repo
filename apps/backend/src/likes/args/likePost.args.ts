import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class LikePostArgs {
  @Field(() => Int)
  @IsInt({ message: 'El postId debe ser un número entero' })
  postId: number;
}
