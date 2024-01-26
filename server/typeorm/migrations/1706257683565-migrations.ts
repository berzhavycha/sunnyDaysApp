import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706257683565 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "subscriptionsId" TO "id"`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" RENAME COLUMN "id" TO "subscriptionId"`);
    }
}
