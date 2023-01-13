import { productImgs } from "../contains/fakeData";

//

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: string;
  color?: string;
  featuredImage: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  variantImage?: string[];
  description: string;
  type?: "GEMSTONE" | "JEWLERY";
  productVariants?: {
    inStock: number;
    metal: {
      name: string;
    };
    carat: {
      name: string;
    };
  }[];
  category: string;
  tags: string[];
  slug: string;
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "New in" | "limited edition" | "Sold Out" | "50% Discount";
}

const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: "Black",
    thumbnail: "/images/products/v6.jpg",
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "White",
    thumbnail: "/images/products/v2.jpg",
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    thumbnail: "/images/products/v3.jpg",
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    thumbnail: "/images/products/v4.jpg",
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Natural",
    thumbnail: "/images/products/v5.jpg",
    featuredImage: productImgs[4],
  },
];
const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    name: "Violet",
    color: "bg-violet-400",
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "Yellow",
    color: "bg-yellow-400",
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    color: "bg-orange-400",
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    color: "bg-sky-400",
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Green",
    color: "bg-green-400",
    featuredImage: productImgs[4],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rey Nylon Backpack",
    description: "Brown cockroach wings",
    price: 74,
    image: productImgs[16],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    slug: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "Sold Out",
  },
  {
    id: 2,
    name: 'Round Buckle 1" Belt',
    description: "Classic green",
    price: 68,
    image: productImgs[1],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    slug: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% Discount",
  },
  {
    id: 3,
    name: "Waffle Knit Beanie",
    description: "New blue aqua",
    price: 132,
    image: productImgs[15],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    slug: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 4,
    name: "Travel Pet Carrier",
    description: "Dark pink 2023",
    price: 28,
    image: productImgs[3],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    slug: "/product-detail/",
    status: "Sold Out",
  },
  {
    id: 5,
    name: "Leather Gloves",
    description: "Perfect mint green",
    price: 42,
    image: productImgs[4],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    slug: "/product-detail/",
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt",
    description: "New design 2023",
    price: 30,
    image: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    slug: "/product-detail/",
  },
  {
    id: 7,
    name: "Wool Cashmere Jacket",
    description: "Matte black",
    price: 12,
    image: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    slug: "/product-detail/",
    status: "New in",
  },
  {
    id: 8,
    name: "Ella Leather Tote",
    description: "Cream pink",
    price: 145,
    image: productImgs[7],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    slug: "/product-detail/",
    status: "limited edition",
  },
];

// export const SPORT_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     name: "Mastermind Toys",
//     description: "Brown cockroach wings",
//     price: 74,
//     image: "/images/products/sport-1.png",

//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     slug: "/product-detail/",
//     variants: DEMO_VARIANT_COLORS,
//     variantType: "color",
//     sizes: ["XS", "S", "M", "L", "XL"],
//     allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
//     status: "New in",
//   },
//   {
//     id: 2,
//     name: "Jump Rope Kids",
//     description: "Classic green",
//     price: 68,
//     image: "/images/products/sport-2.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     slug: "/product-detail/",
//     variants: DEMO_VARIANT_COLORS,
//     variantType: "color",
//     status: "50% Discount",
//   },
//   {
//     id: 3,
//     name: "Tee Ball Beanie",
//     description: "New blue aqua",
//     price: 132,
//     image: "/images/products/sport-3.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     slug: "/product-detail/",
//     variants: DEMO_VARIANTS,
//     variantType: "image",
//     sizes: ["S", "M", "L", "XL"],
//     allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
//   },
//   {
//     id: 4,
//     name: "Rubber Table Tennis",
//     description: "Dark pink 2023",
//     price: 28,
//     image: "/images/products/sport-4.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variants: DEMO_VARIANT_COLORS,
//     variantType: "color",
//     slug: "/product-detail/",
//     status: "Sold Out",
//   },
//   {
//     id: 5,
//     name: "Classic Blue Rugby",
//     description: "Perfect mint green",
//     price: 42,
//     image: "/images/products/sport-5.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variants: DEMO_VARIANTS,
//     variantType: "image",
//     sizes: ["XS", "S", "M", "L", "XL"],
//     allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
//     slug: "/product-detail/",
//   },
//   {
//     id: 6,
//     name: "Manhattan Toy WRT",
//     description: "New design 2023",
//     price: 30,
//     image: "/images/products/sport-6.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variantType: "color",
//     variants: DEMO_VARIANT_COLORS,
//     slug: "/product-detail/",
//   },
//   {
//     id: 7,
//     name: "Tabletop Football ",
//     description: "Matte black",
//     price: 12,
//     image: "/images/products/sport-7.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variants: DEMO_VARIANTS,
//     variantType: "image",
//     slug: "/product-detail/",
//     status: "New in",
//   },
//   {
//     id: 8,
//     name: "Pvc Catching Toy",
//     description: "Cream pink",
//     price: 145,
//     image: "/images/products/sport-8.png",
//     category: "Category 1",
//     tags: ["tag1", "tag2"],
//     variants: DEMO_VARIANT_COLORS,
//     variantType: "color",
//     sizes: ["XS", "S", "M", "L", "XL"],
//     allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
//     slug: "/product-detail/",
//     status: "limited edition",
//   },
// ];
