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
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IArtist> {
    return this.artistService.getById(uuid);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.artistService.delete(uuid);
  }
}
