import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Events } from './events.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [SequelizeModule.forFeature([Events])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
