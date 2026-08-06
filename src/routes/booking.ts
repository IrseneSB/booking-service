import type { BunRequest } from "bun";
import { BookingController } from "../controllers/BookingController";
import { requireAuth } from "../middleware/requireAuth";

const controller = new BookingController();

export const bookingRoutes = {
  "/bookings": {
    GET: (req: BunRequest<"/bookings">) => controller.list(req),
    POST: requireAuth((req: Request, user) => controller.create(req, user)),
  },
  "/bookings/:id": {
    PUT: requireAuth((req: BunRequest<"/bookings/:id">, user) => controller.update(req, user)),
  },
  "/bookings/:id/cancel": {
    POST: requireAuth((req: BunRequest<"/bookings/:id/cancel">, user) => controller.cancel(req, user)),
  },
};