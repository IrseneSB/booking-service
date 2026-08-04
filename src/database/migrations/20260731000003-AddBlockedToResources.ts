import { type  MigrationInterface,  type QueryRunner } from "typeorm";

export class AddBlockedToResources20260731000003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE resources
            ADD COLUMN blocked BOOLEAN NOT NULL DEFAULT FALSE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE resources
            DROP COLUMN blocked;
        `);
    }
}