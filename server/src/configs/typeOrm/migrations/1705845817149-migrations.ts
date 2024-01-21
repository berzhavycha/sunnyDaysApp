import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705845817149 implements MigrationInterface {
    name = 'Migrations1705845817149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "PK_38fa90350025d17a78886e4a4bd"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "cityId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "PK_38fa90350025d17a78886e4a4bd" PRIMARY KEY ("cityId")`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "subscriptionId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "subscriptionId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09" PRIMARY KEY ("subscriptionId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "subscriptionId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "subscriptionId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09" PRIMARY KEY ("subscriptionId")`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "PK_38fa90350025d17a78886e4a4bd"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "cityId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "PK_38fa90350025d17a78886e4a4bd" PRIMARY KEY ("cityId")`);
    }

}
