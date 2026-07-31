import type { AvailabilitySearchQuery, AvailabilityResult } from "../forms/availability";
import { ResourceService } from "./ResourceService";
import type { ResourceEntity } from "../forms/resource";

export class AvailabilityService {
  private resourceService = new ResourceService();

  async search(query: AvailabilitySearchQuery): Promise<AvailabilityResult[]> {
    const allResources = await this.resourceService.findAll();
    const candidateResources = allResources.filter(
      (r) => r.type === query.type && r.is_blocked === false
    );

    const available: AvailabilityResult[] = [];

    for (const resource of candidateResources) {
      const fitsWindow = this.isWithinAvailabilityWindow(resource, query);
      if (!fitsWindow) continue;

      const hasConflict = await this.hasOverlappingBooking(resource.id, query);
      if (hasConflict) continue;

      available.push({
        id: resource.id,
        name: resource.name,
        type: resource.type,
        capacity: resource.capacity,
      });
    }

    return available;
  }

  // OPEN QUESTION for the team: null open_time/close_time = always available, or never bookable?
  // Currently treated as "always available" — confirm with Feature 1's owner.
  private isWithinAvailabilityWindow(
    resource: ResourceEntity,
    query: AvailabilitySearchQuery
  ): boolean {
    if (resource.open_time === null || resource.close_time === null) {
      return true;
    }

    const requestedStart = this.toHHMM(query.from);
    const requestedEnd = this.toHHMM(query.to);

    return requestedStart >= resource.open_time && requestedEnd <= resource.close_time;
  }

  private toHHMM(date: Date): string {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // TODO (Feature 2): still waiting on BookingSchema + BookingService.
  private async hasOverlappingBooking(
    resourceId: number,
    query: AvailabilitySearchQuery
  ): Promise<boolean> {
    return false;
  }
}