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
  UseGuards,
} from '@nestjs/common';
import { AbilityGuard } from 'src/ability/ability.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Action } from 'src/ability/factory/ability.factory';
import { Track } from './entities/track.entity';
@UseGuards(AbilityGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: Track })
  async findAll(): Promise<ITrack[]> {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities({ action: Action.Read, subject: Track })
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<ITrack> {
    return this.trackService.getById(uuid);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  @CheckAbilities({ action: Action.Create, subject: Track })
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities({ action: Action.Update, subject: Track })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(dto, uuid);
  }

  @Delete(':uuid')
  @CheckAbilities({ action: Action.Delete, subject: Track })
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.trackService.delete(uuid);
  }
}
