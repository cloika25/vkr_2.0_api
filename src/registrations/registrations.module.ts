import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistrationsController } from './registrations.controller';
import { Registrations } from './registrations.model';
import { RegistrationsService } from './registrations.service';

@Module({
  imports: [SequelizeModule.forFeature([Registrations])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
