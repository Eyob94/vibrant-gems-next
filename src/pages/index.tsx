import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import SectionClientSay from "../components/SectionClientSay/SectionClientSay";
import SectionGridMoreExplore from "../components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionHero2 from "../components/SectionHero/SectionHero2";
import SectionPromo1 from "../components/SectionPromo1";
import SectionSliderCategories from "../components/SectionSliderCategories/SectionSliderCategories";
import SectionSliderLargeProduct from "../components/SectionSliderLargeProduct";
import SectionSliderProductCard from "../components/SectionSliderProductCard";
import SectionGridFeatureItems from "../containers/PageHome/SectionGridFeatureItems";
import { fetchStrapi } from "../lib/strapi";
import { getStrapiMedia, getStrapiMedias } from "../lib/media";

export const getServerSideProps: GetServerSideProps = async () => {
  const rawCollections = await fetchStrapi("/collections", {
    populate: {
      image: true,
      categories: {
        sort: ["name:asc"],
        populate: {
          products: {
            count: true,
          },
        },
      },
    },
    sort: ["order:asc"],
    pagination: {
      limit: 6,
    },
  });
  const rawNewInProducts = await fetchStrapi("/products", {
    populate: ["image"],
    sort: ["newInOrder:asc"],
    filters: {
      status: "New In",
    },
    pagination: {
      limit: 6,
    },
  });
  const rawBestSellerProducts = await fetchStrapi("/products", {
    populate: ["image"],
    sort: ["bestSellerOrder:asc"],
    filters: {
      status: "Best Seller",
    },
    pagination: {
      limit: 6,
    },
  });
  const rawPopularGemstoneProducts = await fetchStrapi("/products", {
    populate: ["image"],
    sort: ["popularOrder:asc"],
    filters: {
      type: "GEMSTONE",
      status: "Popular",
    },
    pagination: {
      limit: 10,
    },
  });
  const rawExpertRecomentedJewleryProducts = await fetchStrapi("/products", {
    populate: ["image", "altImages"],
    sort: ["expertRecommendedOrder:asc"],
    filters: {
      type: "JEWLERY",
      status: "ExpertRecommended",
    },
    pagination: {
      limit: 10,
    },
  });
  const newInProducts: Product[] = rawNewInProducts.data.map(
    ({ id, attributes }: any) => ({
      id: id,
      name: attributes.name,
      price: attributes.price,
      image: getStrapiMedia(attributes.image),

      description: attributes.description,
      rating: attributes.rating,
      status: attributes.status,
      slug: attributes.slug,
    })
  );
  const bestSellerProducts: Product[] = rawBestSellerProducts.data.map(
    ({ id, attributes }: any) => ({
      id: id,
      name: attributes.name,
      price: attributes.price,
      image: getStrapiMedia(attributes.image),
      description: attributes.description,
      rating: attributes.rating,
      status: attributes.status,
      slug: attributes.slug,
    })
  );
  const popularGemstoneProducts: Product[] =
    rawPopularGemstoneProducts.data.map(({ id, attributes }: any) => ({
      id: id,
      name: attributes.name,
      price: attributes.price,
      image: getStrapiMedia(attributes.image),
      description: attributes.description,
      rating: attributes.rating,
      status: attributes.status,
      slug: attributes.slug,
    }));
  const expertRecommendedProducts: Product[] =
    rawExpertRecomentedJewleryProducts.data.map(({ id, attributes }: any) => ({
      id: id,
      name: attributes.name,
      price: attributes.price,
      image: getStrapiMedia(attributes.image),
      variantImages: getStrapiMedias(attributes.altImages),
      description: attributes.description,
      rating: attributes.rating,
      status: attributes.status,
      slug: attributes.slug,
    }));

  const collections: Collection[] = rawCollections.data.map(
    ({ attributes }: any) => ({
      name: attributes.name,
      description: attributes.description,
      slug: attributes.slug,
      image: attributes.image.data && getStrapiMedia(attributes.image),
      categories: attributes.categories?.data.map(
        ({ attributes: { name, image, products } }: any) => ({
          name,
          image,
          productsCount: products.data?.attributes.count,
        })
      ),
    })
  );
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
      newInProducts: JSON.parse(JSON.stringify(newInProducts)),
      bestSellerProducts: JSON.parse(JSON.stringify(bestSellerProducts)),
      popularGemstoneProducts: JSON.parse(
        JSON.stringify(popularGemstoneProducts)
      ),
      expertRecommendedProducts: JSON.parse(
        JSON.stringify(expertRecommendedProducts)
      ),
    },
  };
};

type Category = { name: string; image: string; productsCount: number };
export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  variantImages?: string[];
  type: "GEMSTONE" | "JEWLERY";
  productVariants?: {
    inStock: number;
    metal: {
      name: string;
    };
    carat: {
      name: string;
    };
  }[];
  description: string;
  details?: string;
  accordionInfo?: { name: string; content: string }[];
  relatedProducts?: Product[];
  rating: number;
  status: string;
};

export type Collection = {
  name: string;
  image: string;
  categories: Category[];
  description: string;
};

interface Props {
  collections?: Collection[];
  newInProducts?: Product[];
  bestSellerProducts?: Product[];
  popularGemstoneProducts?: Product[];
  expertRecommendedProducts?: Product[];
}
const PageHome: FC<Props> = ({
  collections,
  newInProducts,
  bestSellerProducts,
  popularGemstoneProducts,
  expertRecommendedProducts,
}) => {
  console.log(expertRecommendedProducts);
  return (
    <>
      <Head>
        <title>Ciseco || Ecommerce Template</title>
      </Head>
      <div className="nc-PageHome relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHero2 />

        {popularGemstoneProducts && (
          <div className="mt-24 lg:mt-32">
            <DiscoverMoreSlider data={popularGemstoneProducts} />
          </div>
        )}

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          {/* SECTION */}
          {newInProducts && <SectionSliderProductCard data={newInProducts} />}

          {/* <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionHowItWork />
          </div> */}

          {/* SECTION */}
          <SectionPromo1 />

          {/* SECTION */}
          <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            {collections && <SectionGridMoreExplore data={collections} />}
          </div>

          <SectionSliderProductCard
            heading="Best Sellers"
            subHeading="Best selling of the month"
            data={bestSellerProducts}
          />

          {/*  */}
          {/* <SectionPromo2 /> */}

          {/* SECTION 3 */}
          {expertRecommendedProducts && (
            <SectionSliderLargeProduct
              data={expertRecommendedProducts}
              cardStyle="style2"
            />
          )}

          {/*  */}
          <SectionSliderCategories
            heading="Our Collections"
            data={collections}
          />

          {/* SECTION */}
          {/* <SectionPromo3 /> */}

          {/* SECTION */}
          <SectionGridFeatureItems />

          {/* <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            <div>
              <Heading rightDescText="From the Ciseco blog">
                The latest news
              </Heading>
              <SectionMagazine5 />
              <div className="flex mt-16 justify-center">
                <ButtonSecondary>Show all blog articles</ButtonSecondary>
              </div>
            </div>
          </div> */}

          {/*  */}
          <SectionClientSay />
        </div>
      </div>
    </>
  );
};

export default PageHome;
