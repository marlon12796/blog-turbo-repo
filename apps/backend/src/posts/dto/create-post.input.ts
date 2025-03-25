import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, MinLength, ArrayMinSize, IsNumber } from 'class-validator';

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

  @Field(() => [String])
  @IsString({ each: true })
  @Transform(({ value }) => value.map((tag: string) => tag.trim().toLowerCase()))
  @ArrayMinSize(1, { message: 'At least one tag is required' })
  tags: string[];

  @Field({ nullable: true })
  @IsBoolean()
  published: boolean;
}
@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
