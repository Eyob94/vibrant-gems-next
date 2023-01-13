import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../utils/ncNanoId";

const MEGAMENU_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Shop by style",
    children: [
      { id: ncNanoId(), collection: "#", name: "Activewear" },
      { id: ncNanoId(), collection: "#", name: "Coats & Jackets" },
      { id: ncNanoId(), collection: "#", name: "Sleep & Lounge" },
      { id: ncNanoId(), collection: "#", name: "Sweatshirts" },
      { id: ncNanoId(), collection: "#", name: "Hoodies" },
      { id: ncNanoId(), collection: "#", name: "Underwear" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Shop by metal",
    children: [
      { id: ncNanoId(), collection: "#", name: "Sunglasses" },
      { id: ncNanoId(), collection: "#", name: "Gloves" },
      { id: ncNanoId(), collection: "#", name: "Scarves" },
      { id: ncNanoId(), collection: "#", name: "Wallets" },
      { id: ncNanoId(), collection: "#", name: "Watches" },
      { id: ncNanoId(), collection: "#", name: "Belts" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Shop by Shape",
    children: [
      { id: ncNanoId(), collection: "#", name: "Boots" },
      { id: ncNanoId(), collection: "#", name: "Loafers " },
      { id: ncNanoId(), collection: "#", name: "Slip-Ons" },
      { id: ncNanoId(), collection: "#", name: "Slippers" },
      { id: ncNanoId(), collection: "#", name: "Sneakers" },
      { id: ncNanoId(), collection: "#", name: "Counterfeit" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Education",
    children: [
      { id: ncNanoId(), collection: "#", name: "Full Nelson" },
      { id: ncNanoId(), collection: "#", name: "Backpacks" },
      { id: ncNanoId(), collection: "#", name: "My Way" },
      { id: ncNanoId(), collection: "#", name: "Significant Other" },
      { id: ncNanoId(), collection: "#", name: "Re-Arranged" },
      { id: ncNanoId(), collection: "#", name: "Counterfeit" },
    ],
  },
];

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    collection: "/#",
    name: "About Us",
    children: [
      { id: ncNanoId(), collection: "/", name: "Vibrant Gems Experience" },
      { id: ncNanoId(), collection: "/home2", name: "Team members" },
      { id: ncNanoId(), collection: "/", name: "Donation and charity" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Gemstone Guide",
    children: [
      { id: ncNanoId(), collection: "/blog", name: "Gemstone education" },
      {
        id: ncNanoId(),
        collection: "/blog-single",
        name: "Precious gemstones",
      },
      { id: ncNanoId(), collection: "/about", name: "Spinels & Garnets" },
      { id: ncNanoId(), collection: "/contact", name: "Tourmalines" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Experience Us",
    children: [
      {
        id: ncNanoId(),
        collection: "/page-collection",
        name: "360° 4K Gemstone Display",
      },
      {
        id: ncNanoId(),
        collection: "/page-collection-2",
        name: "Our packaging",
      },
      { id: ncNanoId(), collection: "/product-detail", name: "Price matching" },
      {
        id: ncNanoId(),
        collection: "/product-detail-2",
        name: "Gemstone certification service",
      },
      { id: ncNanoId(), collection: "/cart", name: "Virtual appointment" },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Easy Access",
    children: [
      { id: ncNanoId(), collection: "/blog", name: "Contact Us" },
      { id: ncNanoId(), collection: "/blog-single", name: "Blog Single" },
      { id: ncNanoId(), collection: "/about", name: "About Page" },
      { id: ncNanoId(), collection: "/contact", name: "Contact Page" },
      { id: ncNanoId(), collection: "/login", name: "Login" },
      { id: ncNanoId(), collection: "/signup", name: "Signup" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    collection: "/",
    name: "Home Demo 1",
  },
  {
    id: ncNanoId(),
    collection: "/home2",
    name: "Home Demo 2",
  },
  {
    id: ncNanoId(),
    collection: "/page-collection",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        collection: "/page-collection",
        name: "Category page 1",
      },
      {
        id: ncNanoId(),
        collection: "/page-collection-2",
        name: "Category page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/product-detail",
    name: "Product Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        collection: "/product-detail",
        name: "Product detail 1",
      },
      {
        id: ncNanoId(),
        collection: "/product-detail-2",
        name: "Product detail 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/cart",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    collection: "/checkout",
    name: "Checkout Page",
  },
  {
    id: ncNanoId(),
    collection: "/page-search",
    name: "Search Page",
  },
  {
    id: ncNanoId(),
    collection: "/account",
    name: "Account Page",
  },
  {
    id: ncNanoId(),
    collection: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        collection: "/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        collection: "/contact",
        name: "Contact us",
      },
      {
        id: ncNanoId(),
        collection: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        collection: "/signup",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        collection: "/subscription",
        name: "Subscription",
      },
    ],
  },
  {
    id: ncNanoId(),
    collection: "/blog",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        collection: "/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        collection: "/blog-single",
        name: "Blog Single",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Gemstones",
    type: "megaMenu",
    children: MEGAMENU_DEMO,
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Engagement",
    type: "megaMenu",
    children: MEGAMENU_DEMO,
  },
  {
    id: ncNanoId(),
    type: "megaMenu",
    collection: "/#",
    name: "Wedding",
    children: MEGAMENU_DEMO,
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Jewelry",
  },
  {
    id: ncNanoId(),
    collection: "/#",
    name: "Explore",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
];
