import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1732512263836 implements MigrationInterface {
  name = 'Initial1732512263836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_3d06f25148a4a880b429e3bc83" UNIQUE ("artistId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "albumId" uuid, "artistId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'client', "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "refreshToken" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "FavTrack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid, CONSTRAINT "REL_bd2b8ec450a8e4b8f41e74c556" UNIQUE ("trackId"), CONSTRAINT "PK_62e1329758795cabcf8aa62c0e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "FavAlbum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "REL_9f921553947bb30b78219bbaed" UNIQUE ("albumId"), CONSTRAINT "PK_797615119394df830279eafdef3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "FavArtist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, CONSTRAINT "REL_e59c22db667f0faa92ae9b176f" UNIQUE ("artistId"), CONSTRAINT "PK_76d6c79b9fd035c66b2ee104f28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "FavTrack" ADD CONSTRAINT "FK_bd2b8ec450a8e4b8f41e74c556e" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "FavAlbum" ADD CONSTRAINT "FK_9f921553947bb30b78219bbaede" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "FavArtist" ADD CONSTRAINT "FK_e59c22db667f0faa92ae9b176ff" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "FavArtist" DROP CONSTRAINT "FK_e59c22db667f0faa92ae9b176ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "FavAlbum" DROP CONSTRAINT "FK_9f921553947bb30b78219bbaede"`,
    );
    await queryRunner.query(
      `ALTER TABLE "FavTrack" DROP CONSTRAINT "FK_bd2b8ec450a8e4b8f41e74c556e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(`DROP TABLE "FavArtist"`);
    await queryRunner.query(`DROP TABLE "FavAlbum"`);
    await queryRunner.query(`DROP TABLE "FavTrack"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
