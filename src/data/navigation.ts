import { NavItemType } from "../shared/Navigation/NavigationItem";
import ncNanoId from "../utils/ncNanoId";

const MEGAMENU_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Clothing",
    children: [
      { id: ncNanoId(), href: "#", name: "Activewear" },
      { id: ncNanoId(), href: "#", name: "Coats & Jackets" },
      { id: ncNanoId(), href: "#", name: "Sleep & Lounge" },
      { id: ncNanoId(), href: "#", name: "Sweatshirts" },
      { id: ncNanoId(), href: "#", name: "Hoodies" },
      { id: ncNanoId(), href: "#", name: "Underwear" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Accessories",
    children: [
      { id: ncNanoId(), href: "#", name: "Sunglasses" },
      { id: ncNanoId(), href: "#", name: "Gloves" },
      { id: ncNanoId(), href: "#", name: "Scarves" },
      { id: ncNanoId(), href: "#", name: "Wallets" },
      { id: ncNanoId(), href: "#", name: "Watches" },
      { id: ncNanoId(), href: "#", name: "Belts" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shoes",
    children: [
      { id: ncNanoId(), href: "#", name: "Boots" },
      { id: ncNanoId(), href: "#", name: "Loafers " },
      { id: ncNanoId(), href: "#", name: "Slip-Ons" },
      { id: ncNanoId(), href: "#", name: "Slippers" },
      { id: ncNanoId(), href: "#", name: "Sneakers" },
      { id: ncNanoId(), href: "#", name: "Counterfeit" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Brands",
    children: [
      { id: ncNanoId(), href: "#", name: "Full Nelson" },
      { id: ncNanoId(), href: "#", name: "Backpacks" },
      { id: ncNanoId(), href: "#", name: "My Way" },
      { id: ncNanoId(), href: "#", name: "Significant Other" },
      { id: ncNanoId(), href: "#", name: "Re-Arranged" },
      { id: ncNanoId(), href: "#", name: "Counterfeit" },
    ],
  },
];

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Home  1" },
      { id: ncNanoId(), href: "/home2", name: "Home  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Header  1" },
      { id: ncNanoId(), href: "/home2", name: "Header  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/page-collection", name: "Category Page 1" },
      { id: ncNanoId(), href: "/page-collection-2", name: "Category Page 2" },
      { id: ncNanoId(), href: "/product-detail", name: "Product Page 1" },
      { id: ncNanoId(), href: "/product-detail-2", name: "Product Page 2" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/checkout", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/checkout", name: "Checkout Page" },
      { id: ncNanoId(), href: "/page-search", name: "Search Page" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/account", name: "Accout Page" },
      { id: ncNanoId(), href: "/account-my-order", name: "Order Page" },
      { id: ncNanoId(), href: "/subscription", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Blog Page",
    children: [
      { id: ncNanoId(), href: "/blog", name: "Blog Page" },
      { id: ncNanoId(), href: "/blog-single", name: "Blog Single" },
      { id: ncNanoId(), href: "/about", name: "About Page" },
      { id: ncNanoId(), href: "/contact", name: "Contact Page" },
      { id: ncNanoId(), href: "/login", name: "Login" },
      { id: ncNanoId(), href: "/signup", name: "Signup" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home Demo 1",
  },
  {
    id: ncNanoId(),
    href: "/home2",
    name: "Home Demo 2",
  },
  {
    id: ncNanoId(),
    href: "/page-collection",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/page-collection",
        name: "Category page 1",
      },
      {
        id: ncNanoId(),
        href: "/page-collection-2",
        name: "Category page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/product-detail",
    name: "Product Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/product-detail",
        name: "Product detail 1",
      },
      {
        id: ncNanoId(),
        href: "/product-detail-2",
        name: "Product detail 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/cart",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    href: "/checkout",
    name: "Checkout Page",
  },
  {
    id: ncNanoId(),
    href: "/page-search",
    name: "Search Page",
  },
  {
    id: ncNanoId(),
    href: "/account",
    name: "Account Page",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/contact",
        name: "Contact us",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/signup",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        href: "/subscription",
        name: "Subscription",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/blog-single",
        name: "Blog Single",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Men",
    type: "megaMenu",
    children: MEGAMENU_DEMO,
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Women",
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Beauty",
  },

  {
    id: ncNanoId(),
    href: "/#",
    name: "Sport",
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Templates",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Explore",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },
];
