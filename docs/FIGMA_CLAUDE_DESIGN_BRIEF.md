# Amzad Food — Branding, Style Guide & Component Library

Prepared: 26 October 2026  
Deliverable: An editable Figma brand and design-system library.  
Scope: Branding guidelines, visual foundations and reusable UI components only. Full website pages and customer-flow prototypes are excluded.

## 1. Prompt to give Claude

```text
Act as a senior brand designer and Figma design-system specialist.

Create a branding guide, visual style guide and reusable UI component library
for Amzad Food, a Bangladeshi food brand. Follow the attached brief and use the
existing logo, product packaging and supplied assets as the brand baseline.

Design only the brand system, style guidelines and components. Do not create
full website pages, landing pages, checkout screens or customer-flow prototypes.
Small component examples are welcome when they explain usage.

The visual direction should feel authentic, warm, natural, trustworthy and
contemporary. Preserve the brand's Bengali and English character. Refine its
existing cream, deep green and orange identity into one consistent system.

Organize the Figma file into Brand Guidelines, Foundations, Components and
Usage & Handoff. Use native editable layers, Auto Layout, reusable components,
component properties, variants, semantic variables and shared styles.

Begin with the brand foundations, then build the components from those tokens.
Separate existing brand values from your proposed additions. Keep original
logo artwork and proportions intact; a new logo or rebrand is outside scope.

Include component states, bilingual typography examples, accessibility guidance,
responsive component behavior, correct/incorrect usage and developer naming.
Do not invent certifications, product variants, stock, reviews or health claims.
Use realistic supplied product data in component examples.

If you have tools that can write to Figma, build the editable library in the
provided Figma Design file. If access is unavailable, state that clearly and
provide a construction specification. Do not claim a Figma file was created
unless it actually was.
```

## 2. Brand direction

**Brand name:** Amzad Food  
**Existing tagline:** নিরাপদ খাবার, আপনার অধিকার  
**Category:** Bangladeshi foods, pantry essentials, sweets and gift combos.

The identity should express familiar food culture through carefully presented products, warm colors and clear bilingual communication. Aim for a contemporary food shop with an editorial touch: welcoming, practical and confident.

### Personality and voice

| Attribute | Visual expression | Writing approach |
| --- | --- | --- |
| Authentic | Original packaging and recognizable ingredients | Specific product names and clear information |
| Warm | Cream surfaces and restrained orange accents | Friendly, straightforward language |
| Trustworthy | Readable labels, consistent hierarchy and honest states | Accurate prices, units and service availability |
| Natural | Deep greens and subtle organic details | Describe supplied ingredients without unsupported claims |
| Contemporary | Clear spacing, simple controls and consistent components | Short action labels and useful feedback |

Use Bengali and English naturally. Preserve correct Bengali spelling and shaping. Use taka consistently, for example `৳1,450`. Avoid exaggerated promises, invented popularity figures and unapproved certification seals.

## 3. Figma file structure

1. **00 — Overview:** scope, brand summary, library index and assumptions.
2. **01 — Brand Guidelines:** logo, color identity, typography direction, imagery, icons and voice.
3. **02 — Foundations:** semantic tokens, typography styles, spacing, shape, effects, layout rules and accessibility.
4. **03 — Components:** reusable primitives and commerce components with properties and states.
5. **04 — Usage & Handoff:** small usage examples, do/don't rules, asset references and token/component mapping.

Use descriptive component names such as `Actions/Button`, `Forms/TextField` and `Commerce/ProductCard`. Keep guidelines concise and visual. Screenshots may appear as reference material, but do not recreate full website screens.

## 4. Logo guidelines

Use `public/logo.png` as the primary original logo and `public/logo-light.png` for appropriate dark backgrounds. Inspect the actual artwork before defining placement.

Create a guideline sheet showing:

- Primary logo on cream and white backgrounds.
- Supplied light logo on a dark green background, after checking legibility.
- Original aspect ratio and alignment examples.
- Proposed clear space: use one consistent unit derived from a recognizable part of the logo; show the measurement visually.
- Minimum display size determined by testing the legibility of the Bengali tagline at actual size. Record the tested minimum rather than inventing a fixed value.
- Correct and incorrect usage: stretching, recoloring, rotation, busy backgrounds, insufficient contrast and inadequate clear space.

Do not redraw the logo, invent a standalone symbol or crop away its tagline as an approved lockup. If smaller formats need a simplified mark, list that as a separate brand decision. Existing product packaging is a reference, not permission to redesign it.

