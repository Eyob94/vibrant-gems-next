import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
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
import { PRODUCTS, SPORT_PRODUCTS } from "../data/data";
import { fetchStrapi } from "../lib/strapi";
import ButtonSecondary from "../shared/Button/ButtonSecondary";

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
  const collections: Collection[] = rawCollections.data.map(
    ({ attributes }: any) => ({
      name: attributes.name,
      icon: attributes.icon,
      categories: attributes.categories?.data.map(
        ({ attributes: { name, image } }: any) => ({
          name,
          image,
        })
      ),
    })
  );
  console.log(collections);

  return {
    props: { collections: JSON.parse(JSON.stringify(collections)) },
  };
};

type Category = { name: string; image: string };
export type Collection = { name: string; icon: string; categories: Category[] };

interface Props {
  collections?: Collection[];
}
const PageHome: FC<Props> = ({ collections }) => {
  // const [startExploringData, setStartExploringData] = useState<Collection[]>();

  console.log(collections, "coll");
  // useEffect(() => )
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
          <SectionSliderProductCard
            data={[
              PRODUCTS[4],
              SPORT_PRODUCTS[5],
              PRODUCTS[7],
              SPORT_PRODUCTS[1],
              PRODUCTS[6],
            ]}
          />

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
