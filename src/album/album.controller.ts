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
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/factory/ability.factory';
import { Album } from './entities/album.entity';
import { AbilityGuard } from 'src/ability/ability.guard';
@UseGuards(AbilityGuard)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: Album })
  async findAll(): Promise<IAlbum[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities({ action: Action.Read, subject: Album })
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IAlbum> {
    return await this.albumService.getById(uuid);
  }

  @Post()
  @CheckAbilities({ action: Action.Create, subject: Album })
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities({ action: Action.Update, subject: Album })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumService.update(dto, uuid);
  }

  @Delete(':uuid')
  @CheckAbilities({ action: Action.Delete, subject: Album })
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return await this.albumService.delete(uuid);
  }
}
