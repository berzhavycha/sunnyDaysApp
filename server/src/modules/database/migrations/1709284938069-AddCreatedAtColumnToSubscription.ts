import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtColumnToSubscription1709284938069 implements MigrationInterface {
    name = 'AddCreatedAtColumnToSubscription1709284938069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "created_at"`);
    }

}
