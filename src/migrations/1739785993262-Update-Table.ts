import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739785993262 implements MigrationInterface {
    name = 'UpdateTable1739785993262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_4e02f2b098d0ac987edb0e43ccf"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_2f4b2ae7a97b275966129a9715d" PRIMARY KEY ("Id_Consumable", "Id_Consumables_Order", "id")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_85bb668e6e8287b6abf276d7160"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_2f4b2ae7a97b275966129a9715d"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_fee931c81366d6eb751ef6879ae" PRIMARY KEY ("Id_Consumables_Order", "id")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_fee931c81366d6eb751ef6879ae"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_158a576cb6b5a4f1ed025a78ccf" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_85bb668e6e8287b6abf276d7160" FOREIGN KEY ("Id_Consumable") REFERENCES "consumables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc" FOREIGN KEY ("Id_Consumables_Order") REFERENCES "consumables_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_85bb668e6e8287b6abf276d7160"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_158a576cb6b5a4f1ed025a78ccf"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_fee931c81366d6eb751ef6879ae" PRIMARY KEY ("Id_Consumables_Order", "id")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_fee931c81366d6eb751ef6879ae"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_2f4b2ae7a97b275966129a9715d" PRIMARY KEY ("Id_Consumable", "Id_Consumables_Order", "id")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc" FOREIGN KEY ("Id_Consumables_Order") REFERENCES "consumables_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_85bb668e6e8287b6abf276d7160" FOREIGN KEY ("Id_Consumable") REFERENCES "consumables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "PK_2f4b2ae7a97b275966129a9715d"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "PK_4e02f2b098d0ac987edb0e43ccf" PRIMARY KEY ("Id_Consumable", "Id_Consumables_Order")`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP COLUMN "id"`);
    }

}
