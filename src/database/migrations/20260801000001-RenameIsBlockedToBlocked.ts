import type { MigrationInterface, QueryRunner } from "typeorm";

export class RenameIsBlockedToBlocked20260801000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking_service"."resources" DROP COLUMN IF EXISTS "is_blocked"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking_service"."resources" ADD COLUMN "is_blocked" boolean NOT NULL DEFAULT false`
    );
  }
}