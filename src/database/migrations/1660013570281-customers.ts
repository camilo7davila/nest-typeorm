import { MigrationInterface, QueryRunner } from "typeorm";

export class customers1660013570281 implements MigrationInterface {
    name = 'customers1660013570281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "customers" (
                "id" integer NOT NULL,
                "name" character varying(255) NOT NULL,
                "lastName" character varying(255) NOT NULL,
                "phone" character varying(255) NOT NULL,
                "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "customers"
        `);
    }

}
