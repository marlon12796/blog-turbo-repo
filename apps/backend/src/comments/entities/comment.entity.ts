import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
export class CommentWithoutRelations {
  @Field(() => Int, { description: 'Identificador único del comentario' })
  id: number;

  @Field(() => String, { description: 'Contenido del comentario' })
  content: string;

  @Field(() => Date, { description: 'Fecha en que se creó el comentario' })
  createdAt: Date;

  @Field(() => Date, { description: 'Fecha de la última actualización del comentario' })
  updatedAt: Date;
}

@ObjectType()
export class Comment extends CommentWithoutRelations {
  @Field(() => User, { description: 'Autor del comentario' })
  author: User;

  @Field(() => Post, { description: 'Publicación a la que pertenece el comentario' })
  post: Post;
}
