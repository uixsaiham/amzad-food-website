# Frontend handoff audit and acceptance record

Date: 24 October 2026. Application baseline: `eb9d3e7`, with handoff documentation additions in the working tree. Review status: suitable as a documented frontend prototype for backend implementation; not accepted as a production ecommerce system.

## Repair update — current working tree

The findings table below records the original review. The following frontend repairs are now saved locally:

- F01/F02: Quick View now uses the catalog's actual pack and price. Fabricated weight variants, price multipliers and generated SKU were removed. Backend-issued immutable product/variant IDs remain integration work; name-based cart identity is not certified as production-ready.
- F03: Removed fixed card/Quick View ratings, always-in-stock label, sales-count display, unverified assurance badges and fabricated fallback discount. A discount appears only when the catalog old price exceeds the current price. Other marketing content still requires owner approval.
- F04/F05: Shared delivery-charge copy follows the existing automatic ≥৳1,000 rule; detail/Quick View refer to the checkout estimate. Chat shipping wording was corrected. Removed the unapproved three-day return promise.
- F07: Removed category-derived ingredient claims and generic purity claims from detail tabs, plus unsupported fallback product specifications in Quick View. Existing named-product descriptions and marketing sections still need content approval.
- F08: Fixed prayer-time displays are visibly labeled as sample schedules; current prayer calculations still require a real data source before being represented as live times.
- F09: Added shared modal focus trapping, Escape handling, focus restoration and overlapping-dialog scroll locking for AuthModal and Quick View. Browser keyboard/visual verification is still required.
- F10: Cart/order storage parsing now validates shapes and drops invalid records; cart quantities cap at 20 across entry points. Checkout restores only string fields. Local order-save failure preserves the cart and shows an error.
- Authentication no longer simulates successful login for arbitrary credentials or social buttons. Account and newsletter interactions explicitly identify unavailable services. Checkout identifies a device-only preview and requires contacting the team for confirmation; preview IDs use UUIDs. My Orders no longer automatically fills an empty account with demos; sample preview remains an explicit user action. Chat no longer resolves sample IDs as real orders.

Still open: F06 approved policy/social destinations and real recovery, F11 ESLint setup, backend identity/persistence/stock/auth, deployment decisions, final content approval and runtime browser checks. Demo tracking remains available as a labeled design preview. These are listed rather than falsely marked fixed.

Final repair verification: TypeScript, storage/quantity/order/shipping regression checks, production build and whitespace check passed. Rebuilt export: 83 HTML files, 10,252 local references, zero missing targets. Exported Mustard Oil 5 Ltr visible text was checked for its correct pack/price and absence of fabricated variants, fixed review count and stock label. Visual browser and keyboard interaction checks remain unverified.

Run `node scripts/check-frontend.cjs` for storage/quantity/shipping regression checks and `python3 scripts/check-static-export.py` after the production build for local exported targets. No backend service was added.

## Verified evidence

| Check | Result | Scope/limit |
| --- | --- | --- |
| `npx tsc --noEmit` | Passed during handoff review | Type checking with existing installed dependencies |
| `npm run build` | Passed; Next reports 84 generated pages | Compilation, type validation and static generation, not interaction tests |
| `python3 scripts/check-static-export.py` | 83 exported HTML files, 10,654 local src/href references, zero missing unique targets | Checks built HTML targets with current base path; excludes external URLs, CSS URLs, srcset, fragment validity and client-only content |
| `git diff --check` | Passed during review | Whitespace check, not functional validation |
| Source review | Catalog, cart, checkout, auth, history/tracking, reviews, chat, menus, product detail, deployment and content examined | Findings below and in BACKEND_HANDOFF.md |

Next's generation count and exported HTML count describe different build outputs; do not treat either as an interaction-test count. Local toolchain during checks: Node v26.8.1, npm 11.19.0; existing CI requests Node 20. Fresh `npm ci` and CI execution under Node 20 were not verified in this session. No browser connection was available, so responsive layout, keyboard/screen-reader behavior, browser console and end-to-end checkout have not been visually/runtime verified. No external integration, payment, email/SMS, dependency vulnerability or production security assessment is claimed.

## Additional confirmed findings

These are existing frontend issues or scope gaps, not backend implementation failures. Owner assignments below are proposed and must be accepted by the people doing the work.

