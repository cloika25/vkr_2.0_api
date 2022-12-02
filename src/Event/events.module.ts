import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { StagesModule } from '../stages/stages.module';
import { FormatModule } from '../format/format.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Events]),
    StagesModule,
    FormatModule,
    UsersModule
  ],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule { }
