# Amzad Food - Complete Claude + Figma MCP Design Prompt

Version: 9 November 2026. Reference baseline: local commit 62c07a3.
Copy this entire document into Claude with Figma MCP connected. This is a build instruction for editable Figma design and prototype work, not a request for an implementation in code. When a repository or running site is accessible, use it as the source of truth for exact assets, copy, data and existing behavior.

## 01 - Mission and execution contract

Act as a senior product designer and design systems architect. Recreate the complete Amzad Food storefront as editable native Figma frames, reusable components and a connected interactive prototype. Cover every route, every home section, repeated card family, overlay, form, responsive composition and meaningful interaction state described here. Keep the latest minimal editorial design direction. Do not deliver a single landing page or a collection of screenshots as the finished design.

Use the Figma MCP tools available in your environment. Read the relevant tool instructions before calling them. Inspect available file context, components and libraries first. Use an existing authorized destination if supplied; otherwise create a dedicated file when supported. If no usable destination or file-creation capability exists, ask for the Figma destination and continue preparing the component inventory. Never claim a tool action succeeded without checking its result.

Work in bounded batches: foundations, components, shell, home, catalog, product detail, checkout, orders, editorial/support, overlays, prototype, QA. Validate each batch before continuing. Keep a progress ledger of frames created, interactions connected, gaps and remaining work. If one response cannot finish the file, continue from that ledger instead of restarting or silently omitting sections.

Use native text, vector shapes, auto layout, constraints, variables, styles, component instances and variants. Product photos may be raster assets. Do not flatten whole screens into bitmaps. Do not introduce real backend functionality, real payment processing or successful authentication into a prototype of this frontend demonstration.

## 02 - Figma file organization and frame coverage

Organize the file into: 00 Readme and coverage; 01 Foundations; 02 Components; 03 Desktop; 04 Mobile; 05 Tablet checks; 06 Overlays and states; 07 Prototype flows; 08 QA and handoff. If the available API cannot create pages, use clearly named top-level sections with the same grouping.

Use 1440px desktop frames, 390px mobile frames and 768px tablet review frames. Also verify a 360px mobile width. These are proposed Figma working sizes, not claims about exact existing CSS values. Desktop content should sit in an approximately 1240px centered container. Use flexible content heights and scrolling frames, never squeeze complete long pages into one viewport.

Create desktop and mobile full-page frames for Home, Catalog, Product Detail, Checkout, Checkout Confirmation, My Orders, Track Order Lookup, Order Details, Blog Listing, Blog Article and FAQ. Create all actual product and blog routes as data-driven instances when the source catalog is available; use reusable page templates rather than redesigning each item. Include explicit empty, error, selected and terminal-status frames as specified later.

Tablet coverage must include the shell, home, catalog, product detail and checkout. Add a responsive annotation for other templates. Name frames clearly: D/Home/Default, M/Catalog/FiltersOpen, D/Search/Results, M/Checkout/Error and so forth. Keep design annotations outside product frames.

## 03 - Visual system and tokens

Create a warm, premium, natural Bangladeshi food identity. Use light typography, concise copy, confident product imagery and generous spacing. Keep the content minimal within each component while retaining every page section. Deep green supports brand trust; cream and white keep surfaces calm; orange identifies purchase actions and offers.

Create primitive and semantic variables. Core colors: deep green #234c3b; ink #17352a; supporting green #246247; action orange #ff6418; warmer offer orange #eb682d; price green #009b31; page cream #f6f5ef; warm panel #fffdf7; white #ffffff; quiet pale green #f3f6ee; border #dfe4dc; muted text #718078. Check contrast and darken supporting text when necessary. Include semantic error, warning, success and focus colors without overwhelming the palette.

Use Gelasio for editorial headings, Plus Jakarta Sans for body and controls, Manrope for product names and Anek Bangla for Bengali. Use available fallbacks only if fonts cannot be loaded and annotate substitutions. Use regular/medium weights primarily, semibold for key labels and prices. Editorial italic orange phrases are selective accents. Do not force Latin letter spacing onto Bengali.

Define spacing 4, 8, 12, 16, 20, 24, 32, 40, 48 and 64px; allow compact 10px product-content gaps. Radius roles: 8px compact controls; 10-12px fields/cards; 16-24px promotional panels; full radius for intentional circles. Use thin borders and soft low-opacity green-black shadows. Do not reproduce the source CSS's universal radius override as a design principle.

Provide text styles for display, page heading, section heading, card heading, body, label, caption, price and old price. Product names are about 14-16px desktop and 13-14px mobile. Body starts around 14-16px with comfortable line height. Keep mobile form inputs comfortably usable. Create icon sizing and stroke rules with a consistent Lucide-like outline family.

## 04 - Reusable component library

