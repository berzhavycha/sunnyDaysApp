import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCitiesTable1708868662527 implements MigrationInterface {
  name = 'AddCitiesTable1708868662527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "cityName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "user_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "city_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "city_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "cityName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "userId" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