Include the Amzad, Maza and Slifit marks from `public/brands/` in a small partner/sub-brand usage section. Preserve their individual artwork and use balanced optical sizing.

## 5. Color system

### Existing brand anchors

These values come from the current website CSS:

| Name | Hex | Existing role |
| --- | --- | --- |
| Deep ink | `#17352A` | Primary text and dark surfaces |
| Brand green | `#246247` | Main brand green |
| Cream | `#F6F5EF` | Page background |
| Lime | `#E5EDC9` | Soft accent |
| Warm orange | `#E56E35` | Accent |
| Muted green-gray | `#718078` | Supporting text |
| Light border | `#DFE4DC` | Separators |

### Proposed semantic variables

Create primitive palette variables and alias semantic variables to them. The values below are starting proposals. Validate their actual combinations before documenting them as approved.

| Variable | Starting value | Usage |
| --- | --- | --- |
| `color/bg/canvas` | `#F6F5EF` | Main background |
| `color/bg/surface` | `#FFFFFF` | Cards and controls |
| `color/bg/subtle` | `#EEF3E9` | Quiet supporting surfaces |
| `color/bg/inverse` | `#17352A` | Dark brand panels |
| `color/text/primary` | `#17352A` | Main text |
| `color/text/secondary` | `#52645A` | Supporting text |
| `color/text/inverse` | `#FFFFFF` | Text on dark surfaces |
| `color/border/subtle` | `#DFE4DC` | Decorative borders |
| `color/border/control` | `#7B8C80` | Essential control boundaries |
| `color/action/primary` | `#246247` | Primary action |
| `color/action/primary-hover` | `#1B4D37` | Hover state |
| `color/accent/warm` | `#E56E35` | Decorative orange |
| `color/action/warm` | `#B74716` | Candidate orange action with white text |
| `color/status/success` | `#246247` | Success feedback |
| `color/status/warning` | `#8A5600` | Warning feedback |
| `color/status/error` | `#B42318` | Error feedback |
| `color/focus/default` | `#246247` | Focus ring on light backgrounds |

Add pressed, disabled, selected and status-background variables as needed. Document which colors are for decoration versus text/actions. Avoid assuming the existing orange or muted color works for every small-text pairing.

Provide a complete light theme. Dark green brand sections are inverse surfaces within that theme; a complete dark-mode theme is outside scope.

## 6. Typography

Use the existing families as the starting point:

- **Plus Jakarta Sans:** English body text, labels, controls and prices.
- **Gelasio:** selected English brand/editorial headings.
- **Anek Bangla:** Bengali headings, body text and UI.

Keep the library focused on these families unless a documented rendering problem requires a change. Do not use artificial letter spacing on Bengali.

| Text style | Desktop size / line height | Compact size / line height | Typical weight |
| --- | --- | --- | --- |
| Display | 56 / 64 | 36 / 44 | 500 |
| Heading / Large | 40 / 48 | 30 / 38 | 500–600 |
| Heading / Medium | 32 / 40 | 26 / 34 | 500–600 |
| Heading / Small | 24 / 32 | 20 / 28 | 600 |
| Body / Default | 16 / 26 | 16 / 26 | 400 |
| Body / Small | 14 / 22 | 14 / 22 | 400 |
| Label / Default | 14 / 20 | 14 / 20 | 600 |
| Caption | 12 / 18 | 12 / 18 | 400–500 |
| Price | 22 / 28 | 18 / 24 | 700 |

These sizes are proposed foundations. Adjust Bengali line height after rendering real text. Show paired English/Bengali specimens, multiline labels, prices, input text and long product names. Keep form entry text at 16 px.

Example specimens:

- Amzad Food — Carefully chosen food for your everyday table.
- নিরাপদ খাবার, আপনার অধিকার
- Mustard Oil 5 Ltr / সরিষার তেল
- Winter Gift Khejur Gur Combo / খেজুর গুড় কম্বো
- ৳1,450 · 5 Ltr

## 7. Spacing, shape, effects and layout rules

### Variables

- Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 and 96 px.
- Radius: 4, 8, 12, 16 and 24 px, plus pill.
- Border: 1 px default; 2 px selected/focus treatment where appropriate.
- Icon sizes: 16, 20 and 24 px.
- Control heights: 36 px compact, 44 px default, 48 px large. Small visible controls still need adequate interaction areas.

