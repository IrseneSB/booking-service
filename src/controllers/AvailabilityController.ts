import HttpResponse from "../common/HttpResponse";
import { AvailabilityService } from "../services/AvailabilityService";

export class AvailabilityController {
  private availabilityService = new AvailabilityService();

  async search(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!type || !from || !to) {
      return HttpResponse.failure("type, from, and to query params are required", 400);
    }

    const results = await this.availabilityService.search({
      type,
      from: new Date(from),
      to: new Date(to),
    });

    return HttpResponse.success("Availability search results", results);
  }
}