import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
@ObjectType()
export class User {
  @Field(() => Int, { description: 'Identificador único del usuario' })
  id: number;

  @Field(() => String, { description: 'Nombre completo del usuario' })
  name: string;

  @Field(() => String, { description: 'Correo electrónico del usuario' })
  email: string;

  @Field(() => String, { nullable: true, description: 'Biografía o descripción personal del usuario' })
  bio?: string;

  @Field(() => String, { nullable: true, description: 'URL de la foto de perfil del usuario' })
  avatar?: string;

  @Field(() => Date, { description: 'Fecha en que se creó el usuario' })
  createdAt: Date;

  @Field(() => Date, { description: 'Fecha de la última actualización del usuario' })
  updatedAt: Date;
}

@ObjectType({ description: 'Usuario con relaciones a posts y comentarios' })
export class UserWithRelations extends User {
  @Field(() => [Post], { description: 'Publicaciones creadas por el usuario' })
  posts: Post[];

  @Field(() => [Comment], { description: 'Comentarios realizados por el usuario' })
  comments: Comment[];
}
