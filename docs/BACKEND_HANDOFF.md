# Frontend → backend handoff

Reviewed 24 October 2026 against commit `eb9d3e7`. The original review has since been followed by frontend repairs; see the repair update in `FRONTEND_AUDIT.md` for current behavior. The descriptions below retain the original integration baseline where relevant. No admin dashboard is included. This guide identifies integration work; it does not certify production readiness or guarantee conflict-free collaboration.

## Current implementation and replacement points

| Area | Current behavior | Integration files and required work |
| --- | --- | --- |
| Catalog | Local arrays, name-derived slugs; real-looking, legacy, hero-placeholder and sample products are combined | `app/lib/products.ts`; preserve display fields through an adapter, add stable product/variant IDs, confirm sellable inventory with owner |
| Product routes | Build-time `generateStaticParams`, metadata and related products from local catalog | `app/products/[slug]/page.tsx`; choose runtime rendering or rebuild-on-publish for new products |
| Cart | Browser storage key `amzad-cart`; shape `{name,price,image,qty}`; matching/removal use name | `app/lib/cart.ts`, `Storefront.tsx`, `checkout/page.tsx`; migrate to IDs throughout cards, quick view, details and reorder actions |
| Checkout | Client validation, totals, promo rules, ETA, ID and success screen; no order API call | `app/checkout/page.tsx`; replace submit with quote/create API; retain cart on failure and clear only after confirmed persistence |
| Authentication | Validates input then sets a display name; social buttons simulate a user | `app/components/AuthModal.tsx`, `Storefront.tsx`; real session lifecycle, verified login, logout and recovery; user state currently belongs to each Storefront instance |
| Orders | Last 20 orders stored under `amzad-orders` in the current browser | `app/lib/orders.ts`, `MyOrders.tsx`; authenticated or verified guest access to persistent orders |
| Tracking | Browser lookup, then demo fallbacks; displays customer phone/address | `TrackOrder.tsx`, `orders.ts`, `demo-orders.ts`, `ChatWidget.tsx`; remove production demo fallbacks and authorize access before returning personal details |
| Statuses | Processing, Approved, Delivered, Completed, Cancelled, Returned; old Shipped/Ready to Ship map to Approved | `app/lib/order-status.ts`, `OrderStatusTabs.tsx`; agree server transitions and map API enums to UI labels |
| Invoices | Browser generates downloadable HTML from local order values | `app/lib/order-invoice.ts`; source from persisted order snapshots; decide whether server invoice/PDF is required |
| Reviews | Product and order reviews stored on device | `ProductReview.tsx`, `OrderReview.tsx`; shared review API, purchase eligibility and moderation policy |
| Wishlist | Component memory, matched by name | `Storefront.tsx`; decide guest persistence/account sync; use IDs |
| Newsletter | Client callback unlocks coupon/confirmation UI | `Storefront.tsx`; real subscription persistence and success/failure handling |
| Feedback | Opens prefilled WhatsApp message; user must send it | `FooterFeedback.tsx`; retain as agreed or add feedback endpoint |
| Chat | Scripted browser replies and local order helpers | `ChatWidget.tsx`; keep scripted support or scope service separately; update order integration |
| Blogs | Local articles, build-time routes | `app/lib/blogs.ts`, `BlogPages.tsx`, `app/blogs/[slug]/page.tsx`; decide CMS scope and publishing/rebuild policy |

Paths in the table without a prefix refer to `app/components/`, except `checkout/page.tsx`, which is under `app/`.

## Launch blockers and frontend pitfalls

1. Checkout currently calls `setOrder`, saves locally, and clears the cart without server confirmation. IDs use the last six timestamp digits and can collide. Generate IDs on the server; use idempotency to prevent duplicates after retries/double clicks.
2. Client prices, discounts, shipping and stock are untrusted. Server must calculate the quote and revalidate at order creation, reserving/decrementing inventory atomically according to the agreed lifecycle.
3. Product names are identity across cart/wishlist/reorder flows. Renaming a product or adding package variants will break this assumption. Carry immutable IDs from the API to every purchase action; do not resolve names to arbitrary matches. Old browser carts need explicit migration or a user-facing reset.
4. `MyOrders` automatically displays samples when no local orders exist. Tracking also resolves sample IDs. Replace these with genuine loading, empty, not-found, unauthenticated and error states in production. Search chat for local/sample lookups too.
5. Do not expose customer addresses, phone numbers or invoices through an order ID alone. Guest checkout currently exists; agree verified guest access separately from account login.
6. Checkout contains customer details under `af_checkout_fields` in localStorage. Agree retention and a clear-data mechanism; never use browser storage as proof of identity or payment.
7. Quantity limits differ: checkout caps incrementing at 20, while Storefront additions have no equivalent cap. Server constraints must drive every entry point and report stock conflicts visibly.
8. Existing order models differ: checkout uses structured address fields and a formatted date string; `SavedOrder` uses flattened address and epoch milliseconds. Preserve canonical fields server-side and adapt explicitly. Store authoritative line snapshots, subtotal, discount and delivery amounts; avoid reconstructing historical totals from current catalog prices.
9. Product catalog includes placeholder pricing and sample inventory. Owner must approve the seed catalog before any of these items can be purchased live.
10. `app/checkout/page.tsx.orig` is an old tracked snapshot, not the active route. Do not implement against it. Avoid editing generated `out/`, `.next/`, `.next-dev/` or `node_modules/`.

## Existing business behavior to confirm

These values describe code, not approved production rules:

