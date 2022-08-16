import { MigrationInterface, QueryRunner } from "typeorm";

export class userLink1660013823425 implements MigrationInterface {
    name = 'userLink1660013823425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "role" character varying(100) NOT NULL,
                "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "customerId" integer,
                CONSTRAINT "REL_c6c520dfb9a4d6dd749e73b13d" UNIQUE ("customerId"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
