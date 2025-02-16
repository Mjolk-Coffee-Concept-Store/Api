import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739732133057 implements MigrationInterface {
    name = 'UpdateTable1739732133057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_ordered" RENAME COLUMN "quantity" TO "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "quantity" TO "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "quantity" TO "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD "order_submission_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD "ended" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD "served" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "served" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD "served" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD "served" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "served" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP COLUMN "served"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD "served" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP COLUMN "ended"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP COLUMN "order_submission_date"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "served" TO "quantity"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "served" TO "quantity"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" RENAME COLUMN "served" TO "quantity"`);
    }

}