Build components before assembling pages. Include Button with filled, outlined, text and icon variants; IconButton; Badge; SellingBadge; DiscountBadge; PriceGroup; QuantityPill; QuantityStepper; Input; PhoneInput; Select; Textarea; Checkbox; RadioCard; Tooltip; Tabs; FilterChip; SortMenu; Pagination; Breadcrumb; Toast; InlineAlert; EmptyState; Skeleton; Accordion; ProgressBar; TimelineStep and ModalShell.

Create composed components: DesktopHeader, MobileHeader, SupportStrip, DesktopMegaMenu, MobileMenu, BottomNavigation, CategoryRail, BrandStrip, ProductCard, ProductGallery, SearchResultRow, SearchPanel, CartLine, CartOfferProgress, OrderSummary, OrderCard, OrderProductRow, OrderStatusTabs, AddressCard, TrackingTimeline, ReviewCard, VideoReviewCard, ReviewForm, BlogCard, FeaturedArticle, ArticleTOC, NewsletterBanner, TrustCard, ImpactStat, PrayerCard, SupportCard, FooterFeedback and Footer.

Create overlays: OfferDialog, QuickViewDialog, CartDrawer, AuthDialog, OriginStoriesDialog, OrderReviewDialog, ChatPanel and BlogProductRecommendation. Include default, hover, pressed, focus-visible, selected, disabled, loading, empty and error states where meaningful. Loading states for remote services should be marked proposed if not present in the current local UI.

Use descriptive variant properties rather than disconnected copies. Use instance swaps for icons and product images. Set auto-layout padding and resizing correctly. Include long English/Bangla titles, missing images, large prices and multi-item content in component stress tests.

## 05 - Shared header, menus and footer

Desktop: black contact strip with WhatsApp 01327406605 and phone 09613824071; tracking and order links; logo; navigation links; live search; account; cart with orange quantity badge and subtotal; expanded menu trigger. Follow actual navigation labels from the repository. Include default, active link, search open, mega menu open and cart-count states.

Mobile: compact black support strip with WhatsApp and phone on the left and Track Order on the right. White header with hamburger, centered readable logo, account action and dark-green cart icon. Preserve the orange count badge. Provide expanded mobile Menu and Category tabs, category list, supporting links, search and support contacts. Ensure the icon does not disappear against white.

Bottom mobile navigation: Home, Menu, prominent Search, Cart and Account. Reserve safe-area space and avoid covering page content or checkout controls. Header search expands accessibly; bottom Search opens it and moves the view to the top.

Category rail: image/icon category items, active selection, horizontal overflow, previous/next arrows and an All end slot. Show overflow and end-of-rail states. Use actual categories when available. Mega menu includes category tiles and a supporting promotional panel. Menus dismiss through their controls, outside click or Escape where applicable.

Footer: light logo on dark background; brief brand statement; address Bosila, West Dhanmondi Housing Society, Block B, Road 9, House 15, Dhaka; help@amzadfood.com; 09613-824071; Shop, Company and Help link columns; Bengali feedback form; social buttons; payment-logo strip; copyright; back-to-top action. State Cash on Delivery available and online payments coming soon. Returns, privacy, terms and unavailable social destinations must use an honest unavailable state instead of linking to invented pages.

## 06 - Home page: every section in order

Build the complete home page, not a shortened excerpt. Preserve this sequence: shared shell and category rail; rotating hero; brand-family strip; Top Selling Products; source-to-table journey; origin story and honey feature band; All Products shop; newsletter; Combo Packages with honey editorial promotion; prayer schedule; trust section; impact statistics; reviews; blog preview; complete footer. Include global offer dialog, prayer dock, chat and bottom mobile navigation as appropriate.

Hero: three slides for spices, sweets/snacks, and honey/ghee/wellness. Each uses a short editorial headline, concise description, collection artwork and shopping CTA. Include current slide indicator, manual navigation and auto-advance behavior annotation. Where the existing artwork contains individually linked products, represent those hotspots and connect them to the matching product frames. Avoid overlapping hotspots or inaccessible unlabeled actions.

Brand strip: brand-family heading and existing logo marks. Top Selling Products: section title, View All and six cards visible per page in a two-column, three-row arrangement. Preserve pagination for remaining items. Include the latest six-card layout, not the earlier four-card layout.

Journey: Our Promise label; From Source to Your Table heading; concise supporting line; four connected steps Sourced, Quality Checked, Premium Packaging and Delivered. Each step has an icon, title and short text. Stack or reflow on mobile.

Feature band: Origin card with Bangladesh map, regional markers and Explore Origin Stories CTA. Regions: Sylhet/tea, Rajshahi/mango, Comilla/spices, Sundarbans/honey, Dinajpur/rice, Tangail/chomchom and Jessore/date-palm jaggery. Use exact source content when available; verify region-to-product associations directly against originStories in Storefront.tsx before finalizing copy. Alongside it, show a honey product promotion with artwork, badges, current/old price, savings and Add to Cart. Treat existing product claims as reference content requiring owner approval, not newly verified facts.

All Products: section heading and View All; All and Offer Zone plus category pills; sort menu; product grid; pagination. The current home section allows up to eight rows desktop and four rows mobile according to measured columns. Show the default grid and category-selected state; do not manually duplicate the full catalog in every state.

