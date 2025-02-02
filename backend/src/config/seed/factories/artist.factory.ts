import { Artist } from '../../../artist/entities/artist.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ArtistFactory = setSeederFactory(Artist, (faker) => {
  const track = new Artist({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    grammy: faker.datatype.boolean(),
  });

  return track;
});
