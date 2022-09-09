import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormatService } from './format.service';
import {
  DeleteFormatRequest,
  GetFormatResponse,
  PostFormatRequest,
  PostFormatResponse,
  PutFormatRequest,
} from './format.types';

@ApiTags('Format')
@Controller('Format')
@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: GetFormatResponse })
  @ApiOperation({ summary: 'Получение форматов этапов' })
  async findAll() {
    return await this.formatService.getAllFormats();
  }

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: PostFormatResponse })
  @ApiOperation({ summary: 'Создание формата этапа' })
  async createFormat(@Body() data: PostFormatRequest) {
    return await this.formatService.createFormat(data);
  }

  @Put()
  @ApiOperation({ summary: 'Обновление названия формата' })
  async updateFormat(@Body() data: PutFormatRequest) {
    return await this.formatService.updateFormat(data);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление формата' })
  async deleteFormat(@Body() data: DeleteFormatRequest) {
    return await this.formatService.remove(data.id);
  }
}
