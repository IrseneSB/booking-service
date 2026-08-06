import type { BunRequest } from "bun";
import { ResourceController } from "../controllers/ResourceController";
import { requireAuth } from "../middleware/requireAuth";

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
    PATCH: requireAuth((req: BunRequest<"/resources/:id/block">, user) => controller.block(req, user)),
  },
  "/resources/:id/unblock": {
    PATCH: requireAuth((req: BunRequest<"/resources/:id/unblock">, user) => controller.unblock(req, user)),
  },

  "/resources/:id/availability": {
    POST: (req: BunRequest<"/resources/:id/availability">) => controller.setAvailability(req),
  },
};