Newsletter: promotional visual/copy, email input, subscribe action and validation/unavailable-service feedback. Combo Packages: combo cards plus the honey editorial side promotion, image, short copy and Discover our honey link.

Prayer section: Bengali sample schedule with current/next prayer, date context, time row, sample label and existing controls. Include Fajr, Dhuhr, Asr, Maghrib and Isha plus sehri/iftar content where source provides it. Do not present static sample times as live verified prayer data.

Trust: intro and decorative seal, then six trust cards for Authentic, Lab Tested, Premium Quality, No Preservatives, Secure Packaging and Customer Support using current source labels. Impact: four animated count-up cards for 50K+ Happy customers, 200+ Quality products, 60+ Districts covered and 4.8/5 Customer rating. Treat these as existing marketing reference values requiring approval, not verified facts. Reviews: written/video presentation, filters or tabs from source, story cards and navigation. Blog preview: editorial cards with image, category, title, excerpt and reading metadata, with links to listing and article templates.

## 07 - Product cards and quantity-dependent imagery

Design horizontal and compact vertical ProductCard variants. Anatomy: product image; optional Best Selling/New/discount badge; eye quick-view control; bilingual product title; green current price; muted strikethrough old price when valid; quantity options; outlined orange Order Now; separate cart icon action. Maintain around 10px between title, price, options and actions, and 8px gaps among pills and buttons.

Dummy variant examples: combo/box items have 1 pack, 2 packs and 3 packs; weight items have 250 gm, 500 gm and 1 kg; liquid items have 500 ml, 1 L and 5 L. Preserve the product's current pack as the default where data supports it. These are demo inventory options, not owner-approved production SKUs.

For pack selection, switch the image preview from one product artwork to two or three overlapping copies. For weight/volume, use smaller, medium and larger artwork. Add a quantity chip under the preview. Update active pill, price and artwork together. Use artwork that corresponds to the product, and annotate any dummy pack image. Do not fabricate a quantity-specific package photo as a verified asset.

Show default, selected 2-pack, selected 3-pack, smaller weight, larger weight, hover, keyboard-focus and in-cart states. Product title and image open detail. Eye opens quick view. Cart adds selected variant and displays feedback. Order Now uses the selected variant for checkout. Respect the current quantity cap of 20. Do not add fictitious ratings, stock counts or sale totals.

## 08 - Catalog page and live search

Catalog: shared shell; breadcrumb and page heading; desktop filter sidebar; product result count; search; sort; active filter chips; clear-all; grid; pagination; footer. Provide mobile filter drawer or source-equivalent compact controls. Include category, brand, price and product-type filters as defined in source. Show default, category filtered, multiple filters, sorted, empty results and mobile filters open.

Live header search must update as the user types. Search English/Bangla product name, category and brand, case-insensitively; each query word must match. Show total count plus up to eight linked results in a scrollable white panel with image, English/Bangla name, green price and a directional affordance. Preserve catalog order rather than inventing ranked AI results.

Create populated, no results, cleared, focused and dismissed states. Include example queries honey, naru, Garam Masala and one Bangla query based on the real product data. Result links open product detail. Focus inside the results keeps the panel open; leaving the search scope dismisses it. Escape dismisses the header search. Keyboard navigation must remain usable; add arrow-key list behavior only if explicitly marked a proposed enhancement rather than current behavior.

Header suggestions and catalog-page filters are separate state scopes in the current frontend. Model them clearly. Search submission retains navigation to the shop/catalog experience. If prototype text input cannot perform real filtering, use clearly labeled sample query states with links; do not claim functional runtime filtering inside Figma.

## 09 - Product detail, gallery and quick view

Product detail: breadcrumb Home / All Products / Category / Product; two-column desktop gallery and information; stacked mobile; product tag and savings; Bengali and English title; price and old price; description; pack label; product highlights where available; delivery/COD note; quantity stepper; line total; Add to Cart; Order Now; WhatsApp and phone contact. Product Info, How to Use and Delivery tabs exist within the embedded QuickView-style purchase component; preserve their content when present.

Important fidelity detail: the current full-detail purchase panel shows the pack supplied to it and a quantity stepper. The card has the demo pack selector. Do not silently add a new detail-page pack selector and call it existing behavior. If useful, place that enhancement separately in a Proposed section.

Gallery: main image, thumbnail selection and zoom/fullscreen behavior only where supported by the source. Use the actual ProductGallery data, including multiple views for combo items. Do not claim distinct photographs when views are crops or scales of the same asset.

Below purchase: Description, Ingredients & Nutrition, Shipping & Returns tabs; product written and video review blocks; write-review form; related products, four cards. For absent ingredients or specification data, keep honest contact/label guidance rather than inventing content.

