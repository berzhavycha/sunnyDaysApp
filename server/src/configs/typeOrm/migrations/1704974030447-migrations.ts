import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704974030447 implements MigrationInterface {
    name = 'Migrations1704974030447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("cityId" SERIAL NOT NULL, "cityName" character varying NOT NULL, CONSTRAINT "UQ_f77ea1709d85e893df88af2ed10" UNIQUE ("cityName"), CONSTRAINT "PK_ab4faadf32d1887168156ec8ea9" PRIMARY KEY ("cityId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("subscriptionId" SERIAL NOT NULL, "userId" character varying NOT NULL, "cityId" character varying NOT NULL, CONSTRAINT "PK_13cecd7da6abc7ae934d8560bef" PRIMARY KEY ("subscriptionId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
