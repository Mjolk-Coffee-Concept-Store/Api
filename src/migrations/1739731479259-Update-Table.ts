import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739731479259 implements MigrationInterface {
    name = 'UpdateTable1739731479259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_c7e9ce87c6d586a652367bb16d6"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "FK_8ad450f9798189ae28ad4c1f337"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP CONSTRAINT "FK_68903426ec7b30d854f090c9283"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "orderIdBrunchOrder" TO "reservationIdBrunchReservation"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "orderIdBrunchOrder" TO "reservationIdBrunchReservation"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP COLUMN "brunchIdBrunch"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_1110187d817d2bc0a4edaabd9dd" FOREIGN KEY ("reservationIdBrunchReservation") REFERENCES "brunch_reservations"("Id_Brunch_reservation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "FK_e9d690c1d68b1fbe40f295ee299" FOREIGN KEY ("reservationIdBrunchReservation") REFERENCES "brunch_reservations"("Id_Brunch_reservation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "FK_e9d690c1d68b1fbe40f295ee299"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_1110187d817d2bc0a4edaabd9dd"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD "brunchIdBrunch" uuid`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" RENAME COLUMN "reservationIdBrunchReservation" TO "orderIdBrunchOrder"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" RENAME COLUMN "reservationIdBrunchReservation" TO "orderIdBrunchOrder"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD CONSTRAINT "FK_68903426ec7b30d854f090c9283" FOREIGN KEY ("brunchIdBrunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "FK_8ad450f9798189ae28ad4c1f337" FOREIGN KEY ("orderIdBrunchOrder") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_c7e9ce87c6d586a652367bb16d6" FOREIGN KEY ("orderIdBrunchOrder") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
