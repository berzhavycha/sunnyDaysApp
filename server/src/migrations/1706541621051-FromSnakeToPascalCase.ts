import { MigrationInterface, QueryRunner } from 'typeorm';

export class FromSnakeToPascalCase1706541621051 implements MigrationInterface {
  name = 'FromSnakeToPascalCase1706541621051'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "refresh_token" TO "refreshToken"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "refreshToken" TO "refresh_token"`,
    );
  }
}
