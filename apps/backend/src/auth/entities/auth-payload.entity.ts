import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Respuesta de autenticación con datos del usuario y token de acceso' })
export class AuthPayload {
  @Field(() => Int, { description: 'Identificador único del usuario autenticado' })
  id: number;

  @Field({ description: 'Nombre del usuario' })
  name: string;

  @Field({ nullable: true, description: 'URL del avatar del usuario (opcional)' })
  avatar?: string;

  @Field({ description: 'Token de acceso para autenticación' })
  accessToken: string;

  @Field({ description: 'Email del usuario' })
  email: string;
}
