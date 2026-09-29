export type BlogSection = { id: string; title: string; paragraphs: string[] };
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
