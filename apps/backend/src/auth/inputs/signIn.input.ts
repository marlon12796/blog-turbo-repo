import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @Field({ description: 'Contraseña del usuario (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
