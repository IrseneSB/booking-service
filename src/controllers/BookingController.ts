import type { BunRequest } from "bun";
import HttpResponse from "../common/HttpResponse";
import { BookingService } from "../services/BookingService";
import type { CreateBookingForm } from "../forms/booking";
import type { DecodedToken } from "../common/AuthTypes";

export class BookingController {
  private bookingService = new BookingService();

  async list(req: BunRequest<"/bookings">): Promise<Response> {
    try {
      const url = new URL(req.url);

      const resource_id = url.searchParams.get("resource_id");
      const status = url.searchParams.get("status");
      const from = url.searchParams.get("from");
      const to = url.searchParams.get("to");

      const bookings = await this.bookingService.getBookings({
        resource_id: resource_id ? Number(resource_id) : undefined,
        status: status ?? undefined,
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      });

      return HttpResponse.success(
        "Bookings fetched successfully",
        bookings
      );
    } catch (error) {
      return HttpResponse.failure(
        error instanceof Error ? error.message : "Something went wrong",
        500
      );
    }
  }

  async create(req: Request, user: DecodedToken): Promise<Response> {
    const body = (await req.json()) as CreateBookingForm;
    const booking = await this.bookingService.create({
      ...body,
      user_id: user.userId,
      });

    return HttpResponse.success("Booking created successfully", booking, 201);
    
  }

  async update(req: BunRequest<"/bookings/:id">, user: DecodedToken): Promise<Response> {

    try {
      const id = Number(req.params.id);
      const booking = await this.bookingService.findById(id);

      if (!booking) {
        return HttpResponse.notFound("Booking not found");
      }

      if(booking.user_id!==user.userId){
        return HttpResponse.failure("Forbidden", 403);
      }

      const body = await req.json();

      const updatedbooking = await this.bookingService.updateBooking(id, body as Partial<CreateBookingForm>);

      return HttpResponse.success(
        "Booking updated successfully",
        updatedbooking
      );
     
    } catch (error) {
      return HttpResponse.failure(
        error instanceof Error ? error.message : "Something went wrong",
        400
      );
    }
  }

  async cancel(req: BunRequest<"/bookings/:id/cancel">, user: DecodedToken): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const booking = await this.bookingService.findById(id);

      if (!booking) {
        return HttpResponse.notFound("Booking not found");
      }
      if(user.userId!==booking.user_id){
        return HttpResponse.failure("Forbidden", 403)
      }

      const cancelledbooking = await this.bookingService.cancelBooking(id);

      return HttpResponse.success(
      "Booking cancelled successfully",
      cancelledbooking
      );
      

      
    } catch (error) {
      return HttpResponse.failure(
        error instanceof Error ? error.message : "Something went wrong",
        400
      );
    }
  }
}