import { ApiProperty } from '@nestjs/swagger';

/** Запрос на логин */
export class LoginRequest {
  @ApiProperty({ description: 'Логин', nullable: false })
  login: string;

  @ApiProperty({ description: 'Пароль', nullable: false })
  password: string;
}
