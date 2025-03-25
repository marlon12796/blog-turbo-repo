import { ObjectType, Field, Int, OmitType } from '@nestjs/graphql';
import { Tag, TagWithoutPost } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType({ description: 'Post sin relaciones con otras entidades.' })
export class PostWithoutRelations {
  @Field(() => Int, { description: 'Identificador único del post.' })
  id: number;

  @Field(() => String, { description: 'Slug de la publicación.' })
  slug: string;

  @Field(() => String, { description: 'Título de la publicación.' })
  title: string;

  @Field(() => String, { description: 'Contenido principal del post.' })
  content: string;

  @Field(() => String, { nullable: true, description: 'URL de la imagen en miniatura del post.' })
  thumbnail?: string;

  @Field(() => Boolean, { description: 'Indica si la publicación está publicada o en borrador.' })
  published: boolean;

  @Field(() => Date, { description: 'Fecha de creación del post.' })
  createdAt: Date;

  @Field(() => Date, { description: 'Última fecha de actualización del post.' })
  updatedAt: Date;

  @Field(() => Int, { description: 'ID del autor de la publicación.' })
  authorId: number;
}

@ObjectType({ description: 'Representa una publicación en la plataforma con relaciones.' })
export class Post extends OmitType(PostWithoutRelations, ['authorId']) {
  @Field(() => [Tag], { description: 'Etiquetas asociadas al post.' })
  tags: TagWithoutPost[];

  @Field(() => User, { description: 'Usuario que creó el post.' })
  author: User;
}
