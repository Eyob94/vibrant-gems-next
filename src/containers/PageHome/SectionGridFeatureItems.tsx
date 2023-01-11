import React, { FC } from "react";
import HeaderFilterSection from "../../components/HeaderFilterSection";
import ProductCard from "../../components/ProductCard";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "../../data/data";
import CollectionTable from "../PageCollection/CollectionTable";

//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
  data = PRODUCTS,
}) => {
  return (
    <div className="nc-SectionGridFeatureItems relative">
      {/* <HeaderFilterSection /> */}
      <CollectionTable />

      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeatureItems;
