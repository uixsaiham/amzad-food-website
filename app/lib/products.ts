export const productBrands = ["Amzad", "Maza", "Slifit"] as const;
export type ProductBrand = typeof productBrands[number];
export const getProductBrand = (product: { brand?: ProductBrand }): ProductBrand => product.brand ?? "Amzad";

export type ProductImage = { src: string; label: string; scale?: number; x?: number; y?: number };
export type Product = { brand?: ProductBrand; name: string; bn?: string; category: string; price: number; oldPrice?: number; unit?: string; image: string; images?: ProductImage[]; tag?: string };

export const getProductImages = (product: Product): ProductImage[] => [
  { src: product.image, label: "Full product" },
  ...(product.images ?? [
    { src: product.image, label: "Centre close-up", scale: 1.6, x: 50, y: 50 },
    { src: product.image, label: "Upper detail", scale: 1.7, x: 50, y: 25 },
    { src: product.image, label: "Lower detail", scale: 1.7, x: 50, y: 75 },
  ]).filter(image => image.src && !(image.src === product.image && !image.scale)),
];

const shot = (slug: string) => `/amzad-food-website/products/${slug}.png`;
// Close-ups use the actual product photo; these are not alternate-angle photos.
// Each combo has its own focus points. Real extra photos can replace these entries.
const comboViews: Record<string, [string, number, number, number][]> = {
  "delight-naru-combo": [["Jar close-up", 1.8, 68, 54], ["Box detail", 1.7, 18, 45], ["Naru detail", 2, 70, 75]],
  "deli-spice-combo-pack": [["Spice jars close-up", 1.5, 74, 46], ["Spice bowls detail", 1.8, 59, 87], ["Box detail", 1.8, 18, 45]],
  "hazmi-juice-combo": [["Hazmi jar close-up", 1.8, 62, 54], ["Side jars detail", 1.7, 88, 53], ["Box detail", 1.8, 15, 45]],
  "keto-cure-combo": [["Bottle close-up", 1.8, 45, 54], ["Honey jar detail", 1.8, 76, 55], ["Box detail", 1.8, 23, 47]],
  "slim-key-multi-seeds-combo": [["Seed jars close-up", 1.6, 76, 43], ["Seed mix detail", 1.9, 63, 78], ["Box detail", 1.8, 18, 43]],
  "winter-gift-khejur-gur-combo": [["Gur jars close-up", 1.6, 31, 43], ["Patali gur detail", 1.8, 56, 80], ["Gift packaging detail", 1.7, 82, 48]],
  "hazmi-seeds-combo": [["Seed jar close-up", 1.9, 61, 55], ["Honey jar detail", 1.8, 85, 54], ["Seed mix detail", 1.9, 60, 83]],
  "chia-seeds-combo": [["Chia jar close-up", 1.8, 26, 47], ["Honey jar detail", 1.8, 55, 46], ["Chia seeds detail", 1.9, 49, 83]],
};
const p = (name: string, bn: string, category: string, price: number, oldPrice: number | undefined, unit: string, slug: string, tag?: string): Product =>
  ({ name, bn, category, price, oldPrice, unit, image: shot(slug), images: comboViews[slug]?.map(([label, scale, x, y]) => ({ src: shot(slug), label, scale, x, y })), tag, brand: "Amzad" });

