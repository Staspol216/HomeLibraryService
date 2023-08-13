import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
