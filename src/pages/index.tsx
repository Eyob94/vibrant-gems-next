import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import Heading from "../components/Heading/Heading";
import SectionClientSay from "../components/SectionClientSay/SectionClientSay";
import SectionGridMoreExplore from "../components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionHero2 from "../components/SectionHero/SectionHero2";
import SectionHowItWork from "../components/SectionHowItWork/SectionHowItWork";
import SectionPromo1 from "../components/SectionPromo1";
import SectionPromo2 from "../components/SectionPromo2";
import SectionPromo3 from "../components/SectionPromo3";
import SectionSliderCategories from "../components/SectionSliderCategories/SectionSliderCategories";
import SectionSliderLargeProduct from "../components/SectionSliderLargeProduct";
import SectionSliderProductCard from "../components/SectionSliderProductCard";
import SectionMagazine5 from "../containers/BlogPage/SectionMagazine5";
import SectionGridFeatureItems from "../containers/PageHome/SectionGridFeatureItems";
import { fetchStrapi } from "../lib/strapi";
import ButtonSecondary from "../shared/Button/ButtonSecondary";
import { getStrapiMedia } from "../lib/media";

export const getServerSideProps: GetServerSideProps = async () => {
  const rawCollections = await fetchStrapi("/collections", {
    populate: {
      categories: {
        sort: ["name:asc"],
      },
    },
    sort: ["order:asc"],
    pagination: {
      limit: 6,
    },
  });
  const rawNewInProducts = await fetchStrapi("/products", {
    populate: ["image", "variantImage", "productVariants"],
    sort: ["newInOrder:asc"],
    filters: {
      status: "New In",
    },
    pagination: {
      limit: 6,
    },
  });
  const rawBestSellerProducts = await fetchStrapi("/products", {
    populate: ["image", "variantImage", "productVariants"],
    sort: ["bestSellerOrder:asc"],
    filters: {
      status: "Best Seller",
    },
    pagination: {
      limit: 6,
    },
  });
  const newInProducts: Product[] = rawNewInProducts.data.map(
    ({ id, attributes }: any) => ({
      id: id,
      name: attributes.name,
      price: attributes.price,
      image: getStrapiMedia(attributes.image),
      variants: attributes.variantImages?.data.map(({ attributes }: any) =>
        getStrapiMedia(attributes)
      ),
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
      variants: attributes.variantImages?.data.map(({ attributes }: any) =>
        getStrapiMedia(attributes)
      ),
      description: attributes.description,
      rating: attributes.rating,
      status: attributes.status,
      slug: attributes.slug,
    })
  );

  const collections: Collection[] = rawCollections.data.map(
    ({ attributes }: any) => ({
      name: attributes.name,
      slug: attributes.slug,
      icon: attributes.icon,
      categories: attributes.categories?.data.map(
        ({ attributes: { name, image } }: any) => ({
          name,
          image,
        })
      ),
    })
  );
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
      newInProducts: JSON.parse(JSON.stringify(newInProducts)),
      bestSellerProducts: JSON.parse(JSON.stringify(bestSellerProducts)),
    },
  };
};

type Category = { name: string; image: string };
export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  variants: string[];
  status: string;
};

export type Collection = { name: string; icon: string; categories: Category[] };

interface Props {
  collections?: Collection[];
  newInProducts?: Product[];
  bestSellerProducts?: Product[];
}
const PageHome: FC<Props> = ({
  collections,
  newInProducts,
  bestSellerProducts,
}) => {
  return (
    <>
      <Head>
        <title>Ciseco || Ecommerce Template</title>
      </Head>
      <div className="nc-PageHome relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHero2 />

        <div className="mt-24 lg:mt-32">
          <DiscoverMoreSlider />
        </div>

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          {/* SECTION */}
          <SectionSliderProductCard data={newInProducts} />

          <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionHowItWork />
          </div>

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
          <SectionPromo2 />

          {/* SECTION 3 */}
          <SectionSliderLargeProduct cardStyle="style2" />

          {/*  */}
          <SectionSliderCategories />

          {/* SECTION */}
          <SectionPromo3 />

          {/* SECTION */}
          <SectionGridFeatureItems />

          <div className="relative py-24 lg:py-32">
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
          </div>

          {/*  */}
          <SectionClientSay />
        </div>
      </div>
    </>
  );
};

export default PageHome;
