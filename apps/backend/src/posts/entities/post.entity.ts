import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Representa una publicación en la plataforma.' })
export class Post {
  @Field(() => Int, { description: 'Identificador único del post.' })
  id: number;

  @Field(() => String, { description: 'Título de la publicación.' })
  title: string;

  @Field(() => String, { description: 'Contenido principal del post.' })
  content: string;

  @Field(() => String, { nullable: true, description: 'URL de la imagen en miniatura del post.' })
  thumbnail: string;

  @Field(() => Int, { description: 'ID del autor que creó el post.' })
  authorId: number;

  @Field(() => Boolean, { description: 'Indica si la publicación está publicada o en borrador.' })
  published: boolean;

  @Field(() => Date, { description: 'Fecha de creación del post.' })
  createdAt: Date;

  @Field(() => Date, { description: 'Última fecha de actualización del post.' })
  updatedAt: Date;
}
