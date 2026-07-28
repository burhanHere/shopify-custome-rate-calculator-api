import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreat1763843410229 implements MigrationInterface {
  name = 'InitialCreat1763843410229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "delivery_services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97fc357099143f4b05aca53f7b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "weight_catagory_rates" ("id" SERIAL NOT NULL, "weightLowerLimit" numeric(3,3) NOT NULL, "weightUpperLimit" numeric(3,3) NOT NULL, "rate" integer NOT NULL, "sectorId" integer NOT NULL, "deliveryServiceId" integer, CONSTRAINT "PK_dbef9a2e6742e6abb77b3140aaf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sectors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "deliveryServiceId" integer NOT NULL, CONSTRAINT "PK_923fdda0dc12f59add7b3a1782f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1a10b192342e5165948f4dccef" ON "sectors" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "zones" ("id" SERIAL NOT NULL, "origin" character varying NOT NULL, "destination" character varying NOT NULL, "sectorId" integer NOT NULL, CONSTRAINT "PK_880484a43ca311707b05895bd4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_651ecb26ad41772dde97dd52ce" ON "zones" ("origin") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_18f1de30b8a57a18f82a814be6" ON "zones" ("destination") `,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" ADD CONSTRAINT "FK_91805cfa9143668c4c2ef7b9012" FOREIGN KEY ("deliveryServiceId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sectors" ADD CONSTRAINT "FK_aa3bb3f7c5891db75ab9cd578d1" FOREIGN KEY ("deliveryServiceId") REFERENCES "delivery_services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "zones" ADD CONSTRAINT "FK_1495f19eec5fd008b1e01a403bd" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "zones" DROP CONSTRAINT "FK_1495f19eec5fd008b1e01a403bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sectors" DROP CONSTRAINT "FK_aa3bb3f7c5891db75ab9cd578d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" DROP CONSTRAINT "FK_91805cfa9143668c4c2ef7b9012"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_18f1de30b8a57a18f82a814be6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_651ecb26ad41772dde97dd52ce"`,
    );
    await queryRunner.query(`DROP TABLE "zones"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1a10b192342e5165948f4dccef"`,
    );
    await queryRunner.query(`DROP TABLE "sectors"`);
    await queryRunner.query(`DROP TABLE "weight_catagory_rates"`);
    await queryRunner.query(`DROP TABLE "delivery_services"`);
  }
}
