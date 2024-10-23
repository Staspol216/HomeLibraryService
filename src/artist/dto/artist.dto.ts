import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class ArtistDto {
  id: string;
  name: string;
  grammy: boolean;

  constructor(dto: CreateArtistDto) {
    this.id = uuidv4();
    this.name = dto.name;
    this.grammy = dto.grammy;
  }
}

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