Quick view: dialog variant of the product purchase layout with image gallery, selected card pack/price, quantity stepper, totals, actions, contact and detail tabs. Include close, backdrop, Escape and focus behavior. On mobile use a scrollable sheet or source-aligned stacked dialog with reachable close and purchase controls. Include one-pack and multi-pack entry contexts, and minimum/maximum quantity states.

## 10 - Cart drawer and delivery offer

Cart drawer: right-side desktop panel and usable mobile panel with title/count, close action, line-item thumbnail, selected product/pack name, unit price, quantity stepper, line total and remove control. Include empty cart and multiple-item cart. Decrement/remove behavior follows the source; if ambiguous, annotate the rule rather than assuming.

Add CartOfferProgress showing amount remaining toward free delivery. Merchandise subtotal below BDT 1,000 has BDT 60 delivery; subtotal at/above BDT 1,000 unlocks free delivery before promo discounts. Show locked and unlocked states. Subtotal, delivery, promo-at-checkout note and total-bearing Checkout action must update coherently.

Interactions: open from header/bottom navigation, adjust quantity, stop increment at 20, remove item, empty state, dismiss and continue shopping, navigate to checkout. Use logical focus and scroll behavior. Product availability and backend stock conflicts are future states, not implemented inventory services.

## 11 - Checkout: all sections and states

Checkout: shared header; title/breadcrumb; device-only preview notice; account prompt banner with Sign in and Create account plus guest path; main form and summary side panel. Desktop uses two columns. Mobile stacks content and includes a collapsible summary plus sticky order action without overlapping bottom navigation.

Delivery form includes Full name, Mobile number, optional Email, Address, District, Area/Thana, Home/Office address type and optional Order notes. Include field labels, hints, optional labels, tooltip states and validation messages. District selection updates area options and resets invalid area values. Use real location data when accessible.

Phone must match the latest design: one rounded white field; fixed +880 prefix; short thin vertical divider; editable national number; single subtle outer border; no rounded inner input or orange double outline. Focus uses a subtle green outer treatment; errors remain visibly identified.

Validation states: name too short; invalid Bangladesh phone; invalid optional email; short address; missing/invalid district and area. Show a full-error frame and a corrected/ready frame. Do not put fake live customer details in shared designs; use obvious sample data.

Payment radio cards: Cash on Delivery enabled and selected; Credit/Visa Card, bKash and Nagad disabled with Coming soon. Include recognizable logos and selection check. Do not prototype disabled payment methods as successful purchases.

Summary includes line thumbnails, pack name, unit price, quantity controls, remove button, per-line totals, promo code entry, suggested promo chips, applied code/removal state, discount, subtotal, delivery, final total, savings message, delivery offer progress, assurance/help cards and contact links. Promo examples: WELCOME10 for 10%; AMZAD50 for BDT 50 off at BDT 500 minimum; FREESHIP at BDT 1,000 minimum. Show invalid code, below-minimum, applied and removed states.

Primary action shows total and Order Now. Include relevant agreement/contact-confirmation copy. Submit invalid forms to errors; valid forms lead to a local preview confirmation. Include storage-save failure alert with cart retained. Any loading/submitting state added for future backend behavior must be annotated proposed.

## 12 - Checkout confirmation and invoice

Confirmation frame must clearly say the order is a device-only preview and needs team confirmation. Include order ID, confirmation message, ordered items, quantity, totals/discount/delivery, Cash on Delivery note, delivery information card, address, estimated arrival, Track this order, View my orders, Continue Shopping and What happens next accordion.

The next-steps accordion covers confirmation by phone, careful packing and delivery/payment on arrival as operational explanatory copy, not proof the backend has dispatched an order. Delivery estimate is two to three days excluding Fridays in the current frontend. Do not imply courier tracking is live.

Create a matching invoice/print design frame with logo, order number/date, delivery address, items table, quantity, unit price, line totals, subtotal, discount, delivery and grand total, plus support contacts. Mark sample orders as samples. Invoice is an order record, not proof of payment. Prototype Download Invoice to a preview frame if a real download action is unavailable in Figma.

## 13 - My Orders and order cards

My Orders page: breadcrumb, account eyebrow, heading and short supporting text, Continue shopping, order-ID search and clear, status tabs, result count/device-local context and explicit Preview sample orders control. Default current filter is Processing. Show loading, no orders, no processing orders, no matching ID and populated history.

Tabs: All Orders, Processing, Approved, Delivered, Completed, Cancelled and Returned. Reuse OrderCard with ID, status badge, placed date, Track Order, product rows, thumbnails, brand, quantity, line price, total and applicable actions. Preserve exact action labels and footer content from MyOrders.tsx when accessible.

Product rows allow Add to Cart. Delivered/Completed items offer Write a Review or Edit Review. Sample mode has a clearly visible demonstration banner and a way back to real local history. Do not populate a new customer's real history with demo purchases.

Prototype status filters, search, sample mode, Track Order navigation, reorder-to-cart, review open/save/edit and Continue shopping. Real cross-device history, account authorization and status changes are outside the current frontend's capabilities.

## 14 - Tracking lookup, order details and status variations

