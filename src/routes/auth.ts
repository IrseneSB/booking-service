import { AuthController } from "../controllers/AuthController";
import { requireAuth } from "../middleware/requireAuth";

const controller = new AuthController();

export const authRoutes = {
  "/auth/signup": {
    POST: (req: Request) => controller.signup(req),
  },
  "/auth/signin": {
    POST: (req: Request) => controller.signin(req),
  },
  "/auth/me": {
    GET: requireAuth((req: Request, user) => controller.me(req, user)),
  },
};