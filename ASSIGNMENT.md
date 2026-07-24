# Team Assignment — Booking/Reservation Service (TypeScript + Bun.js + Postgres)

**Duration:** 1 week
**Stack:** TypeScript, Bun.js, PostgreSQL via TypeORM — same structure as our other services
**Mode:** Collaborative — one shared repo, feature branches, PRs into `main`

---

## Goal

Build a Booking/Reservation service: resources (rooms, desks, equipment — anything bookable) with time-slot bookings against them. The base project is already scaffolded on `main` — `data-source.ts` (Postgres connection), `Bun.serve` wiring in `app.ts` using Bun's native `routes` object (no custom router class), the `Resource` schema/form/service/controller with baseline `GET /resources` and `GET /resources/:id`, an initial migration creating the `resources` table, and a working `/health` route. Each of you owns one feature area, worth 3 endpoints/behaviors. Work on your own branch and open a PR into `main` when your feature is ready.

No auth on this one — that's coming in a future assignment. Focus on the booking domain logic itself.

Follow the existing layering for whatever you add: a schema in `src/models/schemas`, a form in `src/forms`, logic in `src/services` (extend `BaseService`), request handling in `src/controllers` (return responses via `HttpResponse`), and a route object in `src/routes` merged into `app.ts`. Add a migration for any new table under `src/database/migrations`.

## Shared Entities (extend as needed)

`Resource` already exists (`src/models/schemas/ResourceSchema.ts` + `src/forms/resource.ts`):

| Field        | Type   | Notes                                  |
|--------------|--------|------------------------------------------|
| `id`         | int    | primary key, auto-increment              |
| `uuid`       | string | UUID, generated on create                |
| `name`       | string | required                                 |
| `type`       | string | e.g. `room`, `desk`, `equipment`         |
| `capacity`   | int    | required                                 |
| `created_at` | Date   | set on create                            |
| `updated_at` | Date   | updated on every change                  |

You'll need a `Booking` schema too (owned by Feature 2 below) — something like:

| Field         | Type   | Notes                                              |
|---------------|--------|--------------------------------------------------------|
| `id`          | int    | primary key, auto-increment                          |
| `uuid`        | string | UUID, generated on create                            |
| `resource_id` | int    | FK to `resources.id`                                 |
| `booked_by`   | string | name/email, plain string, no auth                    |
| `start_time`  | Date   | required                                             |
| `end_time`    | Date   | required, must be after `start_time`                 |
| `status`      | string | `confirmed` \| `cancelled`                           |
| `created_at`  | Date   | set on create                                        |
| `updated_at`  | Date   | updated on every change                              |

Coordinate in the group chat before merging schema changes — whoever lands `Booking` first should ping the other two and add it to `src/models/schemas/index.ts` and `data-source.ts`'s `entities` array.

---

## Feature 1 — Resource Management

**Owner: (assign)**

1. Full CRUD for resources: `POST /resources`, `PUT /resources/:id`, `DELETE /resources/:id` (`GET /resources` and `GET /resources/:id` already exist). Validate `name`, `type`, `capacity` (capacity must be a positive number) in `ResourceController`.
2. Availability windows: let a resource define when it's operable, e.g. `POST /resources/:id/availability` with a weekly schedule or open/close times. Add the columns/table via a migration and extend `ResourceSchema`/`ResourceEntity`.
3. Block/unblock a resource for maintenance: an endpoint that marks a resource temporarily unbookable (e.g. `PATCH /resources/:id/block` / `/unblock`), and Feature 2's booking creation must respect this.

## Feature 2 — Booking Core

**Owner: (assign)**

1. Add the `Booking` schema/form/service/controller/routes (see table above), then `POST /bookings` — validate the resource exists, isn't blocked (Feature 1), and the requested `start_time`/`end_time` don't overlap an existing **confirmed** booking on that resource. Return 409 (or 400 — pick one and document it) on conflict.
2. Update/cancel a booking: `PUT /bookings/:id` for edits, and a way to cancel (e.g. `PATCH /bookings/:id/cancel`) that sets `status: "cancelled"`. A cancelled booking can't be edited further or re-confirmed.
3. List bookings: `GET /bookings` filterable by `resource_id`, `status`, and a date range (`from`/`to` query params).

## Feature 3 — Search & Policy

**Owner: (assign)**

1. Availability search: `GET /availability?type=room&from=...&to=...` — given a resource type and a time range, return which resources of that type are free for the whole range (i.e. no overlapping confirmed booking, and within the resource's availability window from Feature 1).
2. Cancellation policy: enforce a minimum notice period for cancellations (e.g. can't cancel within 2 hours of `start_time`) — return a clean 400 with an explanatory message if violated. This wraps Feature 2's cancel endpoint, so coordinate on where the check lives.
3. Booking history/reporting: `GET /bookings/history` — e.g. paginated past bookings, or a summary endpoint (counts by status, upcoming vs. past, busiest resource). Pick whichever is more useful and document your choice in the PR description.

---

## Git & Collaboration

- Work on a feature branch per person (e.g. `feature/resource-management`), not directly on `main`.
- Commit incrementally with clear messages, same expectation as before.
- Open a PR into `main` when a feature is ready for review — don't wait until the whole thing is done to open it; draft PRs are fine.
- You will depend on each other's schemas/endpoints (Feature 2 needs Feature 1's block state; Feature 3 needs both). Talk to each other before making breaking changes to shared schemas — this is the point of the exercise.
- Each new table needs its own migration (see `src/database/migrations/20260724000001-CreateResources.ts` for the pattern). Run `bun run migrate:db` after pulling migration changes from teammates.

## Deliverables

1. Three PRs (one per feature) merged into `main`.
2. Updated `README.md` covering install/run, migrations, plus example `curl` requests for every endpoint added.

## Rules

- Same as before: you may use AI tools to learn, but you must be able to explain every line in a review session.
- Ask questions early, and especially ask each other — this assignment is explicitly testing how you handle shared code and dependencies between features, not just individual output.

Good luck!
