import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ResourceSchema } from "./models/schemas";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: "booking_service",
  synchronize: false,
  logging: false,
  entities: [
    ResourceSchema,
    // Add BookingSchema here once the Booking Core feature defines it.
  ],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
