# booking-service

A Booking/Reservation service built with **Bun.js**, **TypeScript**, and **PostgreSQL** (via **TypeORM**), following the same structure as our other services: `models/schemas` (TypeORM entities), `forms` (typed payloads), `services` (business logic), `controllers`, and `routes`.

Routing uses Bun's native `Bun.serve({ routes })` — no custom router class.

---

## Prerequisites

- [Bun](https://bun.sh/) v1.2+ (native route object support)
- PostgreSQL v14+, running locally (no Docker for this project)

## Installation

```bash
git clone <this-repo-url>
cd booking-service
bun install
cp .env.example .env
```

Update `.env` with your local Postgres credentials, then create the database:

```bash
createdb booking_service
```

## Running migrations

```bash
bun run migrate:db
```

## Running the app

```bash
bun start
```

Server starts at `http://localhost:3000`.

## Project Structure

```
src/
  models/schemas/   # TypeORM EntitySchema definitions
  forms/            # Typed entity + create/update payload interfaces
  services/         # Business logic, extends BaseService for common CRUD
  controllers/      # Request handling, calls services, returns Response via HttpResponse
  routes/           # Bun.serve route objects, one per feature, merged in app.ts
  database/migrations/
  common/HttpResponse.ts
  data-source.ts
  app.ts
index.ts
```

## Endpoints

Baseline (already wired up):

```bash
curl http://localhost:3000/health

curl http://localhost:3000/resources

curl http://localhost:3000/resources/1
```

The rest of the endpoints (resource CRUD, availability windows, blocking, bookings, search, cancellation policy, history) are being built out across three feature branches — see `ASSIGNMENT.md`. Add curl examples for each endpoint here as you build it.

## Notes

- No auth on this service — that's a separate, later assignment. Don't add auth checks here.
- Storage is Postgres, not in-memory — restart-safe, but you're responsible for running migrations.
