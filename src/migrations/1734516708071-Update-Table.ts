import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1734516708071 implements MigrationInterface {
    name = 'UpdateTable1734516708071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("Id_User" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "permissions" integer NOT NULL, "full_name" character varying(255) NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_8152d8f10e5af5e45141527e92f" PRIMARY KEY ("Id_User"))`);
        await queryRunner.query(`CREATE TABLE "recommendations" ("Id_Recommendation" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "name" character varying(25) NOT NULL, "content" character varying(250) NOT NULL, "visit_date" date NOT NULL, "submission_date" date NOT NULL, "rating" numeric(2,1), CONSTRAINT "PK_587b68f65f86383691649d179c9" PRIMARY KEY ("Id_Recommendation"))`);
        await queryRunner.query(`CREATE TABLE "post_categories" ("Id_Categorie" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(160) NOT NULL, "slug" character varying(10) NOT NULL, CONSTRAINT "UQ_235ee0669c727771807c7f8d389" UNIQUE ("name"), CONSTRAINT "UQ_5e0badd4b72dd5fd52242a4e849" UNIQUE ("slug"), CONSTRAINT "PK_674cec271a55d828a56fe81e79c" PRIMARY KEY ("Id_Categorie"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("Id_Post" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "slug" character varying(10) NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_54ddf9075260407dcfdd7248577" UNIQUE ("slug"), CONSTRAINT "PK_93a5e245f36ce5395f9df2ce584" PRIMARY KEY ("Id_Post"))`);
        await queryRunner.query(`CREATE TABLE "post_images" ("Id_Image" uuid NOT NULL DEFAULT uuid_generate_v4(), "img_path" character varying(50) NOT NULL, "alt_text" character varying(155), CONSTRAINT "PK_a6cbd3ad5d9e41a915b2ad0c4a4" PRIMARY KEY ("Id_Image"))`);
        await queryRunner.query(`CREATE TABLE "partnership" ("Id_Partnership" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "phone" character varying(50) NOT NULL, "business_sector" character varying(50) NOT NULL, "message" text NOT NULL, "submission_date" character varying(50) NOT NULL, "attachment_1_path" character varying(255), "attachment_2_path" character varying(255), "attachment_3_path" character varying(255), CONSTRAINT "PK_94c9a4659826fd4bbd29fce2b7b" PRIMARY KEY ("Id_Partnership"))`);
        await queryRunner.query(`CREATE TABLE "logs" ("Id_Log" SERIAL NOT NULL, "level" character varying(50) NOT NULL, "category" character varying(50) NOT NULL, "short_msg" character varying(255) NOT NULL, "long_msg" text, "created_at" TIMESTAMP NOT NULL, "user_id" character varying(50), CONSTRAINT "PK_2d10ed9ec221096532badec8191" PRIMARY KEY ("Id_Log"))`);
        await queryRunner.query(`CREATE TABLE "consumables" ("Id_Consumable" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "type" integer NOT NULL, "description" text NOT NULL, "temperature" character varying(50) NOT NULL, "price" numeric(6,2) NOT NULL, "is_vegetarian" boolean NOT NULL, "is_vegan" boolean NOT NULL, "availability" boolean NOT NULL, "allergens" character varying(255), CONSTRAINT "PK_ea2bbccbc8fa955b5b54939f7b1" PRIMARY KEY ("Id_Consumable"))`);
        await queryRunner.query(`CREATE TABLE "consumables_orders" ("Id_Consumables_Order" uuid NOT NULL DEFAULT uuid_generate_v4(), "table_number" integer NOT NULL, "submission_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_77f3a0ff88395f3caee8edeae34" PRIMARY KEY ("Id_Consumables_Order"))`);
        await queryRunner.query(`CREATE TABLE "consumables_ordered" ("Id_Consumable" uuid NOT NULL, "Id_Consumables_Order" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_4e02f2b098d0ac987edb0e43ccf" PRIMARY KEY ("Id_Consumable", "Id_Consumables_Order"))`);
        await queryRunner.query(`CREATE TABLE "brunch_orders" ("Id_Brunch_Order" uuid NOT NULL DEFAULT uuid_generate_v4(), "submission_date" TIMESTAMP NOT NULL, "Id_Brunch_reservation" uuid, CONSTRAINT "PK_b73f99fc5de08aac8e4ded06abc" PRIMARY KEY ("Id_Brunch_Order"))`);
        await queryRunner.query(`CREATE TABLE "brunch_orders_items" ("Id_Brunch_item" uuid NOT NULL, "Id_Brunch_Order" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_d3300044ebe702dd4005bd05748" PRIMARY KEY ("Id_Brunch_item", "Id_Brunch_Order"))`);
        await queryRunner.query(`CREATE TABLE "brunch_items_consumables" ("Id_Brunch_item" uuid NOT NULL, "Id_Consumable" uuid NOT NULL, CONSTRAINT "PK_1a81bc3fc3bb3220536981f791a" PRIMARY KEY ("Id_Brunch_item", "Id_Consumable"))`);
        await queryRunner.query(`CREATE TABLE "brunch_items" ("Id_Brunch_item" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "course" character varying(50) NOT NULL, "description" text, "availability" boolean NOT NULL, "is_vegetarian" boolean NOT NULL, "is_vegan" boolean NOT NULL, "allergens" text, "hidden_price" numeric(10,2) NOT NULL, "Id_Brunch" uuid, CONSTRAINT "PK_7827cb97f3008e596719b5ee368" PRIMARY KEY ("Id_Brunch_item"))`);
        await queryRunner.query(`CREATE TABLE "brunchs" ("Id_Brunch" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_90d60ac93b99ed51626959acbe9" PRIMARY KEY ("Id_Brunch"))`);
        await queryRunner.query(`CREATE TABLE "brunch_reservations" ("Id_Brunch_reservation" uuid NOT NULL DEFAULT uuid_generate_v4(), "customer_name" character varying(50) NOT NULL, "customer_email" character varying(50) NOT NULL, "customer_phone" character varying(10) NOT NULL, "company_name" character varying(50), "reservation_date" TIMESTAMP NOT NULL, "number_of_people" smallint NOT NULL, "created_at" TIMESTAMP NOT NULL, "table_number" integer, "Id_Brunch" uuid, CONSTRAINT "PK_99a7463298feb5825746cd054a6" PRIMARY KEY ("Id_Brunch_reservation"))`);
        await queryRunner.query(`CREATE TABLE "posts_categories" ("Id_Post" uuid NOT NULL, "Id_Categorie" integer NOT NULL, CONSTRAINT "PK_9aec6bbf7bf33ba49ab88631239" PRIMARY KEY ("Id_Post", "Id_Categorie"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2612475f737182409fac254ec" ON "posts_categories" ("Id_Post") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e98a356f4e626e03cef72c737" ON "posts_categories" ("Id_Categorie") `);
        await queryRunner.query(`CREATE TABLE "posts_images" ("Id_Post" uuid NOT NULL, "Id_Image" uuid NOT NULL, CONSTRAINT "PK_09f6f0b50f9431679d46745700f" PRIMARY KEY ("Id_Post", "Id_Image"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6af4e0d6f9ad506b016573301f" ON "posts_images" ("Id_Post") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a4a50317b3dafe110958113cf" ON "posts_images" ("Id_Image") `);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_85bb668e6e8287b6abf276d7160" FOREIGN KEY ("Id_Consumable") REFERENCES "consumables"("Id_Consumable") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" ADD CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc" FOREIGN KEY ("Id_Consumables_Order") REFERENCES "consumables_orders"("Id_Consumables_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" ADD CONSTRAINT "FK_923c6f12455828c3e6e2e6d8a97" FOREIGN KEY ("Id_Brunch_reservation") REFERENCES "brunch_reservations"("Id_Brunch_reservation") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_d19265be0972b8009aa2efad398" FOREIGN KEY ("Id_Brunch_item") REFERENCES "brunch_items"("Id_Brunch_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" ADD CONSTRAINT "FK_587d1a9dab5c58c28138f41adb5" FOREIGN KEY ("Id_Brunch_Order") REFERENCES "brunch_orders"("Id_Brunch_Order") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_items_consumables" ADD CONSTRAINT "FK_101ddc0488723e519e5029923d2" FOREIGN KEY ("Id_Brunch_item") REFERENCES "brunch_items"("Id_Brunch_item") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_items_consumables" ADD CONSTRAINT "FK_8b090933f29df696f35e58746cc" FOREIGN KEY ("Id_Consumable") REFERENCES "consumables"("Id_Consumable") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_items" ADD CONSTRAINT "FK_0f24df6bd7df904b2447d54a652" FOREIGN KEY ("Id_Brunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" ADD CONSTRAINT "FK_287d815d2dd74232a30a339e5a0" FOREIGN KEY ("Id_Brunch") REFERENCES "brunchs"("Id_Brunch") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_categories" ADD CONSTRAINT "FK_c2612475f737182409fac254ecb" FOREIGN KEY ("Id_Post") REFERENCES "posts"("Id_Post") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_categories" ADD CONSTRAINT "FK_7e98a356f4e626e03cef72c7371" FOREIGN KEY ("Id_Categorie") REFERENCES "post_categories"("Id_Categorie") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_images" ADD CONSTRAINT "FK_6af4e0d6f9ad506b016573301ff" FOREIGN KEY ("Id_Post") REFERENCES "posts"("Id_Post") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_images" ADD CONSTRAINT "FK_4a4a50317b3dafe110958113cf8" FOREIGN KEY ("Id_Image") REFERENCES "post_images"("Id_Image") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_images" DROP CONSTRAINT "FK_4a4a50317b3dafe110958113cf8"`);
        await queryRunner.query(`ALTER TABLE "posts_images" DROP CONSTRAINT "FK_6af4e0d6f9ad506b016573301ff"`);
        await queryRunner.query(`ALTER TABLE "posts_categories" DROP CONSTRAINT "FK_7e98a356f4e626e03cef72c7371"`);
        await queryRunner.query(`ALTER TABLE "posts_categories" DROP CONSTRAINT "FK_c2612475f737182409fac254ecb"`);
        await queryRunner.query(`ALTER TABLE "brunch_reservations" DROP CONSTRAINT "FK_287d815d2dd74232a30a339e5a0"`);
        await queryRunner.query(`ALTER TABLE "brunch_items" DROP CONSTRAINT "FK_0f24df6bd7df904b2447d54a652"`);
        await queryRunner.query(`ALTER TABLE "brunch_items_consumables" DROP CONSTRAINT "FK_8b090933f29df696f35e58746cc"`);
        await queryRunner.query(`ALTER TABLE "brunch_items_consumables" DROP CONSTRAINT "FK_101ddc0488723e519e5029923d2"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_587d1a9dab5c58c28138f41adb5"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders_items" DROP CONSTRAINT "FK_d19265be0972b8009aa2efad398"`);
        await queryRunner.query(`ALTER TABLE "brunch_orders" DROP CONSTRAINT "FK_923c6f12455828c3e6e2e6d8a97"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_1a4b0f321d89f2276106648d1fc"`);
        await queryRunner.query(`ALTER TABLE "consumables_ordered" DROP CONSTRAINT "FK_85bb668e6e8287b6abf276d7160"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a4a50317b3dafe110958113cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6af4e0d6f9ad506b016573301f"`);
        await queryRunner.query(`DROP TABLE "posts_images"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e98a356f4e626e03cef72c737"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2612475f737182409fac254ec"`);
        await queryRunner.query(`DROP TABLE "posts_categories"`);
        await queryRunner.query(`DROP TABLE "brunch_reservations"`);
        await queryRunner.query(`DROP TABLE "brunchs"`);
        await queryRunner.query(`DROP TABLE "brunch_items"`);
        await queryRunner.query(`DROP TABLE "brunch_items_consumables"`);
        await queryRunner.query(`DROP TABLE "brunch_orders_items"`);
        await queryRunner.query(`DROP TABLE "brunch_orders"`);
        await queryRunner.query(`DROP TABLE "consumables_ordered"`);
        await queryRunner.query(`DROP TABLE "consumables_orders"`);
        await queryRunner.query(`DROP TABLE "consumables"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TABLE "partnership"`);
        await queryRunner.query(`DROP TABLE "post_images"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "post_categories"`);
        await queryRunner.query(`DROP TABLE "recommendations"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
