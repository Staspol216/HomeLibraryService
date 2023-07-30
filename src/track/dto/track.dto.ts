import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class TrackDto {
  id: string;
  name: string;
  duration: number;
  albumId: string;
  artistId: string;

  constructor(dto: CreateTrackDto) {
    this.id = uuidv4();
    this.name = dto.name;
    this.duration = dto.duration;
    this.albumId = dto?.albumId || null;
    this.artistId = dto?.artistId || null;
  }
}

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album
}

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsString()
  @IsOptional()
  artistId: string;

  @IsString()
  @IsOptional()
  albumId: string;
}
