import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { Track } from './interfaces/track.interface';
import { TrackService } from './track.service';
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
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Track> {
    return this.trackService.getById(uuid);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(204)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.trackService.delete(uuid);
  }
}
