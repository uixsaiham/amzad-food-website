export type Product = { name: string; bn?: string; category: string; price: number; oldPrice?: number; unit?: string; image: string; tag?: string };

const shot = (slug: string) => `/amzad-food-website/products/${slug}.png`;
const p = (name: string, bn: string, category: string, price: number, oldPrice: number | undefined, unit: string, slug: string, tag?: string): Product =>
  ({ name, bn, category, price, oldPrice, unit, image: shot(slug), tag });

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

export const productSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Earlier placeholder items still linked from the hero (honey, ghee) and the category rail.
const legacyImage = "/amzad-food-website/product-honey.png";
const legacyProducts: Product[] = [
  ["Wildflower Honey & Black Seed", 350], ["Sundarbans Raw Honey", 550], ["Organic Black Seed Oil", 650], ["Premium Date Syrup", 450],
  ["Pure Ghee", 550], ["Puffed Rice", 230], ["Premium Black Seed Oil", 650], ["Khejur Gur", 1000], ["Mango Pickle", 230],
].map(([name, price]) => ({ name: name as string, category: "Pantry", price: price as number, image: legacyImage }));

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
  { name: "Mixed Nuts", category: "Wellness", price: 650, image: heroImage(3) },
  { name: "Isabgul Husk Fiber", category: "Wellness", price: 350, image: heroImage(3) },
  { name: "SLFIT Support Capsules", category: "Wellness", price: 1200, image: heroImage(3) },
];

export const catalog = Array.from(new Map([...legacyProducts, ...heroProducts, ...Object.values(store)].map(product => [productSlug(product.name), product])).values());
