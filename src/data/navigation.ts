import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../utils/ncNanoId";

const MEGAMENU_DEMO: NavItemType[] = [
  {
    collection: "/#",
    name: "Shop by style",
    children: [
      { name: "Activewear" },
      { name: "Coats & Jackets" },
      { name: "Sleep & Lounge" },
      { name: "Sweatshirts" },
      { name: "Hoodies" },
      { name: "Underwear" },
    ],
  },
  {
    collection: "/#",
    name: "Shop by metal",
    children: [
      { name: "Sunglasses" },
      { name: "Gloves" },
      { name: "Scarves" },
      { name: "Wallets" },
      { name: "Watches" },
      { name: "Belts" },
    ],
  },
  {
    collection: "/#",
    name: "Shop by Shape",
    children: [
      { name: "Boots" },
      { name: "Loafers " },
      { name: "Slip-Ons" },
      { name: "Slippers" },
      { name: "Sneakers" },
      { name: "Counterfeit" },
    ],
  },
  {
    collection: "/#",
    name: "Education",
    children: [
      { name: "Full Nelson" },
      { name: "Backpacks" },
      { name: "My Way" },
      { name: "Significant Other" },
      { name: "Re-Arranged" },
      { name: "Counterfeit" },
    ],
  },
];

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    collection: "/#",
    name: "About Us",
    children: [
      { href: "/", name: "Vibrant Gems Experience" },
      { href: "/home2", name: "Team members" },
      { href: "/", name: "Donation and charity" },
    ],
  },
  {
    collection: "/#",
    name: "Gemstone Guide",
    children: [
      { href: "/blog", name: "Gemstone education" },
      {
        href: "/blog-single",
        name: "Precious gemstones",
      },
      { href: "/about", name: "Spinels & Garnets" },
      { href: "/contact", name: "Tourmalines" },
    ],
  },
  {
    collection: "/#",
    name: "Experience Us",
    children: [
      {
        href: "/page-collection",
        name: "360° 4K Gemstone Display",
      },
      {
        href: "/page-collection-2",
        name: "Our packaging",
      },
      { href: "/product-detail", name: "Price matching" },
      {
        href: "/product-detail-2",
        name: "Gemstone certification service",
      },
      { href: "/cart", name: "Virtual appointment" },
    ],
  },
  {
    collection: "/#",
    name: "Easy Access",
    children: [
      { href: "/blog", name: "Contact Us" },
      { href: "/blog-single", name: "Blog Single" },
      { href: "/about", name: "About Page" },
      { href: "/contact", name: "Contact Page" },
      { href: "/login", name: "Login" },
      { href: "/signup", name: "Signup" },
    ],
  },
];

// const OTHER_PAGE_CHILD: NavItemType[] = [
//   {
//
//     collection: "/",
//     name: "Home Demo 1",
//   },
//   {
//
//     collection: "/home2",
//     name: "Home Demo 2",
//   },
//   {
//
//     collection: "/page-collection",
//     name: "Category Pages",
//     type: "dropdown",
//     children: [
//       {
//
//         collection: "/page-collection",
//         name: "Category page 1",
//       },
//       {
//
//         collection: "/page-collection-2",
//         name: "Category page 2",
//       },
//     ],
//   },
//   {
//
//     collection: "/product-detail",
//     name: "Product Pages",
//     type: "dropdown",
//     children: [
//       {
//
//         collection: "/product-detail",
//         name: "Product detail 1",
//       },
//       {
//
//         collection: "/product-detail-2",
//         name: "Product detail 2",
//       },
//     ],
//   },
//   {
//
//     collection: "/cart",
//     name: "Cart Page",
//   },
//   {
//
//     collection: "/checkout",
//     name: "Checkout Page",
//   },
//   {
//
//     collection: "/page-search",
//     name: "Search Page",
//   },
//   {
//
//     collection: "/account",
//     name: "Account Page",
//   },
//   {
//
//     collection: "/about",
//     name: "Other Pages",
//     type: "dropdown",
//     children: [
//       {
//
//         collection: "/about",
//         name: "About",
//       },
//       {
//
//         collection: "/contact",
//         name: "Contact us",
//       },
//       {
//
//         collection: "/login",
//         name: "Login",
//       },
//       {
//
//         collection: "/signup",
//         name: "Signup",
//       },
//       {
//
//         collection: "/subscription",
//         name: "Subscription",
//       },
//     ],
//   },
//   {
//
//     collection: "/blog",
//     name: "Blog Page",
//     type: "dropdown",
//     children: [
//       {
//
//         collection: "/blog",
//         name: "Blog Page",
//       },
//       {
//
//         collection: "/blog-single",
//         name: "Blog Single",
//       },
//     ],
//   },
// ];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    collection: "/#",
    name: "Gemstones",
    type: "megaMenu",
    children: MEGAMENU_DEMO,
  },
  {
    collection: "/#",
    name: "Engagement",
    type: "megaMenu",
    children: MEGAMENU_DEMO,
  },
  {
    type: "megaMenu",
    collection: "/#",
    name: "Wedding",
    children: MEGAMENU_DEMO,
  },
  {
    collection: "/#",
    name: "Jewelry",
  },
  {
    collection: "/#",
    name: "Explore",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
];
