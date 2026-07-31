import type { BunRequest } from "bun";
import { ResourceController } from "../controllers/ResourceController";
const controller = new ResourceController();

export const resourceRoutes = {
  "/resources": {
    GET: () => controller.list(),
    POST: (req: Request) => controller.create(req),
  },
  "/resources/:id": {
    GET: (req: BunRequest<"/resources/:id">) => controller.getById(req),
    PUT: (req: BunRequest<"/resources/:id">) => controller.update(req),
    DELETE: (req: BunRequest<"/resources/:id">) => controller.delete(req),
  },
  "/resources/:id/block": {
    PATCH: (req: BunRequest<"/resources/:id/block">) => controller.block(req),
  },
  "/resources/:id/unblock": {
    PATCH: (req: BunRequest<"/resources/:id/unblock">) => controller.unblock(req),
  },

  "/resources/:id/availability": {
    POST: (req: BunRequest<"/resources/:id/availability">) => controller.setAvailability(req),
  },

};