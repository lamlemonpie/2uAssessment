import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669785876709 implements MigrationInterface {
    name = 'migrations1669785876709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "invoice_number" character varying NOT NULL, "total" character varying NOT NULL, "currency" character varying NOT NULL, "invoice_date" character varying NOT NULL, "due_date" character varying NOT NULL, "vendor_name" character varying NOT NULL, "remittance_address" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "invoice"`);
    }

}
