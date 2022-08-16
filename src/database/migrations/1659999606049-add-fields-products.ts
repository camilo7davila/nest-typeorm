import { MigrationInterface, QueryRunner } from "typeorm";

export class addFieldsProducts1659999606049 implements MigrationInterface {
    name = 'addFieldsProducts1659999606049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createAt"`);
    }

}
