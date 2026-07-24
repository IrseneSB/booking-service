export interface ResponseBody {
  success: boolean;
  message?: string;
  data?: unknown;
  error_code?: number;
}

class HttpResponse {
  static success(message: string, data: unknown = {}, status: number = 200): Response {
    return Response.json({ success: true, message, data } satisfies ResponseBody, { status });
  }

  static failure(message: string, status: number = 500): Response {
    return Response.json(
      { success: false, message, error_code: status } satisfies ResponseBody,
      { status }
    );
  }

  static notFound(message: string = "Resource not found"): Response {
    return this.failure(message, 404);
  }
}

export default HttpResponse;
