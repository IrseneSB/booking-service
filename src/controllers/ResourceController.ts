import type { BunRequest } from "bun";
import HttpResponse from "../common/HttpResponse";
import { ResourceService } from "../services/ResourceService";
import type { CreateResourceForm } from "../forms/resource";

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
   async create(req: Request): Promise<Response> {
    const body = (await req.json()) as CreateResourceForm;

    if (!body.name || !body.type) {
      return HttpResponse.failure("Name and type are required", 400);
    }
    if (typeof body.capacity !== "number" || body.capacity <= 0) {
      return HttpResponse.failure("Capacity must be a positive number", 400);
    }

    const resource = await this.resourceService.createResource(body);
    return HttpResponse.success("Resource created successfully", resource, 201);
  }

  async update(req: BunRequest<"/resources/:id">): Promise<Response> {
    const id = Number(req.params.id);
    const body = (await req.json()) as Partial<CreateResourceForm>;

    const existing = await this.resourceService.findById(id);
    if (!existing) return HttpResponse.notFound("Resource not found");

    if (body.capacity !== undefined && (typeof body.capacity !== "number" || body.capacity <= 0)) {
      return HttpResponse.failure("Capacity must be a positive number", 400);
    }

    const updated = await this.resourceService.updateById(id, body);
    return HttpResponse.success("Resource updated successfully", updated);
  }

}
