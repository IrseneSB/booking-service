import type { EntitySchemaColumnOptions } from "typeorm";

export function getUuidColumn(): EntitySchemaColumnOptions {
  return {
    type: "uuid",
    default: () => "uuid_generate_v4()",
  };
}

export const baseColumnOptions = {
  uuid: getUuidColumn(),

  created_at: {
    type: "timestamp",
    createDate: true,
  } as EntitySchemaColumnOptions,

  updated_at: {
    type: "timestamp",
    updateDate: true,
  } as EntitySchemaColumnOptions,
};
