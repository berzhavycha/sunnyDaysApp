import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706007209593 implements MigrationInterface {
    name = 'Migrations1706007209593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "cityId" TO "cityName"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "cityName" TO "cityId"`);
        await queryRunner.query(
            `CREATE TABLE "cities" ("cityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "cityName" character varying NOT NULL, CONSTRAINT "UQ_bc60994d856300ee4e4b08f1532" UNIQUE ("cityName"), CONSTRAINT "PK_38fa90350025d17a78886e4a4bd" PRIMARY KEY ("cityId"))`,
        );
    }

}
