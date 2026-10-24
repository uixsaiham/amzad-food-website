# Amzad Food

Next.js App Router storefront using React and TypeScript. This repository currently contains a frontend demonstration; it has no database, backend API, real authentication, or admin dashboard.

## Local setup

Use Node.js 20 (the version used by the existing CI workflow) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3001/amzad-food-website/ . The development script uses port 3001. If required, bind explicitly with `npm run dev -- --hostname 127.0.0.1`.

```sh
npx tsc --noEmit
node scripts/check-frontend.cjs
npm run build
python3 scripts/check-static-export.py
```

The build exports static files into `out/`. Development output is `.next-dev/`; production build output is `.next/`. `npm run start` is not the serving workflow for the current static export. `npm run lint` exists, but no ESLint configuration is supplied; it is not an unattended verification gate yet.

## Backend handoff

Start with [the backend handoff](docs/BACKEND_HANDOFF.md), then review [the proposed API contract](docs/API_CONTRACT.md). The API contract is a proposal, not an implemented service or an approved business specification.

See [the frontend audit and acceptance record](docs/FRONTEND_AUDIT.md) for verified checks, existing defects, unresolved scope and responsibilities. After building, run `python3 scripts/check-static-export.py` to check local HTML link/asset targets.

Deployment currently targets GitHub Pages under `/amzad-food-website`. Before changing the host or domain, review the routing and asset-path migration notes in the handoff.
