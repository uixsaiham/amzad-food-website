export type BlogSection = { id: string; title: string; paragraphs: string[]; bullets?: string[]; steps?: string[]; note?: string };
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  tag: string;
  date: string;
  readMin: number;
  sections: BlogSection[];
  language?: "bn" | "en";
  takeaways?: string[];
  sources?: { title: string; url: string }[];
  featuredProduct?: { name: string; image: string; href: string };
};

const article = (
  slug: string,
  title: string,
  description: string,
  image: string,
  tag: string,
  date: string,
  sections: [string, string, string[]][],
): BlogPost => {
  const wordCount = sections.flatMap(([, , ps]) => ps).join(" ").split(/\s+/).length;
  return {
    slug, title, description,
    image: `/amzad-food-website/${image}`,
    imageAlt: slug === "everyday-pantry" ? "Rice, lentils, cooking oil and spices arranged on a sunlit kitchen counter" : title,
    tag, date,
    readMin: Math.max(2, Math.ceil(wordCount / 180)),
    sections: sections.map(([id, t, paragraphs]) => ({ id, title: t, paragraphs })),
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "constipation-and-daily-food-habits",
    title: "কোষ্ঠকাঠিন্য: কারণ, লক্ষণ ও দৈনন্দিন খাবারের যত্ন",
    description: "আঁশযুক্ত খাবার, পর্যাপ্ত পানি ও ছোট ছোট অভ্যাস—পেটের স্বস্তির জন্য কোথা থেকে শুরু করবেন, আর সিডস মিক্স বেছে নেওয়ার আগে কী জানবেন।",
    image: "/amzad-food-website/products/hazmi-seeds-combo.png",
    imageAlt: "হজমি সিডস মিক্স, মধু ও পিংক সল্টের প্যাকেজ",
    tag: "Everyday Wellness", date: "Sep 29, 2026", readMin: 4, language: "bn",
    takeaways: ["খাবারে আঁশ ধীরে ধীরে বাড়ান, সঙ্গে পর্যাপ্ত পানি রাখুন।", "সিডস মিক্স কেনার আগে উপাদান ও ব্যবহারের নির্দেশনা পড়ুন।", "সমস্যা না কমলে বা সতর্কসংকেত দেখা দিলে চিকিৎসা নিন।"],
    sections: [
      { id: "understanding-constipation", title: "কোষ্ঠকাঠিন্য বলতে কী বোঝায়?", paragraphs: ["প্রতিদিন পায়খানা না হলেই কোষ্ঠকাঠিন্য—এমন নয়। স্বাভাবিক অভ্যাস মানুষভেদে আলাদা। সপ্তাহে তিনবারের কম মলত্যাগ, শক্ত বা শুকনো মল, কষ্ট করে মলত্যাগ কিংবা পুরোপুরি পরিষ্কার না হওয়ার অনুভূতি এর লক্ষণ হতে পারে।", "খাবার, চলাফেরা ও দৈনন্দিন রুটিনের দিকে খেয়াল রাখা ভালো শুরু। তবে দীর্ঘস্থায়ী সমস্যা শুধু খাবার বদলে সমাধান হবে ধরে নেওয়া ঠিক নয়।"] },
      { id: "common-causes", title: "কোন অভ্যাসগুলো ভূমিকা রাখতে পারে?", paragraphs: ["একটি কারণের বদলে কয়েকটি বিষয় একসঙ্গে কাজ করতে পারে। নিজের রুটিনটি দেখুন:"], bullets: ["প্রতিদিনের খাবারে আঁশ কম থাকা।", "পর্যাপ্ত তরল পান না করা ও চলাফেরা কম হওয়া।", "মলত্যাগের বেগ চেপে রাখা বা রুটিন বদলে যাওয়া।", "কিছু ওষুধ বা স্বাস্থ্যগত সমস্যা।"], note: "কোনো ওষুধকে কারণ মনে হলে নিজে বন্ধ না করে চিকিৎসকের সঙ্গে কথা বলুন।" },
      { id: "fibre-and-water", title: "আঁশ ও পানি: প্রতিদিনের খাবার দিয়ে শুরু", paragraphs: ["ডাল, ছোলা, শাকসবজি, ফল ও পূর্ণশস্য আঁশের পরিচিত উৎস। একবারে অনেকটা না বাড়িয়ে ধীরে ধীরে খাবারে যোগ করুন। আঁশের সঙ্গে পর্যাপ্ত পানি ও তরলও দরকার।", "প্রতিদিনের তালিকা সহজ রাখুন: ভাত বা রুটির সঙ্গে ডাল ও সবজি, আর নাশতায় একটি ফল। আপনার স্বাভাবিক খাবারেই পরিবর্তন আনা যায়।"] },
      { id: "seed-mix", title: "সিডস মিক্স বেছে নেওয়ার আগে", paragraphs: ["আমজাদ ফুডের হজমি সিডস কম্বোর মতো পণ্য কেনার সময় প্যাকেটের উপাদান, পরিমাণ ও সংরক্ষণের তথ্য দেখুন। সব সিডস মিক্সের উপাদান বা আঁশের পরিমাণ এক নয়।", "কোনো নির্দিষ্ট মিশ্রণ কোষ্ঠকাঠিন্য সারায়—এমন দাবি এই লেখায় করা হচ্ছে না। পণ্যকে দৈনন্দিন খাবারের একটি বিকল্প হিসেবে বিবেচনা করুন, চিকিৎসার বিকল্প হিসেবে নয়।"], bullets: ["অ্যালার্জি আছে এমন উপাদান রয়েছে কি না দেখুন।", "ভিজিয়ে খাওয়ার প্রয়োজন হলে প্যাকেটের নির্দিষ্ট নির্দেশনা অনুসরণ করুন।", "মধু বা লবণ যোগ করা বাধ্যতামূলক ধরে নেবেন না।"] },
      { id: "daily-routine", title: "সহজ একটি দৈনন্দিন রুটিন", paragraphs: ["টেকসই পরিবর্তন ছোট অভ্যাস থেকেই আসে। নিজের সময় ও পছন্দ অনুযায়ী এগিয়ে যান।"], steps: ["খাবারের তালিকায় নিয়মিত আঁশযুক্ত খাবার রাখুন।", "সারা দিনে পানি পানের সুযোগ রাখুন।", "সামর্থ্য অনুযায়ী নিয়মিত হাঁটুন বা শরীরচর্চা করুন।", "বেগ এলে দেরি করবেন না; মলত্যাগের জন্য সময় রাখুন।"] },
      { id: "when-to-seek-help", title: "কখন চিকিৎসকের পরামর্শ নেবেন?", paragraphs: ["নিজের যত্ন নেওয়ার পরও সমস্যা না কমলে চিকিৎসকের পরামর্শ নিন। মলে রক্ত, একটানা পেটব্যথা, বমি, গ্যাস বের না হওয়া বা অনিচ্ছাকৃত ওজন কমার সঙ্গে কোষ্ঠকাঠিন্য থাকলে দ্রুত চিকিৎসা নিন।"], note: "এই লেখা সাধারণ তথ্যের জন্য। ব্যক্তিগত চিকিৎসা বা ওষুধের পরামর্শের জন্য চিকিৎসকের সঙ্গে কথা বলুন।" },
    ],
    sources: [
      { title: "NIDDK · Symptoms & causes", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/symptoms-causes" },
      { title: "NIDDK · Food, fibre & fluids", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/eating-diet-nutrition" },
      { title: "NIDDK · Treatment & daily habits", url: "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/treatment" },
    ],
    featuredProduct: { name: "হজমি সিডস কম্বো", image: "/amzad-food-website/products/hazmi-seeds-combo.png", href: "/products/hazmi-seeds-combo/" },
  },
  article(
    "everyday-pantry",
    "Everyday pantry essentials for a Bangladeshi kitchen",
    "Small choices that make cooking at home simpler, more varied and more enjoyable.",
    "blogs/everyday-pantry.jpg", "Everyday Wellness", "Sep 20, 2026",
    [
      ["start-small", "Start with the meals you love", [
        "A useful pantry begins with your own kitchen. Write down three meals you enjoy making and list the ingredients they share. Rice, a cooking oil, a few spices and a favourite accompaniment can be a practical starting point.",
        "Build around what you actually cook. A small selection you use regularly is easier to organise than a shelf full of unfamiliar ingredients.",
      ]],
      ["build-your-shelf", "Build your shelf gradually", [
        "Choose one new ingredient at a time. Try a different spice in a familiar dish, or add a small portion of nuts to a snack you already enjoy.",
        "Keep an ongoing shopping list near the kitchen. Add items when they run low so your next order reflects what you need.",
      ]],
      ["keep-it-organised", "Make ingredients easy to find", [
        "Group ingredients by how you use them: breakfast, everyday cooking and occasional treats. Keep product labels and follow the storage instructions on each package.",
        "Place items you opened first where you can see them. Before shopping, check what is already on your shelf.",
      ]],
      ["make-it-yours", "Create a routine that works for you", [
        "Set aside a few minutes each week to plan a couple of meals. Leave room for leftovers, seasonal produce and changes of plan.",
        "The aim is a kitchen that feels inviting and manageable, with ingredients you look forward to using.",
      ]],
    ],
  ),
  article(
    "spice-pairings",
    "Bring familiar flavours to your table",
    "Explore simple ways to use turmeric, cumin and coriander in everyday meals.",
    "products/deli-spice-combo-pack.png", "Natural Goodness", "Sep 15, 2026",
    [
      ["choose-a-base", "Choose a familiar base", [
        "Start with a dish you already know, such as dal, a vegetable curry or a simple rice dish. Changing one spice at a time helps you notice how it affects the finished meal.",
      ]],
      ["layer-flavours", "Build flavour in small steps", [
        "Cumin brings an earthy character, coriander adds a gentle citrus note, and turmeric gives dishes their distinctive golden colour. Follow your recipe for quantities and cooking order.",
        "Taste as you cook and write down combinations you enjoy. A family recipe can be a helpful guide before you begin experimenting.",
      ]],
      ["keep-spices", "Organise your spice collection", [
        "Label containers clearly and keep the original product information. Follow the package storage advice and use a clean, dry spoon when measuring.",
        "Buy quantities that suit how often you cook rather than filling the cupboard all at once.",
      ]],
      ["try-tonight", "An idea for tonight", [
        "Choose your favourite vegetable dish and serve it with rice and dal. Let one spice combination lead the meal, then keep the accompaniments simple.",
      ]],
    ],
  ),
  article(
    "tea-time",
    "Make a little room for tea time",
    "A few thoughtful touches for a relaxed afternoon with family and friends.",
    "products/pera-sondesh.png", "Better Food Habits", "Sep 10, 2026",
    [
      ["set-the-table", "Keep the table simple", [
        "A pot of tea, a few cups and a small plate of treats can turn an ordinary afternoon into a shared pause. You do not need a formal occasion or an elaborate spread.",
      ]],
      ["choose-treats", "Choose a small selection", [
        "Offer a mix of textures: a crisp snack, a soft sweet and something familiar. Serve small portions first so guests can choose what they enjoy.",
        "Check ingredient labels and ask guests about any dietary requirements before choosing the menu.",
      ]],
      ["serve-with-care", "Make everyone feel welcome", [
        "Offer water alongside tea and let guests choose their preferred strength and sweetness. Keep serving utensils separate and leave product information available when needed.",
      ]],
      ["enjoy-the-moment", "Leave time for conversation", [
        "Prepare what you can before guests arrive. A welcoming tea table is as much about the time you share as the food you serve.",
      ]],
    ],
  ),
  article(
    "seasonal-mango",
    "Make the most of mango season",
    "Simple serving ideas for one of Bangladesh's favourite seasonal fruits.",
    "icons/category-mango.png", "Everyday Wellness", "Sep 5, 2026",
    [
      ["choose-your-fruit", "Choose for your plans", [
        "Think about when you plan to serve your mangoes and ask your seller about the variety and ripeness. Different varieties offer different textures and flavours.",
      ]],
      ["serve-simply", "Let the fruit lead", [
        "Serve mango slices on their own or alongside a familiar breakfast. A small fruit platter is an easy way to share several varieties and compare their flavours.",
      ]],
      ["plan-portions", "Plan around your household", [
        "Order an amount your household can enjoy and follow the seller's storage guidance. Share extra fruit with family or neighbours when you have more than you need.",
      ]],
    ],
  ),
  article(
    "thoughtful-food-gifts",
    "A food gift with a personal touch",
    "How to choose a small collection of favourites for someone you care about.",
    "products/delight-naru-combo.png", "Natural Goodness", "Aug 28, 2026",
    [
      ["know-the-person", "Begin with their favourites", [
        "Think of a food memory you share or an ingredient the recipient enjoys. A thoughtful gift reflects their tastes, whether that means a familiar sweet or everyday cooking essentials.",
      ]],
      ["check-details", "Check the practical details", [
        "Read ingredients and product information before buying. Consider dietary requirements, packaging size and whether the recipient can store the items as directed.",
      ]],
      ["add-a-note", "Add a personal note", [
        "A handwritten message can explain why you chose each item. Keep the original labels with the gift so the recipient has the information they need.",
      ]],
    ],
  ),
  article(
    "shopping-list",
    "A simpler weekly shopping list",
    "An easy routine for planning meals and making space for the things you enjoy.",
    "hero-products.png", "Better Food Habits", "Aug 20, 2026",
    [
      ["check-your-kitchen", "Check your kitchen first", [
        "Look through your cupboards before writing your list. Note what is open, what needs replacing and what could become part of your next meal.",
      ]],
      ["plan-a-few-meals", "Plan a few flexible meals", [
        "Choose a handful of meals that share ingredients. Keep the plan flexible enough to accommodate a busy day or an unexpected guest.",
      ]],
      ["shop-with-purpose", "Review before you order", [
        "Compare your list with the products in your basket. Check quantities, pack sizes and ingredient information, then make sure the order suits your household.",
      ]],
    ],
  ),
];

export const blogTags = ["All", ...Array.from(new Set(blogPosts.map((p) => p.tag)))];

// Product suggested once a reader is most of the way through an article.
// `slug` points at a catalogue product; the copy explains why it fits this story.
export type RelatedProductPick = { slug: string; topic: string; reason: string; benefit: string; cta: string; kicker: string };

const englishPick = (slug: string, topic: string, reason: string, benefit: string): RelatedProductPick => ({ slug, topic, reason, benefit, cta: "View Product", kicker: "Goes with this article" });

const relatedByPost: Record<string, RelatedProductPick> = {
  "constipation-and-daily-food-habits": { slug: "hazmi-seeds-combo", topic: "হজম ও পেটের স্বস্তি", reason: "এই লেখায় আঁশযুক্ত খাবার আর সিডস মিক্স বেছে নেওয়ার কথা বলা হয়েছে।", benefit: "বীজের মিশ্রণ—প্রতিদিনের খাবারে সহজে যোগ করা যায়।", cta: "পণ্যটি দেখুন", kicker: "এই লেখার সঙ্গে মানানসই" },
  "everyday-pantry": englishPick("mustard-oil-5-ltr", "Pantry basics", "Every pantry in this guide starts with a dependable cooking oil.", "A 5-litre pack of mustard oil for everyday cooking."),
  "spice-pairings": englishPick("deli-spice-combo-pack", "Spices", "You just read about building flavour with everyday spices.", "A ready set of spices to try these pairings tonight."),
  "tea-time": englishPick("pera-sondesh", "Tea time", "A soft, familiar sweet for the tea table this article describes.", "Traditional pera sondesh, ready to serve with tea."),
  "seasonal-mango": englishPick("himsagar-mango", "Mango season", "Planning for mango season? Start with a Rajshahi favourite.", "Himsagar mangoes in a 10 kg box for the whole household."),
  "thoughtful-food-gifts": englishPick("winter-gift-khejur-gur-combo", "Food gifts", "A gift-boxed set that matches the personal food gift ideas above.", "Khejur gur favourites, packed and ready to give."),
  "shopping-list": englishPick("akher-lal-chini", "Weekly staples", "A kitchen staple worth adding to your weekly list.", "Sugarcane red sugar in a 1 kg pack."),
};

// Fallback per topic, so new articles get a relevant suggestion without extra setup.
const relatedByTag: Record<string, RelatedProductPick> = {
  "Everyday Wellness": englishPick("hazmi-juice-combo", "Everyday wellness", "Related to the wellness habits in this article.", "A simple addition to your daily routine."),
  "Natural Goodness": englishPick("khejurer-patali-gur", "Natural goodness", "A natural sweetener that fits the ideas in this story.", "Traditional date-palm patali gur, 1 kg."),
  "Better Food Habits": englishPick("chia-seeds-combo", "Better food habits", "A small, easy step toward the habits in this article.", "A seeds combo that is easy to add to meals."),
};

export const relatedProductFor = (post: BlogPost): RelatedProductPick | undefined => relatedByPost[post.slug] ?? relatedByTag[post.tag];
