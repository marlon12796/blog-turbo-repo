import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int, { description: 'Identificador único de la publicación a la que pertenece el comentario' })
  @IsNumber()
  postId: number;

  @Field({ description: 'Contenido del comentario' })
  @IsString()
  @MinLength(3, { message: 'El comentario debe tener al menos 3 caracteres' })
  content: string;
}
