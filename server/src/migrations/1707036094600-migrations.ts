import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707036094600 implements MigrationInterface {
    name = 'Migrations1707036094600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "userId" character varying NOT NULL`);
    }

}
