import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIsAdmin1731998703435 implements MigrationInterface {
  name = 'RemoveIsAdmin1731998703435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
    );
  }
}