Track Order lookup: breadcrumb/title, order-ID input and Track Order button, helpful sample-ID hint, validation/not-found alert, sample-order entry card, missing-ID support card and WhatsApp contact. Include initial, query filled, not found and sample-preview states.

Order details: lookup collapses to a compact form. Main area includes status banner with parcel illustration; order ID with copy feedback; placed date; COD payment method; shipping address; delivery estimate or terminal-state note; Download Invoice; Tracking Update timeline; Order Items table/list; item count, subtotal, discount, delivery and grand total.

Sidebar contains delivery address, support card with WhatsApp and phone, brand delivery promise and review prompt for Delivered/Completed. Timeline items have date, time, icon, label and explanatory note. Add next-step hint when waiting. Use the current lifecycle: Order Placed, Approved, Delivered and Completed; Cancelled/Returned are separate terminal variants. Old Ready to Ship/Shipped source values map to Approved in customer status.

Create status variants for Processing, Approved, Delivered, Completed, Cancelled and Returned without duplicating unrelated components. Include a long multi-item order and mobile timeline. Copy ID shows a short copied state; review opens the review dialog; invoice opens print preview. Sample order data must remain visibly sample.

## 15 - Blogs listing and article pages

Blog listing: shared shell and breadcrumb; editorial header; featured article image/title/description with category and date/read time; Explore blog topics filter pills; article-card grid; no-topic-results state; footer. Featured article is shown for All, following source behavior. Article cards contain image, tag, title, summary where present, date/read time and read action.

Article detail: reading progress bar; breadcrumb; journal/category kicker; title and description; author/avatar/date/read time; share row and copy-link success/failure feedback; large cover and caption; At a glance summary; numbered content sections with headings, paragraphs, lists, steps and note callouts; source links where provided; back to blog; related articles.

Sidebar: collapsible In this story table of contents with active-section indicator and anchor links, reading metadata, related pantry product card when present, and browse-more supporting card. Preserve an optional context-aware BlogProductPopup with product image/name, short reason and product CTA, plus dismiss state. Show near 80% article progress and remember dismissal per article for the browser session. Keep it non-blocking.

Show English and Bengali article examples, topic-selected listing, collapsed TOC, scrolled article with active TOC, share feedback, related product popup and mobile stacked layout. Create all actual blog article instances using the content source when provided. Do not invent medical guidance or sources to fill an article.

## 16 - FAQ, reviews, feedback and supporting cards

FAQ: breadcrumb, Frequently asked questions editorial heading, short introduction, grouped question accordions and support sidebar. Groups follow source: orders/payments, delivery and product/support topics as available. Include collapsed/expanded items, keyboard focus and inline product/support links. Support card includes WhatsApp CTA and phone.

Product reviews: published written reviews and video-review cards where source provides them; explicit empty state otherwise. Include reviewer name, rating, comment and video thumbnail/player. Write-review form includes rating selection, optional comment up to 1,000 characters, error for missing rating, save confirmation and edit-saved state. Explain saved on this device.

Order-review dialog: product context, five selectable stars, optional comment, Save review, close, missing-rating error and saved/edit state. Sample order reviews are preview-only and not saved as real customer submissions. Include native-dialog-like dismissal and keyboard behavior.

Footer feedback: Bengali name/message fields as source provides, validation and action opening a prefilled WhatsApp message. Do not show automatic sent success before the user sends it. Newsletter and unsupported account services show honest coming-soon/unavailable messages. Impact and review metrics should use approved data or clearly marked demo values.

## 17 - Every global overlay and floating utility

Offer popup: open after around five seconds on the relevant home context. Deep-green product panel, cream spotlight circle, minimal brand label and product caption; warm content panel with Good food. Better deals.; short free-delivery card for BDT 1,000+; orange Shop offers; Maybe later and close. Desktop split / mobile stacked. Backdrop and Escape dismiss. Do not invent persistent once-per-visitor suppression; current behavior is timer-based.

Auth dialog: Sign In/Create Account tabs; full name for registration; mobile/email; password with visibility toggle; forgot-password feedback; remember-me checkbox; form errors; social Google/WhatsApp controls; switch-mode link; account preview disclaimer. Show unavailable authentication/reset/social outcomes honestly. No fake successful login frame.

Origin Stories dialog: seven region/product story rows with icons and short text; close/backdrop/Escape; scroll on mobile. Prayer dock: expanded and collapsed; current/next prayer sample time; open full schedule; collapse preference; hidden when full prayer section is visible. Position without covering primary content.

Chat widget: launcher, intro hint, dismissed hint, open panel, quick replies, user and scripted assistant bubbles, composer/send, empty input, local-order help, unrecognized-order response, WhatsApp handoff and close. Annotate as scripted local support, not live AI or a human agent. Preserve scroll and mobile reachability.

Also cover quick view, cart, order-review, blog-product popup, sort dropdown, tooltips, mobile filter/menu panels and toast overlays. Define stacking order and mutually exclusive behavior so an open overlay cannot strand the user behind another.

## 18 - Interaction and prototype contract

For every visible action, provide a prototype connection, an interactive component change or an explicit handoff annotation if Figma cannot execute it. No dead primary actions. Use Navigate for routes, Open/Close overlay for dialogs and drawers, Change to for variants and Scroll to for anchors. Use variables/conditionals for quantities and totals only if supported. Otherwise provide coherent linked sample states with honest labels.

Flow A: Home -> search honey -> results -> product detail -> quantity increment -> cart drawer -> checkout -> validation errors -> corrected form -> applied promo -> confirmation -> track order -> invoice preview.

Flow B: Home -> 2-pack card -> quick view -> add selected pack -> cart -> delivery progress unlocked -> checkout. Flow C: mobile bottom menu -> category -> catalog -> filter -> sort -> product -> checkout. Flow D: My Orders -> sample mode -> delivered card -> review dialog -> missing rating -> save preview -> order detail. Flow E: Blog listing -> topic -> article -> TOC anchor -> related product -> product detail. Flow F: FAQ -> accordion -> WhatsApp handoff annotation.

Connect header logo, breadcrumbs, View All, product image/title, card cart/Order Now, pagination, clear filters, tabs, remove item, promo remove, phone/WhatsApp, back-to-top and overlay dismissals. External destinations may be annotated and linked without sending messages. Payment placeholders stay disabled. Include field focus, button hover/pressed/focus, active tabs/pills and clear error recovery.

Motion: short 150-250ms control transitions and around 300-400ms dialog reveal where appropriate; subtle opacity/translation, no excessive bouncing. Document reduced-motion equivalents. Keyboard: logical order, visible focus, Escape dismissal, modal containment and focus return. Ensure 44px-class touch targets or equivalent adequate hit areas for small icons.

## 19 - Content, assets and route completeness

If repository access is available, inspect app/lib/products.ts and app/lib/blogs.ts and build every catalog product and article route as a template instance. Include products from store, legacyProducts, heroProducts and sampleGroups after deduplication by slug. Use the latest data; do not only design the first six visible cards. Preserve Bengali names, selected pack, current price, old price, brand, category and imagery.

Priority product examples include Delight Naru Combo, Akher Lal Chini, Slim Key Multi Seeds Combo, Khejurer Patali Gur, Mustard Oil 5 Ltr, Garam Masala Powder, Sundarbans Raw Honey, Pure Ghee, Pera Sondesh and Protein Bar. Core combo examples also include Deli Spice, Hazmi Juice, Keto Cure, Winter Gift Khejur Gur, Hazmi Seeds and Chia Seeds Combo.

Reuse public/logo.png, logo-light.png, products/, hero-slide-1.png through hero-slide-3.png, honey artwork, category icons, trust icons and payments/ assets where accessible. If Claude cannot access local files, request an asset/source bundle or site URL once and keep a clear missing-assets list. Do not claim exact recreation from unavailable images. Use labeled placeholders until supplied.

The route manifest is Home; Catalog; every Product Detail slug; Checkout; My Orders; Track Order; Blogs listing; every Blog Detail slug; FAQ. Checkout confirmation and order details are state screens rather than new routes. Offer Zone and policy placeholders are not additional implemented standalone pages. Do not invent an admin dashboard, payment portal, privacy page or returns application as part of current scope.

## 20 - Completion, QA and handoff

Use a coverage table with columns: requirement, desktop frame, mobile frame, component, prototype interaction and status. Every route template, home section, overlay and card family in this document must have a row. For all product/blog instances, attach a manifest with slug, title and frame link. Report any missing source data explicitly; do not mark complete without it.

Inspect screenshots/exports of every major frame at desktop and mobile widths. Check clipping, text overflow, Bengali shaping, hierarchy, image quality, button alignment, quantity spacing, phone divider, search overlay placement, mobile icon contrast, bottom-bar overlap, long orders and short-height dialogs. Check token usage and that repeated cards are instances, not unrelated copies.

Prototype walkthrough must exercise all six flows and the key no-results/error/empty/disabled states. Check all overlay close routes, links, buttons and focus annotations. Do not claim genuine live search, storage, authentication, payment, courier updates or external message delivery from a Figma-only prototype.

Final output: editable Figma file URL; navigation/cover frame; foundations and component library; desktop/mobile screens; tablet review frames; connected prototype start points; coverage table; route instance manifest; missing assets/content list; proposed enhancements separate from faithful recreation. Return a concise completion summary with counts and links verified from actual tool results.

## 21 - Reference source map for Claude

Shared shell/home/cards/search/catalog: app/components/Storefront.tsx. Catalog data and demo variants: app/lib/products.ts. Visual cascade: app/globals.css. Root support/chat: app/layout.tsx, MobileContactBar.tsx, ChatWidget.tsx and chat-widget.css. Product: ProductDetails.tsx, QuickView.tsx, ProductGallery.tsx, ProductReview.tsx and ProductReviewStories.tsx. Checkout: app/checkout/page.tsx; ignore page.tsx.orig. Cart/delivery: app/lib/cart.ts, offers.ts and CartOffer.tsx.

