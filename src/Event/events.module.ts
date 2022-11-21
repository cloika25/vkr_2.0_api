import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { StagesModule } from 'src/stages/stages.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Events]),
    StagesModule
  ],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule { }
