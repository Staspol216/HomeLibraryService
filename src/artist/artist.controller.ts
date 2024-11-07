import { CreateArtistDto, UpdateArtistDto } from './dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistService } from './artist.service';
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
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AbilityGuard } from 'src/ability/ability.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/factory/ability.factory';
import { Artist } from './entities/artist.entity';
@UseGuards(AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: Artist })
  async findAll(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities({ action: Action.Read, subject: Artist })
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IArtist> {
    return this.artistService.getById(uuid);
  }

  @Post()
  @CheckAbilities({ action: Action.Create, subject: Artist })
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities({ action: Action.Update, subject: Artist })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(dto, uuid);
  }

  @Delete(':uuid')
  @CheckAbilities({ action: Action.Delete, subject: Artist })
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.artistService.delete(uuid);
  }
}
