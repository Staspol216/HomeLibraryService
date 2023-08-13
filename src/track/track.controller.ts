import { StatusCodes } from 'http-status-codes';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { ITrack } from './interfaces/track.interface';
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
  async findAll(): Promise<ITrack[]> {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<ITrack> {
    return this.trackService.getById(uuid);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(dto, uuid);
  }

  @Delete(':uuid')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.trackService.delete(uuid);
  }
}
