import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './interfaces/album.interface';
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
@Controller('album')
export class AlbumController {
  constructor(private artistService: AlbumService) {}

  @Get()
  async findAll(): Promise<Album[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Album> {
    return this.artistService.getById(uuid);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateAlbumDto) {
    return this.artistService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.artistService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.artistService.delete(uuid);
  }
}
