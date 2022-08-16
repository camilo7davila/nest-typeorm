import { MigrationInterface, QueryRunner } from "typeorm";

export class createBrands1660016225111 implements MigrationInterface {
    name = 'createBrands1660016225111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brands" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "image" character varying(255) NOT NULL,
                "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"),
                CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "brandId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "brandId"
        `);
        await queryRunner.query(`
            DROP TABLE "brands"
        `);
    }

}
