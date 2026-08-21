//Gotta come back on this file
import jwt from "jsonwebtoken";
import HttpResponse from "../common/HttpResponse";
import type { DecodedToken } from "../common/AuthTypes";

export function requireAuth<Req extends Request>(
  handler: (req: Req, user: DecodedToken) => Promise<Response>
) {
  return async (req: Req): Promise<Response> => {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.failure("Unauthorized", 401);
    }

    const token = authHeader.slice("Bearer ".length);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
      return handler(req, decoded);
    } catch (error) {
      console.error("JWT verify failed:", error); // ← ligne ajoutée temporairement
      return HttpResponse.failure("Unauthorized", 401);
    }
  };
}