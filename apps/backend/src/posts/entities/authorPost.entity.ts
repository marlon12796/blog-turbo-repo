import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
export class AuthorPost extends OmitType(Post, ['author', 'tags']) {
  @Field(() => Int, { description: 'Cantidad total de likes en el post.' })
  totalLikes: number;

  @Field(() => Int, { description: 'Cantidad total de comentarios en el post.' })
  totalComments: number;
}
