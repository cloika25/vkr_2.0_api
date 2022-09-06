import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormatService } from './format.service';
import {
  GetFormatResponse,
  PostFormatRequest,
  PostFormatResponse,
} from './format.types';

@ApiTags('Format')
@Controller('Format')
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
}
