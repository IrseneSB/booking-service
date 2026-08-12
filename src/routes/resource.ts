import type { BunRequest } from "bun";
import { ResourceController } from "../controllers/ResourceController";
import { requireAuth } from "../middleware/requireAuth";

const controller = new ResourceController();

export const resourceRoutes = {
  "/resources": {
    GET:() => controller.list(),
    POST: requireAuth((req: Request) => controller.create(req,user)),
  },
  "/resources/:id": {
    GET: (req: BunRequest<"/resources/:id">,user) => controller.getById(req,user),
    PUT: requireAuth((req: BunRequest<"/resources/:id">,user) => controller.update(req,user)),
    DELETE:requireAuth( (req: BunRequest<"/resources/:id">,user) => controller.delete(req,user)),
  },
  "/resources/:id/block": {
    PATCH: requireAuth((req: BunRequest<"/resources/:id/block">, user) => controller.block(req, user)),
  },
  "/resources/:id/unblock": {
    PATCH: requireAuth((req: BunRequest<"/resources/:id/unblock">, user) => controller.unblock(req, user)),
  },

  "/resources/:id/availability": {
    POST: requireAuth((req: BunRequest<"/resources/:id/availability">,user) => controller.setAvailability(req,user)),
  },
};