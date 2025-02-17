import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739782936504 implements MigrationInterface {
    name = 'UpdateTable1739782936504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_orders" ADD "completed" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consumables_orders" DROP COLUMN "completed"`);
    }

}
