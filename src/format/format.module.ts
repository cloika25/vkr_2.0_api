import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormatController } from './format.controller';
import { Format } from './format.model';
import { FormatService } from './format.service';

@Module({
  imports: [SequelizeModule.forFeature([Format])],
  controllers: [FormatController],
  providers: [FormatService],
  exports: [FormatService],
})
export class FormatModule {}
