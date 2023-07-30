import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBModule } from './DB/db.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, TrackModule, DBModule],
})
export class AppModule {}
