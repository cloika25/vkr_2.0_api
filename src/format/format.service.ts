import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Format } from './format.model';
import {
  FormatDto,
  GetFormatRequest,
  GetFormatResponse,
  PostFormatRequest,
} from './format.types';

@Injectable()
export class FormatService {
  constructor(
    @InjectModel(Format)
    private formatModel: typeof Format,
  ) {}

  async findAll(): Promise<Format[]> {
    return this.formatModel.findAll();
  }

  async getAllFormats(): Promise<GetFormatRequest> {
    const response = new GetFormatResponse();
    const allFormats = await this.findAll();
    response.totalCount = allFormats.length;
    response.entities = allFormats.map((format) => new FormatDto(format));
    return response;
  }

  findOne(id: number): Promise<Format> {
    return this.formatModel.findOne({
      where: {
        id,
      },
    });
  }

  async createFormat(format: PostFormatRequest) {
    const response = await this.formatModel.create({
      ...format,
    });
    return response.id;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
