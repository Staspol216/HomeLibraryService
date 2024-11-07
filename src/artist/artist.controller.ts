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
import {
  CreateArtistAbilityHandler,
  DeleteArtistAbilityHandler,
  ReadArtistAbilityHandler,
  UpdateArtistAbilityHandler,
} from 'src/ability/handlers/artist';
@UseGuards(AbilityGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @CheckAbilities(new ReadArtistAbilityHandler())
  async findAll(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  @CheckAbilities(new ReadArtistAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IArtist> {
    return this.artistService.getById(uuid);
  }

  @Post()
  @CheckAbilities(new CreateArtistAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':uuid')
  @CheckAbilities(new UpdateArtistAbilityHandler())
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(dto, uuid);
  }

  @Delete(':uuid')
  @CheckAbilities(new DeleteArtistAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return this.artistService.delete(uuid);
  }
}
