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
import { AbilityGuard } from 'src/ability/ability.guard';
import {
  CreateAlbumAbilityHandler,
  DeleteAlbumAbilityHandler,
  ReadAlbumAbilityHandler,
  UpdateAlbumAbilityHandler,
} from 'src/ability/handlers/album';
@UseGuards(AbilityGuard)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @CheckAbilities(new ReadAlbumAbilityHandler())
  async findAll(): Promise<IAlbum[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities(new ReadAlbumAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IAlbum> {
    return await this.albumService.getById(uuid);
  }

  @Post()
  @CheckAbilities(new CreateAlbumAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities(new UpdateAlbumAbilityHandler())
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumService.update(dto, uuid);
  }

  @Delete(':uuid')
  @CheckAbilities(new DeleteAlbumAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return await this.albumService.delete(uuid);
  }
}