Orders: MyOrders.tsx, TrackOrder.tsx, OrderStatusTabs.tsx, OrderReview.tsx, app/lib/orders.ts, demo-orders.ts, order-status.ts and order-invoice.ts. Editorial: BlogPages.tsx, BlogCards.tsx, BlogSection.tsx, BlogProductPopup.tsx and app/lib/blogs.ts. Supporting components: BrandStrip.tsx, CategoryRail.tsx, MegaMenu.tsx, PrayerTimes.tsx, ImpactStats.tsx, Reviews.tsx, FooterFeedback.tsx, FAQPage.tsx, AuthModal.tsx and OfferPopup.tsx. Modal behavior: app/lib/useModalDialog.ts.

Current reference is a frontend demo. Preserve the latest local design updates: premium compact offer popup; six top-selling cards per page; quantity-dependent dummy imagery; visible mobile cart icon; live keyword suggestions; unified +880 phone field; more spacing between product details and controls. Do not revert to earlier screenshots when current source differs.

## 22 - Complete catalog instance manifest

Create one data-driven product-detail instance for each of the 67 catalog products below. Full bilingual fields, exact source image paths and demo variants are in Amzad_Food_Reference_Data.json. Prices are base reference BDT amounts, not approved inventory quotes.

- Wildflower Honey & Black Seed | Honey | BDT 350 | pack unspecified | /products/wildflower-honey-black-seed/
- Sundarbans Raw Honey | Honey | BDT 550 | pack unspecified | /products/sundarbans-raw-honey/
- Organic Black Seed Oil | Oil | BDT 650 | pack unspecified | /products/organic-black-seed-oil/
- Premium Date Syrup | Khejur | BDT 450 | pack unspecified | /products/premium-date-syrup/
- Pure Ghee | Oil | BDT 550 | pack unspecified | /products/pure-ghee/
- Puffed Rice | Rice & Snacks | BDT 230 | pack unspecified | /products/puffed-rice/
- Premium Black Seed Oil | Oil | BDT 650 | pack unspecified | /products/premium-black-seed-oil/
- Khejur Gur | Gur & Sugar | BDT 1000 | pack unspecified | /products/khejur-gur/
- Mango Pickle | Mango | BDT 230 | pack unspecified | /products/mango-pickle/
- Kabab Queen Curry Powder | Spices | BDT 220 | pack unspecified | /products/kabab-queen-curry-powder/
- Cumin Powder | Spices | BDT 240 | pack unspecified | /products/cumin-powder/
- Garam Masala Powder | Spices | BDT 260 | pack unspecified | /products/garam-masala-powder/
- Turmeric Powder | Spices | BDT 180 | pack unspecified | /products/turmeric-powder/
- Chili Powder | Spices | BDT 200 | pack unspecified | /products/chili-powder/
- Coriander Powder | Spices | BDT 190 | pack unspecified | /products/coriander-powder/
- Badami Barfi | Sweets & Snacks | BDT 450 | pack unspecified | /products/badami-barfi/
- Chinabuti Naru | Sweets & Snacks | BDT 300 | pack unspecified | /products/chinabuti-naru/
- Mixed Nuts | Nuts | BDT 650 | pack unspecified | /products/mixed-nuts/
- Isabgul Husk Fiber | Wellness | BDT 350 | pack unspecified | /products/isabgul-husk-fiber/
- SLFIT Support Capsules | Wellness | BDT 1200 | pack unspecified | /products/slfit-support-capsules/
- Litchu Flower Honey | Honey | BDT 480 | 500 gm | /products/litchu-flower-honey/
- Ajwa Dates | Khejur | BDT 1200 | 500 gm | /products/ajwa-dates/
- Medjool Dates | Khejur | BDT 1450 | 500 gm | /products/medjool-dates/
- Mabroom Dates | Khejur | BDT 1100 | 500 gm | /products/mabroom-dates/
- Cold Pressed Mustard Oil | Oil | BDT 320 | 1 L | /products/cold-pressed-mustard-oil/
- Coconut Oil | Oil | BDT 450 | 250 ml | /products/coconut-oil/
- Premium Cashew | Nuts | BDT 950 | 500 gm | /products/premium-cashew/
- California Almond | Nuts | BDT 880 | 500 gm | /products/california-almond/
- Roasted Peanut | Nuts | BDT 220 | 500 gm | /products/roasted-peanut/
- Chia Seeds | Seeds | BDT 390 | 250 gm | /products/chia-seeds/
- Black Seed (Kalojira) | Seeds | BDT 199 | 250 gm | /products/black-seed-kalojira/
- Flax Seeds | Seeds | BDT 260 | 250 gm | /products/flax-seeds/
- Pumpkin Seeds | Seeds | BDT 420 | 250 gm | /products/pumpkin-seeds/
- Himsagar Mango | Mango | BDT 1400 | 10 kg | /products/himsagar-mango/
- Langra Mango | Mango | BDT 1200 | 10 kg | /products/langra-mango/
- Aamshotto | Mango | BDT 350 | 250 gm | /products/aamshotto/
- Himalayan Pink Salt | Pink Salt | BDT 190 | 500 gm | /products/himalayan-pink-salt/
- Black Salt | Pink Salt | BDT 120 | 250 gm | /products/black-salt/
- Rock Salt Coarse | Pink Salt | BDT 160 | 500 gm | /products/rock-salt-coarse/
- Chinigura Rice | Rice & Snacks | BDT 180 | 1 kg | /products/chinigura-rice/
- Chira | Rice & Snacks | BDT 150 | 500 gm | /products/chira/
- Khoi | Rice & Snacks | BDT 180 | 250 gm | /products/khoi/
- Sylhet Black Tea | Tea | BDT 280 | 400 gm | /products/sylhet-black-tea/
- Green Tea | Tea | BDT 320 | 100 gm | /products/green-tea/
- Masala Chai | Tea | BDT 260 | 200 gm | /products/masala-chai/
- Laccha Shemai | Shemai | BDT 180 | 200 gm | /products/laccha-shemai/
- Roasted Shemai | Shemai | BDT 140 | 200 gm | /products/roasted-shemai/
- Delight Naru Combo | Combo Packs | BDT 1550 | Combo | /products/delight-naru-combo/
- Deli Spice Combo Pack | Combo Packs | BDT 950 | Combo | /products/deli-spice-combo-pack/
- Akher Lal Chini | Gur & Sugar | BDT 1100 | 1 kg | /products/akher-lal-chini/
- Akher Juice Powder | Wellness | BDT 690 | 500 gm | /products/akher-juice-powder/
- Hazmi Juice Combo | Combo Packs | BDT 690 | Combo | /products/hazmi-juice-combo/
- Keto Cure Combo | Combo Packs | BDT 990 | Combo | /products/keto-cure-combo/
- Slim Key Multi Seeds Combo | Combo Packs | BDT 990 | Combo | /products/slim-key-multi-seeds-combo/
- Akher Patali Gur | Gur & Sugar | BDT 800 | 1 kg | /products/akher-patali-gur/
- Akher Dana Gur | Gur & Sugar | BDT 850 | 1 kg | /products/akher-dana-gur/
- Winter Gift Khejur Gur Combo | Combo Packs | BDT 400 | Gift box | /products/winter-gift-khejur-gur-combo/
- Khejurer Patali Gur | Gur & Sugar | BDT 1100 | 1 kg | /products/khejurer-patali-gur/
- Khejurer Dana Gur | Gur & Sugar | BDT 900 | 1 kg | /products/khejurer-dana-gur/
- Khejurer Jhola Gur | Gur & Sugar | BDT 850 | 1 kg | /products/khejurer-jhola-gur/
- Hazmi Seeds Combo | Combo Packs | BDT 990 | Combo | /products/hazmi-seeds-combo/
- Chia Seeds Combo | Combo Packs | BDT 990 | Combo | /products/chia-seeds-combo/
- Mustard Oil 5 Ltr | Oil | BDT 1450 | 5 Ltr | /products/mustard-oil-5-ltr/
- Pera Sondesh | Sweets & Snacks | BDT 1350 | 500 gm | /products/pera-sondesh/
- Chatur Naru | Sweets & Snacks | BDT 1090 | 500 gm | /products/chatur-naru/
- Narkel Naru | Sweets & Snacks | BDT 1250 | 500 gm | /products/narkel-naru/
- Protein Bar | Sweets & Snacks | BDT 1000 | Box | /products/protein-bar/

## 23 - Complete article instance manifest and asset handoff

Create one article instance for each of the 7 article slugs below. Use the complete bilingual article text, section structure, tags, images and related-product data from the reference JSON and source. Do not replace Bengali article content with invented English content.

- /blogs/constipation-and-daily-food-habits/ | bn | 6 article sections | 4 min read
- /blogs/everyday-pantry/ | en | 4 article sections | 2 min read
- /blogs/spice-pairings/ | en | 4 article sections | 2 min read
- /blogs/tea-time/ | en | 4 article sections | 2 min read
- /blogs/seasonal-mango/ | en | 3 article sections | 2 min read
- /blogs/thoughtful-food-gifts/ | en | 3 article sections | 2 min read
- /blogs/shopping-list/ | en | 3 article sections | 2 min read

The companion reference bundle includes this prompt, the PDF, the reference JSON, public assets, current app source, package.json and next.config.mjs. Local source is reference material for design only. Inspect the files necessary for exact screen copy, reviews, menu labels, footer forms and interactions. Do not upload credentials, environment files, dependency folders or Git metadata.

Start by reporting the catalog and article counts from the JSON, verifying asset access, and creating the coverage ledger. Complete every template, component family and interaction state before reporting the design finished.
