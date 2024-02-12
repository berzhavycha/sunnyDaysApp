import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameColumnToCityTable1707253977116
  implements MigrationInterface
{
  name = 'AddNameColumnToCityTable1707253977116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6dc328dcbf0a242f1a0ceede10"`,
    );
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "cities" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_71b51db80abcbe7468f51498b70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_cab773148119c55639e2cc4eb0b" PRIMARY KEY ("user_id", "city_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_cab773148119c55639e2cc4eb0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_71b51db80abcbe7468f51498b70" PRIMARY KEY ("user_id", "city_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6dc328dcbf0a242f1a0ceede10" ON "subscriptions" ("city_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `DROP INDEX "public"."IDX_6dc328dcbf0a242f1a0ceede10"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0a95ef8a28188364c546eb65c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_71b51db80abcbe7468f51498b70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_cab773148119c55639e2cc4eb0b" PRIMARY KEY ("user_id", "city_id", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" DROP CONSTRAINT "PK_cab773148119c55639e2cc4eb0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "PK_71b51db80abcbe7468f51498b70" PRIMARY KEY ("user_id", "city_id")`,
    );
    await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6dc328dcbf0a242f1a0ceede10" ON "subscriptions" ("city_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a95ef8a28188364c546eb65c" ON "subscriptions" ("user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_6dc328dcbf0a242f1a0ceede100" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_d0a95ef8a28188364c546eb65c1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
