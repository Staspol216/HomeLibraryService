import { Track } from 'src/track/interfaces/track.interface';
import { User } from 'src/user/interfaces/user.interface';

export class DB {
  users: User[] = [];
  tracks: Track[] = [];
}