// Store products shown on the product cards.
const store = {
  delightNaru: p("Delight Naru Combo", "ডিলাইট নাড়ু কম্বো", "Combo Packs", 1550, 1650, "Combo", "delight-naru-combo", "Best Seller"),
  deliSpice: p("Deli Spice Combo Pack", "ডেলি স্পাইস কম্বো প্যাক", "Combo Packs", 950, undefined, "Combo", "deli-spice-combo-pack", "New"),
  akherLalChini: p("Akher Lal Chini", "আখের লাল চিনি", "Gur & Sugar", 1100, 1360, "1 kg", "akher-lal-chini", "Best Seller"),
  akherJuice: p("Akher Juice Powder", "আখের জুস পাউডার", "Wellness", 690, undefined, "500 gm", "akher-juice-powder"),
  hazmiJuice: p("Hazmi Juice Combo", "হজমি জুস কম্বো", "Combo Packs", 690, undefined, "Combo", "hazmi-juice-combo"),
  ketoCure: p("Keto Cure Combo", "কিটো কিউর কম্বো", "Combo Packs", 990, 1200, "Combo", "keto-cure-combo"),
  slimKey: p("Slim Key Multi Seeds Combo", "স্লিম কী মাল্টি সিডস কম্বো", "Combo Packs", 990, 1190, "Combo", "slim-key-multi-seeds-combo", "Best Seller"),
  akherPatali: p("Akher Patali Gur", "আখের পাটালি গুড়", "Gur & Sugar", 800, 900, "1 kg", "akher-patali-gur"),
  akherDana: p("Akher Dana Gur", "আখের দানা গুড়", "Gur & Sugar", 850, 950, "1 kg", "akher-dana-gur"),
  winterGift: p("Winter Gift Khejur Gur Combo", "খেজুর গুড় কম্বো", "Combo Packs", 400, 500, "Gift box", "winter-gift-khejur-gur-combo", "New"),
  khejurerPatali: p("Khejurer Patali Gur", "খেজুরের পাটালি গুড়", "Gur & Sugar", 1100, 1200, "1 kg", "khejurer-patali-gur", "Best Seller"),
  khejurerDana: p("Khejurer Dana Gur", "খেজুরের দানা গুড়", "Gur & Sugar", 900, 1350, "1 kg", "khejurer-dana-gur"),
  khejurerJhola: p("Khejurer Jhola Gur", "খেজুরের ঝোলা গুড়", "Gur & Sugar", 850, 1200, "1 kg", "khejurer-jhola-gur"),
  hazmiSeeds: p("Hazmi Seeds Combo", "হজমি সিডস কম্বো", "Combo Packs", 990, 1200, "Combo", "hazmi-seeds-combo"),
  chiaSeeds: p("Chia Seeds Combo", "চিয়া সিডস কম্বো", "Combo Packs", 990, 1050, "Combo", "chia-seeds-combo"),
  mustardOil: p("Mustard Oil 5 Ltr", "সরিষার তেল", "Oil", 1450, 1550, "5 Ltr", "mustard-oil-5-ltr", "Best Seller"),
  peraSondesh: p("Pera Sondesh", "প্যারা সন্দেশ", "Sweets & Snacks", 1350, 1400, "500 gm", "pera-sondesh"),
  chaturNaru: p("Chatur Naru", "ছাতুর নাড়ু", "Sweets & Snacks", 1090, 1200, "500 gm", "chatur-naru"),
  narkelNaru: p("Narkel Naru", "নারকেল নাড়ু", "Sweets & Snacks", 1250, 1350, "500 gm", "narkel-naru", "New"),
  proteinBar: p("Protein Bar", "প্রোটিন বার", "Sweets & Snacks", 1000, 1150, "Box", "protein-bar"),
};

// Best sellers grid (first 8) + single items.
export const products: Product[] = [store.akherLalChini, store.khejurerPatali, store.peraSondesh, store.mustardOil, store.akherJuice, store.chaturNaru, store.khejurerJhola, store.proteinBar, store.akherPatali, store.narkelNaru, store.khejurerDana, store.akherDana];
export const comboProducts: Product[] = [store.delightNaru, store.deliSpice, store.hazmiJuice, store.ketoCure, store.slimKey, store.winterGift, store.hazmiSeeds, store.chiaSeeds];
// "All Products" grid; the first 3 also top up the best sellers grid.
export const exploreProducts: Product[] = [store.delightNaru, store.slimKey, store.winterGift, store.akherPatali, store.narkelNaru, store.khejurerDana, store.akherDana, store.hazmiJuice, store.deliSpice, store.ketoCure, store.hazmiSeeds, store.chiaSeeds];

// Every store product (with photo), and their categories in first-seen order, for the shop tabs.


