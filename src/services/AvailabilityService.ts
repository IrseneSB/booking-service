import type { AvailabilitySearchQuery, AvailabilityResult } from "../forms/availability";

export class AvailabilityService {
  async search(query: AvailabilitySearchQuery): Promise<AvailabilityResult[]> {
    console.log("Searching availability for:", query);
    return [];
  }
}