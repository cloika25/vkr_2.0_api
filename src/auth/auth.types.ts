import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, ValidateIf } from 'class-validator';

/** Запрос на логин */
export class LoginRequest {
  @ApiProperty({ description: 'Логин', nullable: false })
  login: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password: string;
}

export class RegistrationRequest {
  @ApiProperty({ description: 'Логин', nullable: false })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ValidateIf((o) => o.email)
  @ApiProperty({ description: 'Email', nullable: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Имя', nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Фамилия', nullable: false })
  @IsString()
  @IsNotEmpty()
  surname: string;
}