- Currency BDT; displayed prices are whole taka. Agree rounding and API monetary units.
- Delivery is ৳60, free when merchandise subtotal before promo discount reaches ৳1,000 (`app/lib/offers.ts`). No district-specific pricing is implemented.
- `WELCOME10`: 10% rounded to whole taka; `AMZAD50`: ৳50 off at subtotal ≥ ৳500; `FREESHIP`: shipping offer at ≥ ৳1,000. No server limits, expiry or usage restrictions exist.
- Guest checkout accepts name, Bangladeshi phone, optional email, address, area/thana, district, notes and Home/Office address type. Client validates name ≥3 characters and address ≥6 characters.
- Cash on delivery is the only enabled payment option. bKash, Nagad and cards are disabled placeholders.
- ETA is computed in the browser as two to three days excluding Fridays. Confirm courier policy and calculate with Asia/Dhaka on the server.
- Confirm Delivered versus Completed semantics, allowed cancellations/returns, inventory restoration and notification requirements.
- Confirm admin scope, roles, product variants/weights, courier integration, content management, reviews, subscriptions and online payments before estimating them as committed features.

## Deployment decision

`next.config.mjs` uses `output: "export"`, `basePath: "/amzad-food-website"`, trailing slashes and unoptimized images. `.github/workflows/` builds and publishes `out/` to GitHub Pages on pushes to `main`.

Choose one deployment model before integration:

- Keep static frontend + separate API: host backend/database separately; configure API origin, CORS and authentication for the actual origins. Product/blog detail URLs remain build-time generated unless routing is redesigned; publishing new slugs needs a rebuild.
- Use a Next.js server deployment: remove static-export configuration as part of a reviewed migration, provide runtime data loading and caching, and replace the Pages workflow. API routes/server features require a server-capable host.

Changing `basePath` alone is insufficient for a root-domain launch. Literal `/amzad-food-website` paths appear in TSX, data files and CSS. Inventory with `rg -n '/amzad-food-website' app next.config.mjs`; migrate routing/assets consistently and smoke-test direct nested URLs, refresh, navigation and images. Next Link/router paths and raw anchor/image paths behave differently.

No environment variables are currently required for the demo. Define integration configuration when the architecture is agreed; public client environment variables are included in the bundle at build time. Keep database, payment and session secrets server-side. Provide a placeholder-only `.env.example` with the implementation. Do not commit real credentials.

## Collaboration boundaries to reduce merge conflicts

These are proposed ownership boundaries to agree with the developer; they are not enforced by tooling.

1. Backend developer owns service/database/migrations/admin authorization and API documentation. Frontend integration developer owns API adapters, UI state and component edits. If one developer owns both, follow the same sequence in small PRs.
2. Agree and version the contract in `docs/API_CONTRACT.md` before parallel implementation. Put new API types/client/adapters in a dedicated directory (suggested `app/lib/api/`; does not exist yet). Avoid coupling UI directly to database records.
3. Coordinate edits to `Storefront.tsx`, `checkout/page.tsx`, `globals.css`, shared product/cart/order types, `package.json`, lockfile and `next.config.mjs`: these are shared hotspots. Assign one owner per integration PR; avoid broad formatting or renaming alongside behavior changes.
4. Use feature branches and reviewed PRs into `main`. Pull/rebase before each integration milestone; never overwrite another developer's changes. Remember pushes to main trigger the existing Pages deployment.
5. Keep API migration, authentication, checkout, tracking and deployment changes in separate reviewable steps. Include contract changes and sample responses in the same PR as behavior changes.
6. Preserve current responsive layouts, class names, Bengali/English text and interaction behavior unless a product change is agreed. Capture before/after screenshots for affected screens. Admin UI design remains a separate deliverable to confirm with the owner.

## Suggested implementation sequence

1. Confirm scope, business rules, hosting model and API contract; approve sellable seed data and immutable IDs.
2. Implement catalog API and adapters; migrate cart identity and dynamic product routing together.
3. Implement real auth and verified guest order access; replace simulated social login or hide unsupported providers.
4. Implement quote/create-order transaction and idempotency; add pending/error/retry behavior before enabling real checkout.
5. Connect order history/tracking/invoices, then reviews/subscriptions and remaining agreed features. Remove demo fallbacks and success-only simulations from live flows.
6. Connect admin changes to customer views and inventory; deploy staging, complete acceptance checks, then migrate domain/deployment.

## Acceptance checks for handoff completion

- Fresh clone: `npm ci`, `npx tsc --noEmit`, `npm run build`; document any required env values and seed/migration steps.
- Mobile and desktop: catalog filters/search, product and blog direct URLs, images, cart drawer, quick view, checkout and navigation work under the final base path.
- Rename a product without changing its ID; its cart/reorder links still work. Handle missing, inactive or out-of-stock variants explicitly.
- Submit a real COD order; exactly one persistent order appears in admin. Double-click, retry and simulated timeout do not duplicate it. Failed submission preserves cart and input; confirmation uses server ID/totals.
- Manipulating browser prices, discounts or quantities cannot change authoritative totals or oversell inventory. Test changed prices/stock between quote and submit.
- Orders remain accessible after refresh and on another authorized device. Another customer cannot read their address, phone, invoice or reviews through guessed IDs.
- Admin status updates appear in customer tracking with correct dates. Test empty results, loading, offline errors, invalid sessions and expired guest verification; no sample order appears as real.
- Persisted historical invoice totals stay unchanged after product price edits. Review publication and eligibility follow approved rules.
- Verify final-domain TLS, direct route refreshes, API origin/session behavior, backups/restore procedure, server error visibility and rollback instructions in staging.

## Delivery from backend developer

Source and reviewed PRs; agreed API specification and examples; database schema/migrations and approved seed process; placeholder env template; setup/deploy/rollback instructions; staging URL; admin access setup; test evidence for the checks above; owner-controlled hosting/domain/database accounts and backup instructions. Share secrets through a secure channel, not repository files.