| ID / priority | Evidence and reproduction | Required resolution / suggested owner |
| --- | --- | --- |
| F01 / launch blocker | `QuickView.tsx` defines global 250 gm/500 gm/1 kg options and multiplies prices by 0.55/1/1.9. Open Mustard Oil 5 Ltr or any combo: details default to 500 gm despite the card unit. | Frontend + backend: replace fabricated options with approved product variants; preserve variant identity through cart and checkout. Owner supplies actual units/prices. |
| F02 / launch blocker | `QuickView.tsx` builds cart names by appending selected size; default 500 gm uses the unqualified product name. Cart keys use name alone. | Frontend: use immutable product/variant IDs across card, detail, quick view, reorder and cart. Backend validates those IDs and quantities. |
| F03 / high | Quick View defaults to a ৳50 saving when no old price exists, always displays In stock, 4.9 and 46 reviews. `Storefront.tsx` cards also show fixed ratings. | Frontend + owner: remove unapproved claims or render authoritative availability, actual review aggregates and valid old-price comparisons. |
| F04 / high | `ProductDetails.tsx` says free delivery requires FREESHIP and orders over ৳1,000, whereas `offers.ts`/checkout apply it automatically at ≥৳1,000. Quick View says ৳60 on every order. | Owner approves one rule; frontend unifies copy with server quote. Check ৳999, ৳1,000 and discounted subtotals. |
| F05 / high | Detail tabs say 2–3 days in Dhaka and 3–5 elsewhere; Quick View says 2–3 nationwide; checkout calculates 2–3 days excluding Fridays. Three-day returns are hardcoded in ProductDetails. | Owner approves delivery/returns policy; backend returns applicable estimates, frontend uses consistent wording. |
| F06 / high | `Storefront.tsx` and `MegaMenu.tsx` policy/social actions show Coming soon; `AuthModal.tsx` forgot-password has no recovery flow. Static export contains `href="#"` anchors across 81 HTML files (some intentionally use client handlers). | Frontend + owner: inventory each action, provide real destinations/content or explicitly remove/defer. Implement recovery with backend if password login is retained. Placeholder anchors alone do not prove a broken handler. |
| F07 / high | `ProductDetails.tsx` generates generic ingredient/no-additives statements from category; QuickView uses fallback origin, shelf life, sales counts and product descriptions. Reviews/ImpactStats are local marketing content. | Owner supplies approved product-specific content; frontend/CMS integration renders it. Do not infer factual product specifications from category or placeholder data. |
| F08 / medium | `PrayerTimes.tsx` uses a fixed approximate Dhaka timetable, sehri/iftar constants and browser-local clock; city selector says coming soon. | Owner decides whether to retain. Frontend/service integration needs date/location/timezone-aware data or clear labeling; not an existing backend feature. |
| F09 / medium | QuickView/AuthModal use dialog semantics but no complete focus-trap/restore flow is evident in source. QuickView sets body overflow independently of other overlays. | Frontend: runtime keyboard checks for Tab/Shift+Tab/Escape, focus return and overlapping overlays; add focus management where missing. Source finding, not a completed accessibility test. |
| F10 / medium | Cart/orders load parsed localStorage without validating the full data shape; read failures return empty arrays. Saved customer fields are merged from parsed storage. | Frontend: validate storage input/version migration; distinguish malformed/stale data and reset safely. Backend never trusts these records or treats them as authenticated orders. |
| F11 / medium | `package.json` has `next lint` but no ESLint configuration/dependency setup. No dedicated automated test suite or frontend test gate is present in scripts. | Engineering: agree CI checks and configure lint before claiming it passes; add focused integration tests with backend work. Build success alone is insufficient acceptance evidence. |

The existing backend blockers (simulated authentication, browser-only orders/reviews, client totals and ID creation, demo tracking, static-only publishing) are detailed in BACKEND_HANDOFF.md and remain open. The repair update above supersedes the original behavior findings where noted; business-dependent findings still require the agreed catalog, rules and API integration.

## Scope and responsibility record before development starts

Copy this table into the team's issue tracker or agreement and fill it in together. Blank fields mean unagreed, not implicitly included.

| Workstream | Owner | Included deliverable / acceptance | Estimate / milestone | Accepted by |
| --- | --- | --- | --- | --- |
| Frontend defects F01–F11 | To agree | Resolve or explicitly defer each item, with evidence | To agree | To agree |
| API/database/inventory | To agree | Approved contract, migrations, atomic stock/order handling | To agree | To agree |
| Frontend API integration | To agree | Real loading/error/success states across agreed screens | To agree | To agree |
| Authentication and guest access | To agree | Authorized history, tracking and invoice access | To agree | To agree |
| Admin UI design | To agree | Screens, states and workflows supplied/approved by owner | To agree | To agree |
| Admin implementation | To agree | Product/order management and server-enforced roles | To agree | To agree |
| Content/business decisions | Project owner | Final catalog, policies, shipping, payments, claims | To agree | To agree |
| Hosting/domain/operations | To agree | Staging, live setup, monitoring, backups and rollback | To agree | To agree |
| Final acceptance | Project owner + developer | Staging checklist from handoff, recorded results | To agree | To agree |

Share a specific commit/tag with this record and the proposed contract. Ask the developer to record exceptions and missing inputs before agreeing the estimate. Record later scope changes with their impact on cost and time. This creates a traceable handoff; it cannot prevent someone raising a legitimate defect or additional requirement later.

## Remaining verification before claiming frontend completion

1. Fresh install and build in the agreed Node version and CI; configure lint and focused tests.
2. Browser checks on mobile/desktop and keyboard navigation, with screenshots and console/network evidence.
3. Confirm catalog variants, copy/policies, disabled features and marketing claims with the owner; resolve/defer findings by ID.
4. Run backend acceptance checks from BACKEND_HANDOFF.md against staging, including persistence, authorization, idempotency, concurrent stock changes and failed requests.
5. Recheck all final-domain routes/assets after deployment changes; confirm production has no demo-order fallbacks or fake success flows.