export const productSlug =(name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Earlier placeholder items still linked from the hero (honey, ghee) and the category rail.
const legacyImage = "/amzad-food-website/product-honey.png";
const legacyProducts: Product[] = [
  ["Wildflower Honey & Black Seed", 350], ["Sundarbans Raw Honey", 550], ["Organic Black Seed Oil", 650], ["Premium Date Syrup", 450],
  ["Pure Ghee", 550], ["Puffed Rice", 230], ["Premium Black Seed Oil", 650], ["Khejur Gur", 1000], ["Mango Pickle", 230],
].map(([name, price]) => ({ name: name as string, category: String(name).includes("Honey") ? "Honey" : String(name).includes("Oil") || name === "Pure Ghee" ? "Oil" : name === "Puffed Rice" ? "Rice & Snacks" : name === "Mango Pickle" ? "Mango" : name === "Khejur Gur" ? "Gur & Sugar" : "Khejur", price: price as number, image: legacyImage }));

// Products shown in the hero slider images. Prices are placeholders until real data arrives;
// each uses its hero slide as the photo for now.
const heroImage = (slide: number) => `/amzad-food-website/hero-slide-${slide}.png`;
export const heroProducts: Product[] = [
  { name: "Kabab Queen Curry Powder", category: "Spices", price: 220, image: heroImage(1) },
  { name: "Cumin Powder", category: "Spices", price: 240, image: heroImage(1) },
  { name: "Garam Masala Powder", category: "Spices", price: 260, image: heroImage(1) },
  { name: "Turmeric Powder", category: "Spices", price: 180, image: heroImage(1) },
  { name: "Chili Powder", category: "Spices", price: 200, image: heroImage(1) },
  { name: "Coriander Powder", category: "Spices", price: 190, image: heroImage(1) },
  { name: "Badami Barfi", category: "Sweets & Snacks", price: 450, image: heroImage(2) },
  { name: "Chinabuti Naru", category: "Sweets & Snacks", price: 300, image: heroImage(2) },
  { name: "Mixed Nuts", category: "Nuts", price: 650, image: heroImage(3) },
  { name: "Isabgul Husk Fiber", category: "Wellness", price: 350, image: heroImage(3) },
  { name: "SLFIT Support Capsules", category: "Wellness", price: 1200, image: heroImage(3) },
];

// Sample inventory fills the category previews until final product data is supplied.
const sampleGroups: { category: string; image: string; items: [string, number, string][] }[] = [
  { category: "Honey", image: "product-honey.png", items: [["Litchu Flower Honey", 480, "500 gm"]] },
  { category: "Khejur", image: "icons/category-dates.png", items: [["Ajwa Dates", 1200, "500 gm"], ["Medjool Dates", 1450, "500 gm"], ["Mabroom Dates", 1100, "500 gm"]] },
  { category: "Oil", image: "hero-slide-3.png", items: [["Cold Pressed Mustard Oil", 320, "1 L"], ["Coconut Oil", 450, "250 ml"]] },
  { category: "Nuts", image: "icons/category-peanuts.png", items: [["Premium Cashew", 950, "500 gm"], ["California Almond", 880, "500 gm"], ["Roasted Peanut", 220, "500 gm"]] },
  { category: "Seeds", image: "icons/category-seeds.png", items: [["Chia Seeds", 390, "250 gm"], ["Black Seed (Kalojira)", 199, "250 gm"], ["Flax Seeds", 260, "250 gm"], ["Pumpkin Seeds", 420, "250 gm"]] },
  { category: "Mango", image: "icons/category-mango.png", items: [["Himsagar Mango", 1400, "10 kg"], ["Langra Mango", 1200, "10 kg"], ["Aamshotto", 350, "250 gm"]] },
  { category: "Pink Salt", image: "icons/category-salt.png", items: [["Himalayan Pink Salt", 190, "500 gm"], ["Black Salt", 120, "250 gm"], ["Rock Salt Coarse", 160, "500 gm"]] },
  { category: "Rice & Snacks", image: "products/chatur-naru.png", items: [["Chinigura Rice", 180, "1 kg"], ["Chira", 150, "500 gm"], ["Khoi", 180, "250 gm"]] },
  { category: "Tea", image: "icons/category-basket.png", items: [["Sylhet Black Tea", 280, "400 gm"], ["Green Tea", 320, "100 gm"], ["Masala Chai", 260, "200 gm"]] },
  { category: "Shemai", image: "icons/category-basket.png", items: [["Laccha Shemai", 180, "200 gm"], ["Roasted Shemai", 140, "200 gm"]] },
];
const sampleProducts: Product[] = sampleGroups.flatMap(group => group.items.map(([name, price, unit]) => ({ name, price, unit, category: group.category, image: `/amzad-food-website/${group.image}`, tag: "Sample" })));

export const catalog = Array.from(new Map([...legacyProducts, ...heroProducts, ...sampleProducts, ...Object.values(store)].map(product => [productSlug(product.name), product])).values());
export const storeProducts: Product[] = catalog;
export const productCategories: string[] = Array.from(new Set(storeProducts.map(product => product.category)));

export const resolveProductCategory = (label: string): string => {
  const aliases: Record<string, string> = { "Ghee & Oil": "Oil", "Mosla": "Spices", "Combo & Gifts": "Combo Packs", "Combo": "Combo Packs", "Gur": "Gur & Sugar", "Veshoj Item": "Wellness", "Dessert": "Sweets & Snacks" };
  const category = label.split(" · ")[0];
  return aliases[category] ?? category;
};
export const productsForCategory = (category: string): Product[] => {
  const resolved = resolveProductCategory(category);
  if (resolved === "All") return catalog;
  if (resolved === "Offer Zone") return catalog.filter(product => product.oldPrice !== undefined && product.oldPrice > product.price);
  return catalog.filter(product => product.category === resolved);
};
