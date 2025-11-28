import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedServiceCodeColumnToDeliveryServicetable1763986862226
  implements MigrationInterface
{
  name = 'AddedServiceCodeColumnToDeliveryServicetable1763986862226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_services" ADD "serviceCode" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_services" DROP COLUMN "serviceCode"`,
    );
  }
}
