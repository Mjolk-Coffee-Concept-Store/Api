import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739731824105 implements MigrationInterface {
    name = 'UpdateTable1739731824105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "Id_Brunch_item" TO "Id_Brunch_Item_Order"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME CONSTRAINT "PK_d19265be0972b8009aa2efad398" TO "PK_790362ff15ecd2844ccd1a3cf92"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "Id_Consumable" TO "Id_Brunch_Consumable_Order"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME CONSTRAINT "PK_8b399002920cf1ae22ebcebdefa" TO "PK_2b06b6ee71c2ea196a266b96bc5"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ALTER COLUMN "Id_Brunch_Item_Order" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ALTER COLUMN "Id_Brunch_Consumable_Order" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ALTER COLUMN "Id_Brunch_Consumable_Order" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ALTER COLUMN "Id_Brunch_Item_Order" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME CONSTRAINT "PK_2b06b6ee71c2ea196a266b96bc5" TO "PK_8b399002920cf1ae22ebcebdefa"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "Id_Brunch_Consumable_Order" TO "Id_Consumable"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME CONSTRAINT "PK_790362ff15ecd2844ccd1a3cf92" TO "PK_d19265be0972b8009aa2efad398"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "Id_Brunch_Item_Order" TO "Id_Brunch_item"`);
    }

}
