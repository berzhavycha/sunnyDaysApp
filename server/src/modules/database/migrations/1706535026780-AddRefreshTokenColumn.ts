import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumn1706535026780 implements MigrationInterface {
  name = 'AddRefreshTokenColumn1706535026780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "refresh_token_hash" VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token_hash"`);
  }
}
