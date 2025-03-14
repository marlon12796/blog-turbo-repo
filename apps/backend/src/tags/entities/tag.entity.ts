import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => Int, { description: 'Identificador único del tag' })
  id: number;

  @Field(() => String, { description: 'Nombre del tag' })
  name: string;

  @Field(() => [Post], { description: 'Publicaciones relacionadas con el tag' })
  posts: Post[];
}
