import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPrecisionAndScaleConstrainOnWeightsUpperAndLowerLimitColumnInWeightCatagoryRateTable1763849856167 implements MigrationInterface {
    name = 'RemovedPrecisionAndScaleConstrainOnWeightsUpperAndLowerLimitColumnInWeightCatagoryRateTable1763849856167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weight_catagory_rates" ALTER COLUMN "weightLowerLimit" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "weight_catagory_rates" ALTER COLUMN "weightUpperLimit" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weight_catagory_rates" ALTER COLUMN "weightUpperLimit" TYPE numeric(3,3)`);
        await queryRunner.query(`ALTER TABLE "weight_catagory_rates" ALTER COLUMN "weightLowerLimit" TYPE numeric(3,3)`);
    }

}
