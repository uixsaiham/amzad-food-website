import { Product } from "./products";

export type ProductDetailsContent = { blurb: string; highlights: string[]; usage: string[] };

// Editorial descriptions: supplier certifications, nutrition, origin and shelf life
// must come from verified product labels rather than inferred marketing claims.
const descriptions: Record<string, ProductDetailsContent> = {
  "Wildflower Honey & Black Seed": {
    "blurb": "Wildflower honey paired with black seed for a distinctive sweet and earthy flavour.",
    "highlights": [
      "Sweet honey and earthy black seed",
      "Enjoy with toast, oats or yoghurt",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Enjoy with toast, oats or yoghurt",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Sundarbans Raw Honey": {
    "blurb": "Sundarbans honey with a rich sweetness for drinks, breakfast and desserts.",
    "highlights": [
      "Rich honey flavour",
      "Stir into warm tea or drizzle over breakfast",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Stir into warm tea or drizzle over breakfast",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Organic Black Seed Oil": {
    "blurb": "Black seed oil with a bold, earthy flavour for use as directed on the label.",
    "highlights": [
      "Distinctive black seed aroma",
      "Follow the serving and use instructions on the bottle",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Follow the serving and use instructions on the bottle",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Premium Black Seed Oil": {
    "blurb": "Black seed oil with an intense aroma and characteristic earthy taste.",
    "highlights": [
      "Bold, earthy flavour",
      "Follow the serving and use instructions on the bottle",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Follow the serving and use instructions on the bottle",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Premium Date Syrup": {
    "blurb": "A sweet date syrup for drizzling, mixing into drinks and adding to desserts.",
    "highlights": [
      "Date sweetness in syrup form",
      "Drizzle over pancakes or stir into porridge",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Drizzle over pancakes or stir into porridge",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Pure Ghee": {
    "blurb": "Ghee brings a rich buttery flavour to rice, cooking and traditional sweets.",
    "highlights": [
      "Rich buttery flavour",
      "Spoon over warm rice or use in cooking",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Spoon over warm rice or use in cooking",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Puffed Rice": {
    "blurb": "Light, crisp puffed rice for jhal muri, breakfast and everyday snacking.",
    "highlights": [
      "Light and crisp texture",
      "Mix with onion, chilli and mustard oil for jhal muri",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Mix with onion, chilli and mustard oil for jhal muri",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Khejur Gur": {
    "blurb": "Date-palm jaggery for traditional desserts and everyday sweetening.",
    "highlights": [
      "Date-palm sweetness",
      "Add to payesh, pitha or warm milk",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Add to payesh, pitha or warm milk",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Mango Pickle": {
    "blurb": "A tangy mango accompaniment for rice, dal and savoury meals.",
    "highlights": [
      "Tangy mango flavour",
      "Serve a small portion alongside your meal",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve a small portion alongside your meal",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Litchu Flower Honey": {
    "blurb": "Litchu flower honey for a sweet finishing touch to breakfast, drinks and desserts.",
    "highlights": [
      "Floral honey flavour",
      "Drizzle over toast or stir into warm drinks",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Drizzle over toast or stir into warm drinks",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Ajwa Dates": {
    "blurb": "Ajwa dates for a sweet snack, a sharing platter or a breakfast bowl.",
    "highlights": [
      "Ajwa date variety",
      "Remove the stones before eating or chopping",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Remove the stones before eating or chopping",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Medjool Dates": {
    "blurb": "Medjool dates for snacking, stuffing and adding sweetness to recipes.",
    "highlights": [
      "Medjool date variety",
      "Remove the stones and serve whole or chopped",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Remove the stones and serve whole or chopped",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Mabroom Dates": {
    "blurb": "Mabroom dates for sharing, snacking or pairing with nuts.",
    "highlights": [
      "Mabroom date variety",
      "Remove the stones before serving",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Remove the stones before serving",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Cold Pressed Mustard Oil": {
    "blurb": "Mustard oil with a distinctive pungent flavour for everyday cooking and Bengali dishes.",
    "highlights": [
      "Characteristic mustard aroma",
      "Use in curries, bhorta or pickles",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use in curries, bhorta or pickles",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Mustard Oil 5 Ltr": {
    "blurb": "Mustard oil in a larger pack for everyday cooking, pickles and traditional recipes.",
    "highlights": [
      "Distinctive mustard flavour",
      "Use the amount called for in your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use the amount called for in your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Coconut Oil": {
    "blurb": "Coconut oil for uses specified on the product label.",
    "highlights": [
      "Coconut oil in a selectable pack size",
      "Check the label for food or external-use suitability",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the label for food or external-use suitability",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Premium Cashew": {
    "blurb": "Cashews for snacking, adding crunch and blending into sauces or desserts.",
    "highlights": [
      "Cashew nut texture and flavour",
      "Serve as a snack or add to your recipes",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve as a snack or add to your recipes",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "California Almond": {
    "blurb": "Almonds for breakfast bowls, baking and everyday snacking.",
    "highlights": [
      "Almond crunch",
      "Chop into porridge or use in baking",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Chop into porridge or use in baking",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Roasted Peanut": {
    "blurb": "Roasted peanuts for a crunchy snack or a finishing touch to savoury dishes.",
    "highlights": [
      "Roasted peanut flavour",
      "Add to snacks, salads or chutneys",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Add to snacks, salads or chutneys",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Mixed Nuts": {
    "blurb": "A nut selection for sharing, snacking and topping breakfast bowls.",
    "highlights": [
      "A mix of nut textures",
      "Check the label for the included nuts and allergens",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the label for the included nuts and allergens",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chia Seeds": {
    "blurb": "Small chia seeds for soaked puddings, breakfast bowls and drinks.",
    "highlights": [
      "Small seeds that thicken when soaked",
      "Soak in liquid before serving and follow pack directions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Soak in liquid before serving and follow pack directions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Black Seed (Kalojira)": {
    "blurb": "Kalojira adds a distinctive savoury aroma to breads, vegetables and pickles.",
    "highlights": [
      "Bold aromatic seeds",
      "Use a small amount in tempering or bread recipes",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use a small amount in tempering or bread recipes",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Flax Seeds": {
    "blurb": "Flax seeds bring a mild, nutty flavour to porridge, baking and breakfast bowls.",
    "highlights": [
      "Mild nutty flavour",
      "Grind or prepare according to your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Grind or prepare according to your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Pumpkin Seeds": {
    "blurb": "Pumpkin seeds add crunch to snacks, salads and breakfast bowls.",
    "highlights": [
      "Versatile seed topping",
      "Scatter over salads or add to your seed mix",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Scatter over salads or add to your seed mix",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Himsagar Mango": {
    "blurb": "Himsagar mangoes for enjoying fresh or preparing mango drinks and desserts.",
    "highlights": [
      "Himsagar mango variety",
      "Wash, peel and slice before serving",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Wash, peel and slice before serving"
    ]
  },
  "Langra Mango": {
    "blurb": "Langra mangoes for a fruit platter, lassi or mango desserts.",
    "highlights": [
      "Langra mango variety",
      "Wash and slice; remove the stone before serving",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Wash and slice; remove the stone before serving"
    ]
  },
  "Aamshotto": {
    "blurb": "Mango fruit leather for a chewy, fruity snack or a traditional dessert accompaniment.",
    "highlights": [
      "Chewy mango snack",
      "Slice into small pieces and serve",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Slice into small pieces and serve",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Himalayan Pink Salt": {
    "blurb": "Pink salt for seasoning everyday meals and finishing dishes.",
    "highlights": [
      "Pink salt for everyday seasoning",
      "Season to taste while cooking or serving",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Season to taste while cooking or serving",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Black Salt": {
    "blurb": "Black salt adds its distinctive savoury flavour to fruit, chaat and drinks.",
    "highlights": [
      "Distinctive savoury salt flavour",
      "Sprinkle sparingly over chaat or fruit",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Sprinkle sparingly over chaat or fruit",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Rock Salt Coarse": {
    "blurb": "Coarse rock salt for recipes that call for larger salt crystals.",
    "highlights": [
      "Coarse salt crystals",
      "Grind or dissolve as required by your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Grind or dissolve as required by your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chinigura Rice": {
    "blurb": "Chinigura rice for polao, special rice dishes and traditional meals.",
    "highlights": [
      "Small-grain rice variety",
      "Rinse and cook with water according to your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Rinse and cook with water according to your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chira": {
    "blurb": "Flattened rice for quick breakfasts, snacks and traditional sweet dishes.",
    "highlights": [
      "Flattened rice flakes",
      "Rinse or soak as needed for your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Rinse or soak as needed for your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Khoi": {
    "blurb": "Popped rice for a light snack or a bowl with milk and jaggery.",
    "highlights": [
      "Light popped rice texture",
      "Serve with milk, yoghurt or gur",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve with milk, yoghurt or gur",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Sylhet Black Tea": {
    "blurb": "Black tea for a warming cup served plain or with milk.",
    "highlights": [
      "Black tea for daily brewing",
      "Steep in hot water to your preferred strength",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Steep in hot water to your preferred strength",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Green Tea": {
    "blurb": "Green tea for a light cup enjoyed warm or chilled.",
    "highlights": [
      "Tea for a gentle brew",
      "Follow the pack brewing temperature and steeping time",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Follow the pack brewing temperature and steeping time",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Masala Chai": {
    "blurb": "Masala chai brings a spiced character to your everyday tea break.",
    "highlights": [
      "Spiced tea flavour",
      "Brew according to the pack directions; add milk to taste",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Brew according to the pack directions; add milk to taste",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Laccha Shemai": {
    "blurb": "Laccha shemai for milk desserts and festive sweet dishes.",
    "highlights": [
      "Fine strands for traditional desserts",
      "Prepare with milk and sweeten to taste",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Prepare with milk and sweeten to taste",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Roasted Shemai": {
    "blurb": "Roasted shemai for a quick milk dessert or a festive sweet course.",
    "highlights": [
      "Roasted vermicelli texture",
      "Simmer in milk according to your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Simmer in milk according to your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Akher Lal Chini": {
    "blurb": "Sugarcane red sugar for tea, baking and traditional sweet recipes.",
    "highlights": [
      "Sugarcane sweetness",
      "Use in place of sugar to suit your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use in place of sugar to suit your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Akher Juice Powder": {
    "blurb": "Sugarcane juice powder for preparing a sweet drink according to the pack directions.",
    "highlights": [
      "Powder format for mixing",
      "Mix with water in the proportions stated on the label",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Mix with water in the proportions stated on the label",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Akher Patali Gur": {
    "blurb": "Sugarcane jaggery in patali form for pitha, desserts and sweetening.",
    "highlights": [
      "Solid patali form",
      "Break or grate into your recipe",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Break or grate into your recipe",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Akher Dana Gur": {
    "blurb": "Granulated sugarcane jaggery for mixing into drinks and sweet dishes.",
    "highlights": [
      "Granulated gur texture",
      "Spoon into desserts or warm drinks to taste",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Spoon into desserts or warm drinks to taste",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Khejurer Patali Gur": {
    "blurb": "Date-palm jaggery in solid patali form for traditional winter recipes.",
    "highlights": [
      "Solid date-palm gur",
      "Grate into pitha, payesh or warm milk",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Grate into pitha, payesh or warm milk",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Khejurer Dana Gur": {
    "blurb": "Granulated date-palm jaggery for an easy-to-portion sweet addition.",
    "highlights": [
      "Granulated date-palm gur",
      "Stir into porridge, desserts or warm drinks",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Stir into porridge, desserts or warm drinks",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Khejurer Jhola Gur": {
    "blurb": "Pourable date-palm jaggery for drizzling over pitha and sweet dishes.",
    "highlights": [
      "Pourable gur texture",
      "Drizzle over pitha or stir into desserts",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Drizzle over pitha or stir into desserts",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Pera Sondesh": {
    "blurb": "Pera sondesh for a traditional sweet treat with tea or after a meal.",
    "highlights": [
      "Traditional sondesh sweet",
      "Serve in small portions and follow the label storage instructions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve in small portions and follow the label storage instructions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chatur Naru": {
    "blurb": "Chatur naru for a traditional bite-sized snack with tea or coffee.",
    "highlights": [
      "Traditional naru format",
      "Serve as a snack and check the label for ingredients",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve as a snack and check the label for ingredients",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Narkel Naru": {
    "blurb": "Coconut naru for a familiar sweet treat at tea time or celebrations.",
    "highlights": [
      "Coconut sweet in naru form",
      "Serve with tea or as a small dessert",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve with tea or as a small dessert",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Protein Bar": {
    "blurb": "A snack bar for your bag, desk or a busy day.",
    "highlights": [
      "Convenient bar format",
      "Check the label for serving size, ingredients and nutrition",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the label for serving size, ingredients and nutrition",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Badami Barfi": {
    "blurb": "Badami barfi for sharing at celebrations or enjoying as a small dessert.",
    "highlights": [
      "Traditional barfi sweet",
      "Serve in small pieces; check the label for nut and milk allergens",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve in small pieces; check the label for nut and milk allergens",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chinabuti Naru": {
    "blurb": "Chinabuti naru for a traditional peanut-flavoured sweet snack.",
    "highlights": [
      "Peanut naru sweet",
      "Serve with tea; check ingredients for allergens",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Serve with tea; check ingredients for allergens",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Isabgul Husk Fiber": {
    "blurb": "Isabgul husk in a pack for preparation as directed on its label.",
    "highlights": [
      "Husk format for mixing",
      "Follow the label preparation and serving instructions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Follow the label preparation and serving instructions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "SLFIT Support Capsules": {
    "blurb": "SLFIT capsules with product-specific directions on the pack.",
    "highlights": [
      "Capsule format",
      "Follow the label and ask a pharmacist about suitability",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Follow the label and ask a pharmacist about suitability"
    ]
  },
  "Kabab Queen Curry Powder": {
    "blurb": "A curry powder for seasoning kebabs, curries and savoury dishes.",
    "highlights": [
      "Versatile savoury seasoning",
      "Add according to your recipe and adjust to taste",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Add according to your recipe and adjust to taste",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Cumin Powder": {
    "blurb": "Ground cumin adds a warm, earthy flavour to curries, dal and savoury dishes.",
    "highlights": [
      "Warm earthy spice",
      "Stir into curries or sprinkle into marinades",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Stir into curries or sprinkle into marinades",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Garam Masala Powder": {
    "blurb": "Garam masala adds an aromatic finishing touch to curries and rice dishes.",
    "highlights": [
      "Aromatic spice seasoning",
      "Add a small amount near the end of cooking",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Add a small amount near the end of cooking",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Turmeric Powder": {
    "blurb": "Turmeric powder adds golden colour and an earthy flavour to cooking.",
    "highlights": [
      "Golden colour and earthy flavour",
      "Use in curries, dal and marinades",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use in curries, dal and marinades",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chili Powder": {
    "blurb": "Chili powder adds heat and colour to curries, snacks and marinades.",
    "highlights": [
      "Chilli heat for savoury dishes",
      "Start with a small amount and adjust to taste",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Start with a small amount and adjust to taste",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Coriander Powder": {
    "blurb": "Ground coriander adds a mellow, aromatic flavour to everyday cooking.",
    "highlights": [
      "Mellow aromatic spice",
      "Add to curry bases, vegetables or marinades",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Add to curry bases, vegetables or marinades",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Delight Naru Combo": {
    "blurb": "A naru combo for sharing traditional sweets or arranging a gift.",
    "highlights": [
      "Traditional sweets in a combo format",
      "Check the pack for the included sweets and serving details",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the pack for the included sweets and serving details",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Deli Spice Combo Pack": {
    "blurb": "A spice combo for stocking your kitchen and preparing everyday recipes.",
    "highlights": [
      "Spices grouped in one combo",
      "Use each spice according to your recipe and its label",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Use each spice according to your recipe and its label",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Hazmi Juice Combo": {
    "blurb": "A juice combo for preparing drinks using the directions on each pack.",
    "highlights": [
      "Drink products in a combo format",
      "Check the included products and follow their mixing instructions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the included products and follow their mixing instructions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Keto Cure Combo": {
    "blurb": "A named combo pack with individual product details on the included labels.",
    "highlights": [
      "Multiple products in one combo",
      "Check each label for ingredients and use instructions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check each label for ingredients and use instructions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Slim Key Multi Seeds Combo": {
    "blurb": "A multi-seed combo for adding variety to breakfast and recipes.",
    "highlights": [
      "Seed selection in a combo format",
      "Prepare each seed as directed on its label",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Prepare each seed as directed on its label",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Winter Gift Khejur Gur Combo": {
    "blurb": "A date-palm gur combo for gifting and traditional sweet recipes.",
    "highlights": [
      "Date-palm gur in a gift combo",
      "Check the included gur varieties and use in desserts",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check the included gur varieties and use in desserts",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Hazmi Seeds Combo": {
    "blurb": "A seed combo for preparing and serving according to the included labels.",
    "highlights": [
      "Seed products grouped in one combo",
      "Check each product label for preparation instructions",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Check each product label for preparation instructions",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  },
  "Chia Seeds Combo": {
    "blurb": "A chia seed combo for breakfast ideas and recipes using the included products.",
    "highlights": [
      "Chia-focused combo format",
      "Soak chia as directed and check the other included labels",
      "Choose your preferred pack size before ordering",
      "Check the product label for ingredients and storage instructions"
    ],
    "usage": [
      "Soak chia as directed and check the other included labels",
      "Use a clean, dry utensil and reseal the pack after use."
    ]
  }
};

export function getProductDetails(product: Product): ProductDetailsContent {
  return descriptions[product.name] ?? {
    blurb: `${product.name} from our ${product.category.toLowerCase()} collection, available in the pack sizes shown below.`,
    highlights: ["Choose your preferred pack size", "See the selected pack price before ordering", "Check the label for ingredients and storage instructions"],
    usage: ["Follow the preparation and serving instructions on the product label."],
  };
}
