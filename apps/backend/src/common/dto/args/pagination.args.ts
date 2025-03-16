import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Min } from 'class-validator';

@ArgsType()
export class PaginitionArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'El valor del offset debe ser un número entero.' })
  @Min(0, { message: 'El valor mínimo para offset es 0.' })
  offset: number = 0;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'El valor del limit debe ser un número entero.' })
  @Min(1, { message: 'El valor mínimo para limit es 1.' })
  limit: number = 10;
}
