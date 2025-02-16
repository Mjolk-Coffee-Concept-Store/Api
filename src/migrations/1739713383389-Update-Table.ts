import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739713383389 implements MigrationInterface {
    name = 'UpdateTable1739713383389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_items" DROP CONSTRAINT "FK_0f24df6bd7df904b2447d54a652"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_d19265be0972b8009aa2efad398"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_587d1a9dab5c58c28138f41adb5"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" DROP CONSTRAINT "FK_923c6f12455828c3e6e2e6d8a97"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP CONSTRAINT "FK_287d815d2dd74232a30a339e5a0"`);
        await queryRunner.query(`ALTER TABLE "brunch_items" RENAME COLUMN "Id_Brunch" TO "brunchIdBrunch"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" RENAME COLUMN "Id_Brunch_reservation" TO "reservationsIdBrunchReservation"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" RENAME COLUMN "Id_Brunch" TO "brunchIdBrunch"`);
        await queryRunner.query(`CREATE TABLE "brunch_orders_consumables" ("Id_Consumable" uuid NOT NULL, "Id_Brunch_Order" uuid NOT NULL, "quantity" integer NOT NULL, "orderIdBrunchOrder" uuid, "consumableIdConsumable" uuid, CONSTRAINT "PK_42594b3962c4e25f7ef9866dd6b" PRIMARY KEY ("Id_Consumable", "Id_Brunch_Order"))`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "orderIdBrunchOrder" uuid`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD "itemIdBrunchItem" uuid`);
        await queryRunner.query(`ALTER TABLE "brunch_items" ADD CONSTRAINT "FK_86e890601aeb771568f15184dd8" FOREIGN KEY ("brunchIdBrunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_c7e9ce87c6d586a652367bb16d6" FOREIGN KEY ("orderIdBrunchOrder") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_d69e5053b396f3c05d072ff12e1" FOREIGN KEY ("itemIdBrunchItem") REFERENCES "brunch_items"("Id_Brunch_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "FK_8ad450f9798189ae28ad4c1f337" FOREIGN KEY ("orderIdBrunchOrder") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" ADD CONSTRAINT "FK_ef938bc030d01fc73e973754f69" FOREIGN KEY ("consumableIdConsumable") REFERENCES "consumables"("Id_Consumable") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" ADD CONSTRAINT "FK_b62873cc626e5edbc33fa8e7220" FOREIGN KEY ("reservationsIdBrunchReservation") REFERENCES "brunch_reservations"("Id_Brunch_reservation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD CONSTRAINT "FK_68903426ec7b30d854f090c9283" FOREIGN KEY ("brunchIdBrunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP CONSTRAINT "FK_68903426ec7b30d854f090c9283"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" DROP CONSTRAINT "FK_b62873cc626e5edbc33fa8e7220"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "FK_ef938bc030d01fc73e973754f69"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_consumables" DROP CONSTRAINT "FK_8ad450f9798189ae28ad4c1f337"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_d69e5053b396f3c05d072ff12e1"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_c7e9ce87c6d586a652367bb16d6"`);
        await queryRunner.query(`ALTER TABLE "brunch_items" DROP CONSTRAINT "FK_86e890601aeb771568f15184dd8"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "itemIdBrunchItem"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP COLUMN "orderIdBrunchOrder"`);
        await queryRunner.query(`DROP TABLE "brunch_orders_consumables"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" RENAME COLUMN "brunchIdBrunch" TO "Id_Brunch"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" RENAME COLUMN "reservationsIdBrunchReservation" TO "Id_Brunch_reservation"`);
        await queryRunner.query(`ALTER TABLE "brunch_items" RENAME COLUMN "brunchIdBrunch" TO "Id_Brunch"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD CONSTRAINT "FK_287d815d2dd74232a30a339e5a0" FOREIGN KEY ("Id_Brunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" ADD CONSTRAINT "FK_923c6f12455828c3e6e2e6d8a97" FOREIGN KEY ("Id_Brunch_reservation") REFERENCES "brunch_reservations"("Id_Brunch_reservation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_587d1a9dab5c58c28138f41adb5" FOREIGN KEY ("Id_Brunch_Order") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_d19265be0972b8009aa2efad398" FOREIGN KEY ("Id_Brunch_item") REFERENCES "brunch_items"("Id_Brunch_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_items" ADD CONSTRAINT "FK_0f24df6bd7df904b2447d54a652" FOREIGN KEY ("Id_Brunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
