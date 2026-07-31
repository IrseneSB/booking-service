export interface BookingEntity {
  id: number;
  uuid: string;

  resource_id: number;
  booked_by: string;

  start_time: Date;
  end_time: Date;

  status: "confirmed" | "cancelled";

  created_at: Date;
  updated_at: Date;
}
export interface CreateBookingForm {

  resource_id: number;
  booked_by: string;
 
  start_time: Date;
  end_time: Date;

}