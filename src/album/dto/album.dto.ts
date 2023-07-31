import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class AlbumDto {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(dto: CreateAlbumDto) {
    this.id = uuidv4();
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto?.artistId || null;
  }
}

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
