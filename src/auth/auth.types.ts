import { ApiProperty } from '@nestjs/swagger';

/** Запрос на логин */
export class LoginRequest {
  @ApiProperty({ description: 'Логин', nullable: false })
  login: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password: string;
}

export class RegistrationRequest {
  @ApiProperty({ description: 'Логин', nullable: false })
  login: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password: string;

  @ApiProperty({ description: 'Email', nullable: true })
  email: string;

  @ApiProperty({ description: 'Имя', nullable: false })
  name: string;

  @ApiProperty({ description: 'Фамилия', nullable: false })
  surname: string;
}
