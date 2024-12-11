import { Track } from '../../../track/entities/track.entity';
import { setSeederFactory } from 'typeorm-extension';

export const TrackFactory = setSeederFactory(Track, (faker) => {
  const track = new Track({
    id: faker.string.uuid(),
    name: faker.word.adjective(),
    duration: faker.number.int({ min: 1, max: 1000 }),
  });

  return track;
});
