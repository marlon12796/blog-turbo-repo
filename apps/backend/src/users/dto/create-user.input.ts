import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Datos requeridos para crear un nuevo usuario' })
export class CreateUserInput {
  @Field(() => String, { description: 'Nombre del usuario' })
  @IsString()
  name: string;

  @Field({ description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @Field({ description: 'Correo electrónico del usuario' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @Field({ nullable: true, description: 'Biografía del usuario (opcional)' })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true, description: 'URL del avatar del usuario (opcional)' })
  @IsOptional()
  @IsString()
  avatar?: string;
}
