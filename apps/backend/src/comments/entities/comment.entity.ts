import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'Identificador único del comentario' })
  id: number;

  @Field(() => String, { description: 'Contenido del comentario' })
  content: string;

  @Field(() => Post, { description: 'Publicación a la que pertenece el comentario' })
  post: Post;

  @Field(() => User, { description: 'Autor del comentario' })
  author: User;

  @Field(() => Date, { description: 'Fecha en que se creó el comentario' })
  createdAt: Date;

  @Field(() => Date, { description: 'Fecha de la última actualización del comentario' })
  updatedAt: Date;
}
