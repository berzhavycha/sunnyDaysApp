import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCitiesTable1707242922771 implements MigrationInterface {
    name = 'AddCitiesTable1707242922771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "cityName"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_a87248d73155605cf782be9ee5e"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_fa24ccf2934569e3ebc99078db8" PRIMARY KEY ("id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "city_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_fa24ccf2934569e3ebc99078db8"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_cab773148119c55639e2cc4eb0b" PRIMARY KEY ("id", "user_id", "city_id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_cab773148119c55639e2cc4eb0b"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_71b51db80abcbe7468f51498b70" PRIMARY KEY ("user_id", "city_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6dc328dcbf0a242f1a0ceede10" ON "subscriptions" ("city_id") `);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6dc328dcbf0a242f1a0ceede10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_71b51db80abcbe7468f51498b70"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_cab773148119c55639e2cc4eb0b" PRIMARY KEY ("id", "user_id", "city_id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_cab773148119c55639e2cc4eb0b"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_fa24ccf2934569e3ebc99078db8" PRIMARY KEY ("id", "user_id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_fa24ccf2934569e3ebc99078db8"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_a87248d73155605cf782be9ee5e"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "cityName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
