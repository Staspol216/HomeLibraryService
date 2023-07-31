import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBModule } from './DB/db.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, TrackModule, DBModule, ArtistModule, AlbumModule],
})
export class AppModule {}
