import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWeightCatagoryRateTable1763849007258
  implements MigrationInterface
{
  name = 'UpdateWeightCatagoryRateTable1763849007258';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" DROP CONSTRAINT "FK_91805cfa9143668c4c2ef7b9012"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" DROP COLUMN "deliveryServiceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" ADD CONSTRAINT "FK_999c683d56169ad38948f6a675a" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" DROP CONSTRAINT "FK_999c683d56169ad38948f6a675a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" ADD "deliveryServiceId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "weight_catagory_rates" ADD CONSTRAINT "FK_91805cfa9143668c4c2ef7b9012" FOREIGN KEY ("deliveryServiceId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
