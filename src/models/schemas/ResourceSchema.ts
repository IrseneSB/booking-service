import { EntitySchema } from "typeorm";
import { baseColumnOptions } from "./BaseSchema";
import type { ResourceEntity } from "../../forms/resource";

export const ResourceSchema = new EntitySchema<ResourceEntity>({
  name: "Resource",
  tableName: "resources",
  columns: {
    ...baseColumnOptions,
    id: {
      type: "int",
      primary: true,
      generated: "increment",
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    capacity: {
      type: "int",
    },
<<<<<<< HEAD
    blocked: {
      type: "boolean",
      default: false,
  },
      type: Boolean,
      default: false,
    },
    open_time: {
      type: String,
      nullable: true,
    },
    close_time: {
      type: String,
      nullable: true,
    },
  },
=======
    is_blocked: {
      type: Boolean,
      default: false,
    },
    open_time: {
      type: String,
      nullable: true,
    },
    close_time: {
      type: String,
      nullable: true,
    },
  },
>>>>>>> a4c0eb0 (Implement real availability filtering (search, isWithinAvailabilityWindow), using is_blocked/open_time/close_time from Feature 1's ResourceService)
});