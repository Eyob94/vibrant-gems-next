import React, { FC, useEffect, useRef, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchStrapi } from "../../lib/strapi";
import { Product } from "../../pages";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Pagination from "../../shared/Pagination/Pagination";
import TabFilters from "../TabFilters";

const CollectionTable = () => {
  const take = 28;
  const firstRender = useRef(null);
  const [categories, setCategories] = useState<
    { name: string; active: boolean }[]
  >([]);
  const [metals, setMetals] = useState<{ name: string; active: boolean }[]>([]);
  const [products, setProducts] = useState<Product[]>();
  const [paginationPage, setPaginationPage] = useState(1);
  const [productsLength, setProductLength] = useState(0);
  const [rangePrice, setRangePrices] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);

  const fetchProducts = async () => {
    const products = await fetchStrapi(`/products`, {
      populate: ["category", "image"],
      pagination: {
        page: paginationPage,
        pageSize: take,
      },
      filters: {
        price: {
          $between: [rangePrice[0], rangePrice[1]],
        },
        category: {
          name: selectedCategories,
        },
        // productItem: {
        //   metal: {
        //     name: selectedMetals,
        //   },
        // },
      },
    });

    setProductLength(products.meta.pagination.total);

    const s = products.data.map(({ id, attributes }: any) => ({
      id,
      name: attributes.name,
      price: attributes.price,
      image: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.image.data.attributes.formats.thumbnail.url}`,
      description: attributes.description,
      category: "category",
      tags: attributes.name,
      slug: attributes.slug,
      status: attributes.name,
    }));
    setProducts(s);
  };
  const getMetalTypes = async () => {
    const metals = await fetchStrapi("/metals");
    const mappedMetalData = metals.data.map((metal: any) => ({
      name: metal.attributes.name as string,
      active: false,
    }));
    setMetals(mappedMetalData);
  };
  const getAllCategories = async () => {
    const categories = await fetchStrapi("/categories");
    const mappedCategoriesData = categories.data.map((category: any) => ({
      name: category.attributes.name as string,
      active: false,
    }));
    setCategories(mappedCategoriesData);
  };
  const handlePaginate = (page: number) => {
    setPaginationPage(page);
  };
  const handlePriceFilter = (min: number, max: number) => {
    setPaginationPage(1);
    setRangePrices([min, max]);
  };
  const handleCategoryFilter = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };
  const handleMetalsFilter = (selectedMetals: string[]) => {
    setSelectedMetals(selectedMetals);
  };

  useEffect(() => {
    if (!firstRender.current) {
      getAllCategories();
      // getMetalTypes();
    }
    fetchProducts();
  }, [paginationPage, rangePrice, selectedCategories, selectedMetals]);

  return (
    <div ref={firstRender.current} className="space-y-10 lg:space-y-14">
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
        <TabFilters
          handlePriceFilter={handlePriceFilter}
          categories={categories}
          handleCategoriesFilter={handleCategoryFilter}
          metals={metals}
          handleMetalsFilter={handleMetalsFilter}
        />

        {/* LOOP ITEMS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {products &&
            products.map((item, index) => (
              <ProductCard data={{ ...item }} key={index} />
            ))}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
          <Pagination
            length={productsLength}
            take={take}
            handleClick={handlePaginate}
          />
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </div>
      </main>
    </div>
  );
};

export default CollectionTable;
