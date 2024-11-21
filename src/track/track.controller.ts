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
import {
  CreateTrackAbilityHandler,
  DeleteTrackAbilityHandler,
  ReadTrackAbilityHandler,
  UpdateTrackAbilityHandler,
} from 'src/ability/handlers/track';
import { RolesGuard } from 'src/user/roles/roles.guard';
import { UserRoles } from 'src/user/roles/roles.eum';
import { Roles } from 'src/user/roles/roles.decorator';
@UseGuards(RolesGuard, AbilityGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @CheckAbilities(new ReadTrackAbilityHandler())
  async findAll(): Promise<ITrack[]> {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new ReadTrackAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<ITrack> {
    return this.trackService.getById(uuid);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  @Roles(UserRoles.Manager)
  @CheckAbilities(new CreateTrackAbilityHandler())
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new UpdateTrackAbilityHandler())
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(dto, uuid);
  }

  @Delete(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new DeleteTrackAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.trackService.delete(uuid);
  }
}
