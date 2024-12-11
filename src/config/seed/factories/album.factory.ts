import { Album } from '../../../album/entities/album.entity';
import { setSeederFactory } from 'typeorm-extension';

export const AlbumFactory = setSeederFactory(Album, (faker) => {
  const album = new Album({
    id: faker.string.uuid(),
    year: faker.number.int({ min: 1970, max: 2020 }),
    name: faker.word.adjective(),
  });

  return album;
});
