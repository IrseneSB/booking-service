import { AvailabilityController } from "../controllers/AvailabilityController";

const controller = new AvailabilityController();


export const resourceRoutes = {
  "/availability": {
    GET: (req:Request ) => controller.search(),
  },
};
