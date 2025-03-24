import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  content: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];

  @Field({ nullable: true })
  @IsBoolean()
  published: boolean;
}
