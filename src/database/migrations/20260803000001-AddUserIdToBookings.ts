import type { MigrationInterface, QueryRunner } from "typeorm";
import pkg from "typeorm";

const { TableColumn, TableForeignKey } = pkg;

export class AddUserIdToBookings20260803000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("booking_service.bookings", "booked_by");

    await queryRunner.addColumn(
      "booking_service.bookings",
      new TableColumn({
        name: "user_id",
        type: "int",
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      "booking_service.bookings",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "booking_service.users",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("booking_service.bookings");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("booking_service.bookings", foreignKey);
    }

    await queryRunner.dropColumn("booking_service.bookings", "user_id");

    await queryRunner.addColumn(
      "booking_service.bookings",
      new TableColumn({
        name: "booked_by",
        type: "varchar",
      })
    );
  }
}