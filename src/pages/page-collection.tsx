import React, { FC, useEffect, useRef, useState } from "react";
import Pagination from "../shared/Pagination/Pagination";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import SectionSliderCollections from "../components/SectionSliderLargeProduct";
import SectionPromo1 from "../components/SectionPromo1";
import ProductCard from "../components/ProductCard";
import TabFilters from "../containers/TabFilters";
import { Product, PRODUCTS } from "../data/data";
import Head from "next/head";
import { fetchStrapi } from "../lib/strapi";
import CollectionTable from "../containers/PageCollection/CollectionTable";
import { GetServerSideProps } from "next";

export interface PageCollectionProps {
  className?: string;
  collection: string;
  category: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { collection, category } = query;
  return {
    props: {
      collection,
      category,
    },
  };
};

const PageCollection: FC<PageCollectionProps> = ({
  className = "",
  collection,
  category,
}) => {
  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Head>
        <title>Collection || Ciseco Ecommerce Template</title>
      </Head>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        {/* === SECTION 5 === */}
        <CollectionTable category={category} collection={collection} />
        <hr className="border-slate-200 dark:border-slate-700" />
        {/* 
        <SectionSliderCollections data={[]} />
        <hr className="border-slate-200 dark:border-slate-700" /> */}

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
