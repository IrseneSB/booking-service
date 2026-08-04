import type { BunRequest } from "bun";
import { BookingController } from "../controllers/BookingController";

const controller = new BookingController();

export const bookingRoutes = {
  "/bookings": {
    GET: (req: BunRequest<"/bookings">) => controller.list(req),
    POST: (req: Request) => controller.create(req),
  },

  "/bookings/:id": {
    PUT: (req: BunRequest<"/bookings/:id">) => controller.update(req),
  },

  "/bookings/:id/cancel": {
    PATCH: (req: BunRequest<"/bookings/:id/cancel">) =>
      controller.cancel(req),
  },
};