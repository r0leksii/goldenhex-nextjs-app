export interface CategoryNode {
  id: number;
  name: string;
  children?: CategoryNode[];
}

export interface CategoryGroup {
  groupName: string;
  categories: CategoryNode[];
}

export const combineCategories: CategoryGroup[] = [
  {
    groupName: "Fresh & Refrigerated Foods",
    categories: [
      {
        id: 337568,
        name: "DAIRY",
        children: [
          {
            id: 388834,
            name: "Froozen Dairy",
            children: [
              { id: 388833, name: "CheeseBar" },
              { id: 389046, name: "Ice Cream" },
            ],
          },
          { id: 389048, name: "Cheeses" },
          { id: 389049, name: "Farmer Cheese" },
          { id: 389050, name: "Milk " },
          { id: 389051, name: "Yogurt" },
          { id: 389053, name: "Sour Cream" },
          { id: 389055, name: "Kefir Ryazhenka" },
          { id: 389056, name: "Butter" },
          { id: 389057, name: "Feta Cheese" },
          { id: 389058, name: "Cream Cheeses" },
          { id: 431047, name: "Pudding" },
        ],
      },
      {
        id: 388830,
        name: "MEAT",
        children: [
          { id: 388831, name: "Frozen Meat" },
          { id: 388832, name: "Deli" },
          { id: 389529, name: "Kelbasi" },
        ],
      },
      {
        id: 389225,
        name: "FISH & SEAFOOD",
        children: [
          { id: 389488, name: "Frozen Fish & Seafood" },
          { id: 389489, name: "Smocked Fish" },
          { id: 389490, name: "Fish in Brin" },
          { id: 389492, name: "Caviars" },
          { id: 415438, name: "Dry Fish" },
          { id: 418201, name: "SeaFood" },
        ],
      },
      { id: 696496, name: "VEGETABLES" },
      { id: 808734, name: "FRUITS" },
      { id: 833356, name: "FRESH BREAD" },
    ],
  },
  {
    groupName: "Pantry Staples & Groceries",
    categories: [
      {
        id: 337570,
        name: "GROCERIES",
        children: [
          { id: 389227, name: "Sauces" },
          { id: 389228, name: "Spices" },
          { id: 389229, name: "Oils" },
          {
            id: 389232,
            name: "Grains",
            children: [
              { id: 389504, name: "Semolina" },
              { id: 389505, name: "Millet" },
              { id: 389506, name: "Wheat" },
              { id: 389507, name: "Rice" },
              { id: 389510, name: "Barley" },
              { id: 389511, name: "Couscous" },
              { id: 389512, name: "Baby Food" },
              { id: 389513, name: "Cereals" },
              { id: 389514, name: "Quick Meals" },
              { id: 415374, name: "Oats" },
              { id: 415520, name: "Beans" },
              { id: 415715, name: "Corn" },
              { id: 421165, name: "Flour" },
              { id: 421565, name: "Buckwheats" },
            ],
          },
          { id: 389236, name: "Snacks" },
          { id: 389476, name: "Coffee" },
          { id: 389477, name: "Tea" },
          { id: 389491, name: "Canned Fish" },
          { id: 389495, name: "Pasta" },
          {
            id: 389497,
            name: "Seeds",
            children: [{ id: 699107, name: "Vegetable Seeds " }],
          },
          { id: 389498, name: "Honey" },
          { id: 389499, name: "Preserves" },
          { id: 389501, name: "Canned Vegetables" },
          { id: 389515, name: "Canned Meat" },
          { id: 415421, name: "Condiments" },
          { id: 415425, name: "Bread" },
          { id: 415717, name: "Dry Fruit PK" },
          { id: 415779, name: "Baking Goods" },
          { id: 415898, name: "Dry Mushrooms" },
          { id: 415899, name: "Dry Soups" },
          { id: 415902, name: "Kisel" },
          { id: 420549, name: "Sugar" },
          { id: 608604, name: "Canned Pickles" },
          { id: 670482, name: "Soups" },
          { id: 675564, name: "Canned Mushrooms" },
          { id: 710049, name: "Packaged Salads " },
          { id: 710054, name: "Froozen Food" },
          { id: 814183, name: "Dry Vegetables" },
          { id: 818590, name: "Nuts" },
        ],
      },
      { id: 834605, name: "DRY FRUITS & NUTS" },
    ],
  },
  {
    groupName: "Sweets, Snacks & Bakery",
    categories: [
      {
        id: 389210,
        name: "BAKERY",
        children: [
          { id: 389211, name: "Frozen Bakery " },
          { id: 389518, name: "Fresh Bakery" },
          { id: 389523, name: "Sushki" },
          { id: 389524, name: "Cookies" },
          { id: 389525, name: "Waffers" },
          { id: 389526, name: "Pryaniki" },
          { id: 389527, name: "Suxari" },
          { id: 389528, name: "Solomki" },
        ],
      },
      {
        id: 389234,
        name: "CANDYS",
        children: [
          { id: 389562, name: "Candy Boxes" },
          { id: 389565, name: "Candy Bars" },
        ],
      },
      {
        id: 389478,
        name: "SWEETS",
        children: [
          { id: 389563, name: "Zephir" },
          { id: 389564, name: "Marmelad" },
          { id: 389566, name: "Halva" },
          { id: 389567, name: "Ruziks" },
          { id: 415375, name: "Kozinaks" },
          { id: 420534, name: "Pastilla " },
          { id: 529069, name: "New Year" },
        ],
      },
    ],
  },
  {
    groupName: "Frozen Foods",
    categories: [
      {
        id: 389223,
        name: "FROZEN",
        children: [
          { id: 389485, name: "Pelemeni" },
          { id: 389486, name: "Vareniki" },
          { id: 389531, name: "Fruits & Berries" },
          { id: 389535, name: "Mushrooms" },
          { id: 780759, name: "Frozen Vegetables" },
          { id: 859304, name: "Frozen Meat" },
        ],
      },
      { id: 663906, name: "PELEMENI LOOSE" },
    ],
  },
  {
    groupName: "Beverages (Incl. Alcohol)",
    categories: [
      {
        id: 389222,
        name: "BEVERAGES",
        children: [
          { id: 389555, name: "Juices" },
          { id: 389556, name: "Soda" },
          { id: 389557, name: "Mineral Water" },
          { id: 389558, name: "Kvas" },
          { id: 389559, name: "Syrups" },
          { id: 389560, name: "Kompots" },
        ],
      },
      {
        id: 389213,
        name: "ALCOHOL",
        children: [
          {
            id: 389215,
            name: "Beer",
            children: [
              { id: 389594, name: "Armenian Beer" },
              { id: 389595, name: "Israel Beer" },
              { id: 389596, name: "Poland Beer" },
              { id: 389597, name: "Romanian Beer" },
              { id: 389598, name: "Russian Beer" },
              { id: 389599, name: "Lithuanian Beer" },
              { id: 389600, name: "Czech Beer" },
              { id: 389601, name: "Albanian Beer" },
              { id: 389602, name: "Ukrainian Beer" },
              { id: 520844, name: "Croatia Beer" },
              { id: 568148, name: "Bulgarian Beer" },
              { id: 672610, name: "Estonia Beer" },
              { id: 675122, name: "Germany Beer" },
              { id: 676647, name: "Serbian Beer" },
              { id: 676648, name: "Spain Beer" },
              { id: 676649, name: "England Beer" },
            ],
          },
          {
            id: 389216,
            name: "Wine",
            children: [
              { id: 389581, name: "Armenian Wine" },
              { id: 389583, name: "Bulgarian Wine" },
              { id: 389584, name: "Chili Wine" },
              { id: 389585, name: "Israel Wine" },
              { id: 389586, name: "Macedonia Wine" },
              { id: 389587, name: "Moldovan Wine" },
              { id: 389588, name: "Poland Wine" },
              { id: 389589, name: "Romanian Wine" },
              { id: 389590, name: "Russian Wine" },
              { id: 389591, name: "Georgian Wine" },
              { id: 389592, name: "Slovak Wine" },
              { id: 675121, name: "Croatia Wine" },
              { id: 682261, name: "Hungarian Wine" },
              { id: 692015, name: "Italy Wine " },
              { id: 796802, name: "French Wines" },
              { id: 796805, name: "Brazilian Wine" },
              { id: 796806, name: "Argentinian Wine" },
            ],
          },
        ],
      },
    ],
  },
  {
    groupName: "Prepared Foods / Deli / Cafe",
    categories: [
      {
        id: 773148,
        name: "BUFFET",
        children: [
          { id: 682851, name: "Pirozhki/Chebureki" },
          { id: 773149, name: "Salad Bar" },
          { id: 773150, name: "Hot Bar" },
          { id: 827268, name: "Prep Meals" },
          { id: 837451, name: "BBQ MEAT" },
        ],
      },
      {
        id: 686606,
        name: "CAFETERIA",
        children: [
          { id: 682216, name: "Fresh Pastry" },
          { id: 711413, name: "Cafeteria Drinks" },
        ],
      },
      { id: 389230, name: "SALADS" },
    ],
  },
  {
    groupName: "Non-Food & Household",
    categories: [
      {
        id: 389224,
        name: "PHARMACY",
        children: [
          { id: 389568, name: "Herbal" },
          { id: 389570, name: "Nastoyki Syrups Oils " },
          { id: 389572, name: "Sprays & Droplets " },
          { id: 389573, name: "Crema & Mazi" },
          { id: 389574, name: "Tablets & Capsuls" },
          { id: 389575, name: "Patches " },
          { id: 389576, name: "Shampoo & Tooth Paste " },
          { id: 389577, name: "Soaps" },
          { id: 874673, name: "Antiperspirants" },
        ],
      },
      {
        id: 389231,
        name: "HOUSEHOLDS",
        children: [{ id: 874671, name: "Laundry" }],
      },
      {
        id: 389237,
        name: "SOUVENIRS",
        children: [
          { id: 389578, name: "Candles" },
          { id: 389579, name: "Holly Land" },
          { id: 389580, name: "Misc Souvenirs" },
          { id: 421452, name: "Easter" },
        ],
      },
      {
        id: 692288,
        name: "OTHER", // Other non-food
        children: [
          { id: 692287, name: "Office Supply" },
          { id: 790150, name: "Postcards" },
          { id: 875418, name: "Books" },
          { id: 881841, name: "Envelope" },
          { id: 882687, name: "Journals" },
        ],
      },
    ],
  },
  {
    groupName: "Seasonal & Operational",
    categories: [
      { id: 421567, name: "New Year Gifts" },
      {
        id: 676133,
        name: "Till Mix",
        children: [{ id: 683938, name: "Caviars" }],
      },
      { id: 682675, name: "Bag" },
      { id: 710634, name: "Kitchen" },
      { id: 729370, name: "Master Products" },
      {
        id: 790753,
        name: "ONLINE ORDERS",
        children: [
          { id: 790754, name: "Online Entries" },
          { id: 790755, name: "Online Salads" },
          { id: 790756, name: "Online Soups" },
        ],
      },
    ],
  },
];