### Proposed effects

| Style | Value | Usage |
| --- | --- | --- |
| Shadow / Card | `0 4 16 rgba(23,53,42,0.06)` | Raised cards where needed |
| Shadow / Overlay | `0 16 48 rgba(23,53,42,0.18)` | Drawers, dialogs and menus |
| Backdrop | Deep ink at approximately 40% opacity | Modal background |

Use shadows sparingly. Document which component families use which radius and elevation.

### Layout guidelines

Provide grid and spacing reference frames, not finished pages:

| Reference width | Columns | Margin | Gutter |
| --- | --- | --- | --- |
| 1440 px | 12 | 120 px | 24 px |
| 768 px | 8 | 24 px | 20 px |
| 390 px | 4 | 16 px | 12 px |

These are proposed layout foundations, not an exact extraction of current CSS. Show component resizing with Auto Layout, Fill Container, Hug Contents, wrapping and explicit min/max widths. Test critical components at 320 px viewport width.

## 8. Imagery, iconography and decorative language

**Product photography:** Use supplied packaging images with contain behavior, consistent padding and an uncluttered background. Preserve proportions and readable packaging. Detail crops of one photo must not be represented as alternate-angle photographs.

**Editorial imagery:** Use warm, natural food settings, restrained styling and useful crops. Distinguish illustrative imagery from evidence about the real business.

**Icons:** Use one consistent Lucide-style outline family, normally 20/24 px with a consistent stroke. Supplied payment and social brand marks retain their own artwork.

**Decoration:** Subtle botanical shapes, gentle curves and small ingredient motifs may reinforce the brand. Define a limited set of reusable accents. Avoid cluttering product cards or controls. Do not create certification-style badges without approved evidence.

Create small image-treatment, crop and icon-alignment examples. New photography, packaging, social campaigns and stationery are outside scope.

## 9. Component inventory

Build the essential reusable components below. Include realistic content and documented properties. Do not build complete screen layouts around them.

| Family | Components | Properties and states |
| --- | --- | --- |
| Actions | Button, icon button, text link | Primary/secondary/ghost/destructive; small/default/large; default/hover/pressed/focus/disabled/loading; optional icons |
| Forms | Text field, phone/email/password field, textarea, search, select | Label, optional marker, hint, error; empty/filled/focus/error/disabled; password reveal |
| Selection | Checkbox, radio, switch, segmented control | Selected/unselected, focus, disabled |
| Navigation primitives | Tab, chip, breadcrumb, pagination item, menu item | Active/inactive, hover, focus, disabled; optional count/icon |
| Feedback | Badge, inline alert, toast, skeleton, empty-state block | Neutral/success/warning/error; icon and dismiss options |
| Commerce | Product card, price group, quantity stepper, wishlist button | Desktop/compact; long bilingual name; optional genuine old price; selected wishlist; min/max quantity |
| Product media | Gallery stage, thumbnail, gallery controls | Selected/unselected, zoom indication, missing image |
| Cart | Cart item row, delivery-progress block, promo field, totals row | Empty/filled promo, valid/invalid/ineligible; quantity limits and remove |
| Orders | Status badge, order item row, timeline step | Processing/Approved/Delivered/Completed/Cancelled/Returned; current/completed/pending step |
| Content | Blog card, topic chip, accordion item, review/rating control | Collapsed/expanded; selected/unselected; read-only/editable rating |
| Overlays | Modal shell, drawer shell, popover/menu shell | Header, close, optional footer; scroll region; desktop/compact |

Optional shared components after the essentials: logo lockup container, brand-mark row, contact link, payment-method tile, category tile and small support launcher. Header/footer assemblies and complete account/checkout designs are outside scope.

### Component construction rules

- Use editable native text, shapes and image fills.
- Build with Auto Layout and meaningful resizing rules.
- Use instances in examples; preserve links to main components.
- Use text, boolean and instance-swap properties for content and optional slots.
- Separate structural variants from content overrides; avoid unnecessary combinations.
- Bind supported properties to semantic variables and use shared text/effect styles.
- Name states and properties consistently, for example `State=Focus`, `Size=Default`, `Tone=Primary`.
- Include a property reference and a short usage note for each family.
- Label loading/network-related designs as proposed integration states where the current product has no service.

### Example content constraints

Use actual catalog data for samples:

