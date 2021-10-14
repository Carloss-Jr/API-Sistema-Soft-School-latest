import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationEMployersCompany1634151897473 implements MigrationInterface {
    name = 'RelationEMployersCompany1634151897473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tab_employers" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "tab_employers" DROP CONSTRAINT "UQ_ff57aaa044e4cec51418146a8af"`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "provider" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "delete_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "delete_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tab_company" DROP CONSTRAINT "UQ_d664a5540c0eaefeb8ebff8c540"`);
        await queryRunner.query(`ALTER TABLE "tab_company" ALTER COLUMN "delete_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tab_company" ALTER COLUMN "delete_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ADD CONSTRAINT "FK_7a4296ae9195314d5a768f6f449" FOREIGN KEY ("companyId") REFERENCES "tab_company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tab_employers" DROP CONSTRAINT "FK_7a4296ae9195314d5a768f6f449"`);
        await queryRunner.query(`ALTER TABLE "tab_company" ALTER COLUMN "delete_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tab_company" ALTER COLUMN "delete_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tab_company" ADD CONSTRAINT "UQ_d664a5540c0eaefeb8ebff8c540" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "delete_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "delete_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ALTER COLUMN "provider" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tab_employers" ADD CONSTRAINT "UQ_ff57aaa044e4cec51418146a8af" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tab_employers" DROP COLUMN "companyId"`);
    }

}
