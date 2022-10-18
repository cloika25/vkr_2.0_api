import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModule } from './Event/events.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FormatModule } from './format/format.module';
import { StagesModule } from './stages/stages.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'vkrdb',
      autoLoadModels: true,
      synchronize: true,
    }),
    EventsModule,
    AuthModule,
    UsersModule,
    FormatModule,
    StagesModule,
    RegistrationsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {}
