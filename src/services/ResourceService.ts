import { BaseService } from "./BaseService";
import { ResourceSchema } from "../models/schemas";
import type { ResourceEntity, CreateResourceForm } from "../forms/resource";

export class ResourceService extends BaseService<ResourceEntity> {
  constructor() {
    super(ResourceSchema);
  }

  // Feature owner: add createResource/updateResource/deleteResource here,
  // plus availability-window and block/unblock methods as the feature grows.
  async createResource(data: CreateResourceForm): Promise<ResourceEntity> {
    return await this.create(data);
  }
  async blockResource(id: number) : Promise<ResourceEntity | null> {
  await this.updateById(id, {
      blocked: true,
    }
  );

  return  this.repository.findOneBy({ id });
}


async unblockResource(id: number) {
  await this.repository.update(
    id,
    {
      blocked: false,
    }
  );

  return this.repository.findOneBy({ id });
}
}
