# Proposed frontend API contract

Proposal for discussion, 24 October 2026. No endpoints, API client or schemas below are implemented. Backend and frontend owners must agree the contract and produce a machine-readable specification before integration. Authentication/provider/hosting choices remain open.

## Conventions

- Suggested prefix `/api/v1`; a separate backend may use an absolute origin instead.
- Immutable opaque IDs for products, variants, orders and customers; separate stable product slugs and human-readable order numbers. Never use names as IDs or order numbers as authorization.
- Suggested money representation: integer BDT minor units (100 minor units = ৳1) plus `currency: "BDT"`. Existing UI uses whole taka: adapters must convert explicitly, including invoice formatting. Confirm this convention before implementation.
- ISO 8601 UTC timestamps from server; display using Asia/Dhaka. Existing `SavedOrder` expects epoch milliseconds: convert in the adapter.
- List response `{ data: [...], pagination: { page, pageSize, total } }`; single response `{ data: {...} }`. Agree maximum page size, sorting and filters.
- Errors: `{ error: { code, message, fieldErrors?, requestId? } }`. Suggested HTTP statuses: 400/422 validation, 401 missing/expired session, 403 forbidden, 404 missing resource, 409 price/stock/state conflict, 429 rate limit, 5xx server failure. UI must handle network failures separately.
- Runtime validation at API boundaries; TypeScript interfaces alone do not validate JSON. Document optional/null values consistently.
- Prefer secure HttpOnly sessions if compatible with deployment. Agree cookie domain/SameSite/Secure, CSRF protection and credentialed CORS rules where needed. Do not store session secrets in localStorage.

## Resources and frontend consumers

| Suggested endpoint | Responsibility | Consumer |
| --- | --- | --- |
| `GET /products?q=&category=&page=&pageSize=` | Published, sellable catalog and pagination | Storefront, AllProducts, product selection |
| `GET /products/{slug}` | Product with IDs, variants, gallery, category and related products | Product route, ProductDetails, QuickView |
| `GET /categories` | Category IDs/names and agreed aliases | Category rail, MegaMenu and catalog filters |
| `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me` | Verified identity and session lifecycle | AuthModal, Storefront header |
| `POST /checkout/quote` | Authoritative totals, inventory/quantity checks and delivery estimate | Checkout, promo application |
| `POST /orders` | Revalidate quote, persist order transaction and return confirmed totals | Checkout submit |
| `GET /me/orders?status=&page=` | Current customer's history only | MyOrders |
| `GET /orders/{id}` | Authorized order details and tracking events | TrackOrder, chat order helper |
| `POST /guest-order-access/request`, `POST /guest-order-access/verify` | Proposed phone/OTP guest verification; agree provider and expiring grant mechanism | Guest tracker (requires UI work) |
| `GET /orders/{id}/invoice` | Authorized invoice representation/download, if server invoices are agreed | TrackOrder download |
| `GET /products/{id}/reviews`, `POST /products/{id}/reviews` | Published reviews and eligible submissions | ProductReview, OrderReview |
| `POST /subscriptions` | Persist contact, channel and consent | Newsletter |
| `GET /blogs`, `GET /blogs/{slug}` | Optional CMS content | BlogPages and blog route |

Recovery, phone/email verification, real OAuth, wishlist synchronization, feedback storage, courier/payment integrations and admin endpoints require separate scope and contract. UI buttons must not imply these services exist until implemented. All admin writes require server-enforced roles; hiding controls does not authorize access.

## Minimum product shape

```ts
type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  bn?: string;
  category: { id: string; name: string };
  brand: string;
  currency: "BDT";
  image: string;
  images: { src: string; label: string }[];
  variants: {
    id: string;
    sku: string;
    unit: string;
    priceMinor: number;
    oldPriceMinor?: number;
    availableQuantity: number;
    purchasable: boolean;
  }[];
};
```

Current `Product` exposes one price/unit and only three typed brand names; arbitrary API brands and multiple variants need deliberate UI/type changes. Preserve optional gallery crop metadata (`scale`, `x`, `y`) where needed for existing imagery. Decide tags, featured placements, merchandising order and category aliases separately; these currently depend on local arrays. Image URLs should be valid for the final deployment, without assuming the GitHub Pages prefix.

## Quote and order creation

Suggested quote request:

```json
{
  "items": [{ "productId": "product_123", "variantId": "variant_123", "quantity": 2 }],
  "promoCode": "WELCOME10",
  "deliveryAddress": { "district": "Dhaka", "area": "Dhanmondi" },
  "paymentMethod": "cod"
}
```

Quote returns `quoteId`, `expiresAt`, validated line snapshots, `subtotalMinor`, `discountMinor`, `deliveryFeeMinor`, `totalMinor`, `currency`, eligibility messages and delivery estimate. State whether quoting reserves stock; suggested default is no reservation until order creation.

Creation submits the quote ID, items, promo code, customer `{name, phone, email?}`, structured address `{address, area, district, addressType}`, optional notes and payment method. Prices/totals supplied by the browser never override server calculations. Include an `Idempotency-Key` header stable for one checkout attempt and retries; define duplicate response and mismatched-payload behavior. Revalidate expired quotes, prices, coupons and stock transactionally, returning a conflict requiring customer confirmation if totals change.

Return a persisted order with opaque `id`, display `orderNumber`, status, payment method/status, ISO timestamps, customer/address, immutable line snapshots (`productId`, `variantId`, SKU/name/unit/image, quantity, unit price and line total), explicit subtotal/discount/shipping/grand total and tracking events. Do not require later catalog lookups to reconstruct history. The adapter must distinguish API ID from displayed AF order number throughout navigation and invoice rendering.

Only clear the cart after a confirmed create response. If the request times out after persistence, retry/reconcile using the same idempotency key rather than creating a new order. The server must define how guest callers recover their own creation result securely.

## Status mapping and protected tracking

Suggested server enums map to existing UI labels:

| API status | UI label |
| --- | --- |
| `processing` | Processing |
| `approved` | Approved |
| `delivered` | Delivered |
| `completed` | Completed |
| `cancelled` | Cancelled |
| `returned` | Returned |

Agree transitions and permitted actors before implementing. Shipping preparation/handover can be timeline events if separate states are unnecessary. Do not silently map unknown API statuses to Processing, as the current local helper does. Define payment status independently of delivery status.

Order access requires the owning session or an expiring verified guest grant. A query parameter containing an AF number must never expose full order details by itself. Rate-limit verification and lookup, avoid responses that reveal whether arbitrary phone/order combinations exist, and apply the same checks to invoices and chat. Guest verification and expired-access states require frontend design/integration work.

## Cross-team acceptance fixtures

Provide example success and failure JSON for: empty catalog, unavailable variant, renamed product, invalid/expired session, quote with/without promo, changed price, insufficient stock, repeated idempotent order creation, empty order history, each order status, unauthorized order/invoice access, expired guest grant, review rejection and subscription failure. Use these fixtures for independent frontend/backend work after the contract is agreed; they must never become production fallbacks.
