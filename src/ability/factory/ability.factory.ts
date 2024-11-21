import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  Ability,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { FavAlbum } from 'src/favorite/entities/FavAlbum.entity';
import { FavArtist } from 'src/favorite/entities/FavArtist.entity';
import { FavTrack } from 'src/favorite/entities/FavTrack.entity';
import { Favorites } from 'src/favorite/interfaces/favorite.interface';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRoles } from 'src/user/roles/roles.eum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subject =
  | InferSubjects<
      | typeof User
      | typeof Album
      | typeof Artist
      | typeof Track
      | typeof FavAlbum
      | typeof FavArtist
      | typeof FavTrack
      | typeof Favorites
    >
  | 'all';

export type AppAbility = Ability<[Action, Subject]>;

type AbilityUserPayload = Pick<User, 'id' | 'login' | 'role'>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: AbilityUserPayload) {
    const { can, build } = new AbilityBuilder<AppAbility>(Ability);
    if (user.role === UserRoles.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, [Album, Artist, Track, Favorites]);
      can(Action.Manage, [FavAlbum, FavArtist, FavTrack]);
      can(Action.Delete, User, { id: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  }
}
