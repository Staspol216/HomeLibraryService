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
import { RolesGuard } from 'src/user/roles/roles.guard';
import { UserRoles } from 'src/user/roles/roles.eum';
import { Roles } from 'src/user/roles/roles.decorator';
@UseGuards(RolesGuard, AbilityGuard)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @CheckAbilities(new ReadAlbumAbilityHandler())
  async findAll(): Promise<IAlbum[]> {
    return await this.albumService.findAll();
  }

  @Get(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new ReadAlbumAbilityHandler())
  async getById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<IAlbum> {
    return await this.albumService.getById(uuid);
  }

  @Post()
  @Roles(UserRoles.Manager)
  @CheckAbilities(new CreateAlbumAbilityHandler())
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Put(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new UpdateAlbumAbilityHandler())
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumService.update(dto, uuid);
  }

  @Delete(':uuid')
  @Roles(UserRoles.Manager)
  @CheckAbilities(new DeleteAlbumAbilityHandler())
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<string> {
    return await this.albumService.delete(uuid);
  }
}
