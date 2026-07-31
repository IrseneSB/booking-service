export interface BookingHistoryQuery {
  page: number;
  limit: number;
  resource_id?: number;
  status?: "confirmed" | "cancelled";
}