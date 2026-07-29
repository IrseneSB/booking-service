import type { BunRequest } from "bun";
import { ResourceController } from "../controllers/ResourceController";

const controller = new ResourceController();

// Merged into Bun.serve's `routes` in src/app.ts.
// Feature owner: add POST "/resources", PUT/DELETE "/resources/:id" handlers here,
// plus whatever routes availability-windows and block/unblock need.
export const resourceRoutes = {
  "/resources": {
    GET: () => controller.list(),
    POST: (req: Request) => controller.create(req),
  },
  "/resources/:id": {
    GET: (req: BunRequest<"/resources/:id">) => controller.getById(req),
    PUT: (req: BunRequest<"/resources/:id">) => controller.update(req),
  },
};
