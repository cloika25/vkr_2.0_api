import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModule } from '../Event/events.module';
import { StagesController } from './stages.controller';
import { Stages } from './stages.model';
import { StagesService } from './stages.service';

@Module({
  imports: [SequelizeModule.forFeature([Stages]), EventsModule],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
