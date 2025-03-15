import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

@InputType({ description: 'Datos requeridos para crear un nuevo usuario' })
export class CreateUserInput {
  @Field(() => String, { description: 'Nombre del usuario' })
  @IsString()
  name: string;

  @Field()
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    {
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
    }
  )
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
