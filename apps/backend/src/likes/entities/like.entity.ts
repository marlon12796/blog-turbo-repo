import { ObjectType, Field, Int, OmitType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LikeWithoutRelations {
  @Field(() => Int, { description: 'Identificador único del like' })
  id: number;

  @Field(() => Int, { description: 'ID de la publicación' })
  postId: number;

  @Field(() => Int, { description: 'ID del usuario' })
  userId: number;

  @Field(() => Boolean, { description: 'Indica si el usuario ha dado like' })
  liked: boolean;

  @Field(() => Date, { description: 'Fecha de creación del like' })
  createdAt: Date;
}
@ObjectType()
export class Like extends OmitType(LikeWithoutRelations, ['postId', 'userId']) {
  @Field(() => Post, { description: 'Publicación a la que se le ha dado like' })
  post: Post;

  @Field(() => User, { description: 'Usuario que ha dado like' })
  user: User;
}
