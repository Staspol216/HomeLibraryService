import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAlbumDto, CreateAlbumDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    private readonly dataSource: DataSource,
  ) {}
  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }
  async getById(id: string): Promise<Album> {
    try {
      return await this.albumRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
  async create(dto: CreateAlbumDto): Promise<Album> {
    let createdAlbum = null;
    const { artist, ...albumCreateData } = dto;

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdAlbum = await queryRunner.manager.save(
        Album,
        new Album(albumCreateData),
      );
      if (artist) {
        await queryRunner.manager.save(Artist, new Artist(artist));
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return createdAlbum;
    // !DONE
    // здесь можно попробовать более сложную логику реализовать, допустим нам нужно создать альбом
    // с новым артистом, т.е. передать сразу данные для создания альбома и для создания артиста
    // этот кейс предлагаю решить через транзакции в БД, чтобы в едином месте обработать два запроса на создание
  }

  async update(dto: UpdateAlbumDto, id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { artist, ...albumUpdateData } = dto;

    const updatedAlbum = await this.albumRepository.save({
      ...album,
      ...albumUpdateData,
    });
    return new Album(updatedAlbum);
  }

  async delete(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    // this.favoriteService.removeIdByDeleting(id, FavoriteEntities.Albums);
    // const targetAlbum = this.db.albums[albumIndex];
    // this.db.albums.splice(albumIndex, 1);
    // this.db.tracks.forEach((track) => {
    //   if (track.albumId === targetAlbum.id) {
    //     track.albumId = null;
    //   }
    // });
    return `Album with id ${id} has been deleted`;
  }
}
