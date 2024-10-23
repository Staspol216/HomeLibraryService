import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { IAlbum } from './interfaces/album.interface';
import { AlbumService } from './album.service';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Controller,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<IAlbum[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IAlbum> {
    return await this.albumService.getById(uuid);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return await this.albumService.delete(uuid);
  }
}
