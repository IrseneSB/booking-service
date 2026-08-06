
export const authRoutes = {
  "/auth/signup": {
    POST: (req: Request) => controller.signup(req),
  },
  "/auth/signin": {
    POST: (req: Request) => controller.signin(req),
  },
};