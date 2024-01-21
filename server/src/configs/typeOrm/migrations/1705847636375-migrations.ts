import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705847636375 implements MigrationInterface {
    name = 'Migrations1705847636375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("cityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "cityName" character varying NOT NULL, CONSTRAINT "UQ_bc60994d856300ee4e4b08f1532" UNIQUE ("cityName"), CONSTRAINT "PK_38fa90350025d17a78886e4a4bd" PRIMARY KEY ("cityId"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("subscriptionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "cityId" character varying NOT NULL, CONSTRAINT "PK_06ba17ac2e047b1ef52051edf09" PRIMARY KEY ("subscriptionId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
