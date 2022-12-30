import React, { FC, useEffect, useState } from "react";
import Pagination from "../shared/Pagination/Pagination";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import SectionSliderCollections from "../components/SectionSliderLargeProduct";
import SectionPromo1 from "../components/SectionPromo1";
import ProductCard from "../components/ProductCard";
import TabFilters from "../containers/TabFilters";
import { Product, PRODUCTS } from "../data/data";
import Head from "next/head";

export interface PageCollectionProps {
  className?: string;
}

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {
  const [products, setProducts] = useState<Product[]>();

  const fetchProducts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate[0]=category&populate[1]=image`
    );
    const json = await res.json();
    const s = json.data.map(({ attributes }: any) => ({
      id: attributes.id,
      name: attributes.name,
      price: attributes.price,
      image: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.image.data.attributes.formats.thumbnail.url}`,
      description: attributes.description,
      category: "category",
      tags: attributes.name,
      link: attributes.name,
      // sizes: attributes.name,
      // allOfSizes: attributes.name,
      status: attributes.name,
    }));
    setProducts(s);
    console.log(s, "here");
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Head>
        <title>Collection || Ciseco Ecommerce Template</title>
      </Head>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {products &&
                products.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
