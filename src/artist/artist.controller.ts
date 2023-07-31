import { CreateArtistDto, UpdateArtistDto } from './dto';
import { Artist } from './interfaces/artist.interface';
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
} from '@nestjs/common';
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Artist> {
    return this.artistService.getById(uuid);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.artistService.delete(uuid);
  }
}
