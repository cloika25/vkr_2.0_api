import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormatModule } from '../format/format.module';
import { StagesController } from './stages.controller';
import { Stages } from './stages.model';
import { StagesService } from './stages.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Stages]),
    FormatModule
  ],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService]
})
export class StagesModule { }