- Mustard Oil 5 Ltr: ৳1,450; previous price ৳1,550; pack 5 Ltr.
- Delight Naru Combo: ৳1,550; previous price ৳1,650; pack Combo.
- Sundarbans Raw Honey: catalog example price ৳550; final pricing requires owner approval.

Do not invent pack-size variants, stock availability, ratings or review counts. Quantity examples can use the current preview range of 1–20. Online payment methods remain unavailable in current implementation; show a disabled tile example if included.

## 10. Accessibility and component behavior

Use the following design targets and annotate how each relevant component supports them:

- Normal text contrast of at least 4.5:1; large text at least 3:1.
- Essential non-text control boundaries and indicators at least 3:1 where applicable.
- Clearly visible keyboard focus, with a contrasting treatment on inverse surfaces.
- Touch areas of at least 44 × 44 px as the library target.
- Labels and error text that remain understandable without color alone.
- Long text, Bengali content, large prices and narrow-width wrapping.
- Selected states conveyed with text, shape or icons as well as color.
- Disabled controls remain legible and clearly distinguishable.
- Dialog/drawer annotations for focus containment, Escape dismissal, focus return and scroll locking.
- Motion guidance: restrained 150–250 ms transitions and reduced-motion alternatives.

A Figma library illustrates intended accessibility; implementation must still be tested separately.

## 11. Guideline examples and handoff

For each major component family, include a compact example showing correct usage and one common mistake. Examples may combine a few components to explain spacing, but must not become full pages.

Include:

1. Brand do/don't sheet covering logo, color, typography, imagery and tone.
2. Token table with names, values, roles and approved foreground/background pairs.
3. Component index with variant/property descriptions.
4. Compact and regular-width component examples.
5. Asset filename references for logos and imagery.
6. A list of proposed changes from the existing website.
7. Open decisions requiring owner approval.

Suggested implementation mapping:

| Figma item | Existing code reference |
| --- | --- |
| Color and text foundations | `app/globals.css` |
| ProductCard | `app/components/Storefront.tsx` |
| ProductGallery | `app/components/ProductGallery.tsx` |
| DeliveryProgress | `app/components/CartOffer.tsx` |
| OrderStatus | `app/lib/order-status.ts` |
| Product example data | `app/lib/products.ts` |
| Main and light logos | `public/logo.png`, `public/logo-light.png` |
| Brand marks | `public/brands/` |
| Product images | `public/products/` |
| Category/trust artwork | `public/icons/` |

Do not change repository code as part of this design task.

## 12. Staged prompts

**Stage 1 — Branding and foundations**

“Create the Amzad Food brand guideline sheet and foundations from this brief. Preserve the supplied logo. Define color roles, semantic variables, bilingual typography, spacing, shape, effects, imagery and icons. Separate observed brand values from proposed additions. Do not design website pages.”

**Stage 2 — Core components**

“Build buttons, form controls, selection controls, navigation primitives and feedback components from the foundations. Include states, properties, Auto Layout, variable bindings and concise usage notes.”

**Stage 3 — Commerce components**

“Build the product, gallery, cart, order, content and overlay components listed in the inventory. Use actual catalog data and bilingual stress tests. Create regular/compact examples, not full storefront screens.”

**Stage 4 — QA and handoff**

“Check the library for naming, reusable instances, consistent tokens, contrast, Bengali rendering, resizing and missing states. Add visual do/don't examples, a component index and implementation mapping. Report what was created and any unresolved brand decisions.”

## 13. Acceptance checklist

- [ ] The deliverable contains branding guidelines, foundations and components only.
- [ ] Existing logo artwork and proportions are preserved.
- [ ] Clear space, tested minimum sizes and correct/incorrect logo usage are documented.
- [ ] Color roles, semantic variables and contrast examples are complete.
- [ ] English/Bengali text styles and specimens render without clipping.
- [ ] Spacing, radii, elevation, icons, imagery and layout rules are documented.
- [ ] Components use native editable layers, Auto Layout and reusable instances.
- [ ] Component properties and relevant interaction states are included.
- [ ] Supported properties use variables and shared styles consistently.
- [ ] Regular/compact sizing and narrow-width behavior are demonstrated.
- [ ] Product examples retain accurate supplied names, packs and prices.
- [ ] No unsupported product or business claims are introduced.
- [ ] Usage notes, do/don't examples, asset references and handoff mapping are included.
- [ ] No complete website screens or customer-flow prototypes have been added.

**Final output:** One organized, editable Figma branding and component-library file. No website page design is required.
