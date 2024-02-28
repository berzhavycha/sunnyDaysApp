import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1709137907606 implements MigrationInterface {
    name = 'Gen1709137907606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6dc328dcbf0a242f1a0ceede10"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "created_at" TIMESTAMP(0) WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_6dc328dcbf0a242f1a0ceede10" ON "subscriptions" ("city_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id") `);
    }

}
