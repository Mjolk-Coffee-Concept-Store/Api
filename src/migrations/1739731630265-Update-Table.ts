import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739731630265 implements MigrationInterface {
    name = 'UpdateTable1739731630265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "PK_d3300044ebe702dd4005bd05748"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "PK_d19265be0972b8009aa2efad398" PRIMARY KEY ("Id_Brunch_item")`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "Id_Brunch_Order"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "PK_42594b3962c4e25f7ef9866dd6b"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "PK_8b399002920cf1ae22ebcebdefa" PRIMARY KEY ("Id_Consumable")`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP COLUMN "Id_Brunch_Order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD "Id_Brunch_Order" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "PK_8b399002920cf1ae22ebcebdefa"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "PK_42594b3962c4e25f7ef9866dd6b" PRIMARY KEY ("Id_Consumable", "Id_Brunch_Order")`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "Id_Brunch_Order" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "PK_d19265be0972b8009aa2efad398"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "PK_d3300044ebe702dd4005bd05748" PRIMARY KEY ("Id_Brunch_item", "Id_Brunch_Order")`);
    }

}
