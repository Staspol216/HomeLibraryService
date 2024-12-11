import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { User } from '../../user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { Album } from '../../album/entities/album.entity';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    console.log('seeding users...');
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);

    console.log('seeding artists...');
    const artistFactory = factoryManager.get(Artist);
    const artists = await artistFactory.saveMany(10);

    console.log('seeding albums...');
    const albumFactory = factoryManager.get(Album);
    const albumsWithoutAnyRelations = await albumFactory.saveMany(10);

    console.log('seeding tracks...');

    const trackFactory = factoryManager.get(Track);
    const tracks = await Promise.all(
      Array(20)
        .fill('')
        .map(async () => {
          const track = await trackFactory.make({
            album: faker.helpers.arrayElement(albumsWithoutAnyRelations),
            artist: faker.helpers.arrayElement(artists),
          });
          return track;
        }),
    );

    const trackRepo = dataSource.getRepository(Track);
    await trackRepo.save(tracks);

    const albumRepo = dataSource.getRepository(Album);

    await Promise.all(
      albumsWithoutAnyRelations.map(async (album) => {
        const savedAlbum = await albumRepo.update(album.id, {
          artist: faker.helpers.arrayElement(artists),
        });
        console.log(savedAlbum);
        return savedAlbum;
      }),
    );
  }
}
