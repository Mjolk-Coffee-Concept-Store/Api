import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1739733832394 implements MigrationInterface {
    name = 'UpdateTable1739733832394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD "brunchIdBrunch" uuid`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD CONSTRAINT "FK_68903426ec7b30d854f090c9283" FOREIGN KEY ("brunchIdBrunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP CONSTRAINT "FK_68903426ec7b30d854f090c9283"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP COLUMN "brunchIdBrunch"`);
    }

}
