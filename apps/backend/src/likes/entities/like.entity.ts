import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Like {
  @Field(() => Int, { description: 'Identificador único de la like' })
  id: number;

  @Field(() => Post, { description: 'Publicación a la que se hace la like' })
  post: Post;

  @Field(() => User, { description: 'Usuario que realiza la like' })
  user: User;

  @Field(() => Date, { description: 'Fecha de creación de la like' })
  createdAt: Date;
}
