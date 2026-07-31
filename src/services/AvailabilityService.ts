import type { AvailabilitySearchQuery, AvailabilityResult } from "../forms/availability";
import { ResourceService } from "./ResourceService";
import type { ResourceEntity } from "../forms/resource";
import { AppDataSource } from "../data-source";
import { BookingSchema } from "../models/schemas";s

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


private async hasOverlappingBooking(
  resourceId: number,
  query: AvailabilitySearchQuery
): Promise<boolean> {
  const bookingRepo = AppDataSource.getRepository(BookingSchema);

  const overlap = await bookingRepo
    .createQueryBuilder("booking")
    .where("booking.resource_id = :resourceId", { resourceId })
    .andWhere("booking.status = :status", { status: "confirmed" })
    .andWhere("booking.start_time < :to AND booking.end_time > :from", {
      from: query.from,
      to: query.to,
    })
    .getOne();

  return !!overlap;
}}