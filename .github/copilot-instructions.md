**Purpose**
- **Goal:** Help AI coding agents be productive in this Turborepo that contains two Next.js apps (`web`, `docs`) and a NestJS backend (`server`) with Prisma.

**Big picture**
- **Monorepo layout:** `apps/` hosts `server` (NestJS + Prisma), `web` and `docs` (Next.js). Shared configs live in `packages/` and `ui/`.
- **Backend:** `apps/server` is a NestJS app. Prisma schema is at `apps/server/prisma/schema.prisma` and the generated client is output to `apps/server/prisma/generated/prisma` (see `generator client` in the schema).
- **Frontend:** `apps/web` and `apps/docs` are Next.js apps using the `app/` directory (React Server Components pattern). UI components are in `ui/src`.

**Key files to reference**
- `apps/server/package.json` — server scripts (`start`, `start:dev`, `test`, `test:e2e`) and dev dependencies (`prisma`, `@prisma/client`, `jest`, etc.).
- `apps/server/prisma/schema.prisma` — Prisma datasource & generator (update models here).
- `apps/server/src/prisma/services/prisma.service.ts` — Nest wrapper around `PrismaClient` (connect/disconnect lifecycle).
- `apps/server/src/review/dtos` and `apps/server/src/review` — example DTOs/controllers/services patterns.
- Root `package.json` — workspace tooling with `turbo` and root scripts (`dev`, `build`, `lint`).

**Project-specific workflows & commands**
- Develop whole monorepo: `npx turbo dev` (or `yarn dev` as root uses Yarn v1). To run only the server: `npx turbo dev --filter=server` or `cd apps/server && yarn start:dev`.
- Build: `npx turbo build` or `npx turbo build --filter=web`.
- Lint/format: root `yarn lint` runs `turbo run lint`; or `cd apps/server && yarn lint`.
- Prisma:
  - After editing `apps/server/prisma/schema.prisma` run `cd apps/server && npx prisma generate` to update the generated client (output path `../generated/prisma`).
  - Migrations/DB sync require setting `DATABASE_URL` in environment. Typical commands: `npx prisma migrate dev --name init` or `npx prisma db push` depending on desired workflow.
- Tests:
  - Server unit tests: `cd apps/server && yarn test`.
  - Server e2e tests: `cd apps/server && yarn test:e2e` (Jest config at `apps/server/test/jest-e2e.json`).

**Patterns & conventions discovered here**
- NestJS module pattern: services and Prisma are provided as Nest modules (`src/prisma/prisma.module.ts` and `src/prisma/services/prisma.service.ts`). Use DI (constructor injection) instead of creating PrismaClient instances in many places.
- Prisma client is generated inside the repo (`apps/server/prisma/generated/prisma`) — reference it via `import { PrismaClient } from '@prisma/client'` as usual after `prisma generate`.
- DTOs live in `src/*/dtos` and use NestJS validation/mapped-types (see `@nestjs/mapped-types` in dependencies).
- Tests use Jest with `ts-jest`; keep tests under `src` or `test` per `package.json` config.

**Integration points / external deps**
- Database: PostgreSQL (datasource `provider = "postgresql"` in Prisma schema). Ensure `DATABASE_URL` is set for any Prisma operations.
- Hosting/CI: Turborepo remote cache is possible (see root README). Frontends are Next.js (deployable to Vercel). Backend is standard Node/Nest app.

**When changing schema or DB code — checklist**
- Update `apps/server/prisma/schema.prisma` models.
- Run `cd apps/server && npx prisma generate`.
- If migrations are required: `cd apps/server && npx prisma migrate dev --name <desc>` (ensure `DATABASE_URL`).
- Run server tests: `cd apps/server && yarn test` and optionally `yarn test:e2e`.

**Examples to look at when coding**
- Prisma usage and lifecycle: `apps/server/src/prisma/services/prisma.service.ts`.
- DTO + controller pattern: `apps/server/review/dtos/create-review.dto.ts` and `apps/server/review/review.controller.ts`.
- Generated Prisma client lives at `apps/server/prisma/generated/prisma` after `prisma generate`.

**Limits / things not assumed**
- There is no existing `.github/copilot-instructions.md` or AGENT file to merge; this file was created from repository discovery.
- The Prisma `schema.prisma` currently only contains generator/datasource stubs — double-check models and run `prisma generate` before relying on generated types.

If anything here is unclear or you want additional examples (API surface, common refactors, or preferred testing patterns), tell me which area to expand and I will iterate.
