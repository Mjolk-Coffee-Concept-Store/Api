import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739736852548 implements MigrationInterface {
    name = 'UpdateTable1739736852548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD "comments" text`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "comments" text`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD "comments" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP COLUMN "comments"`);
    }

}
