import type { BunRequest } from "bun";
import HttpResponse from "../common/HttpResponse";
import { ResourceService } from "../services/ResourceService";

export class ResourceController {
  private resourceService = new ResourceService();

  // Baseline read endpoints are wired up so the routing pattern is clear.
  // Feature owner: add create/update/delete, availability windows, and block/unblock.

  async list(): Promise<Response> {
    const resources = await this.resourceService.findAll();
    return HttpResponse.success("Resources fetched successfully", resources);
  }

  async getById(req: BunRequest<"/resources/:id">): Promise<Response> {
    const id = Number(req.params.id);
    const resource = await this.resourceService.findById(id);

    if (!resource) return HttpResponse.notFound("Resource not found");
    return HttpResponse.success("Resource fetched successfully", resource);
  }
}
