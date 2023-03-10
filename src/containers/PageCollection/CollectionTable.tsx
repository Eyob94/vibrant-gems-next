import { FC, useEffect, useRef, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchStrapi } from "../../lib/strapi";
import { Product } from "../../pages";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Pagination from "../../shared/Pagination/Pagination";
import TabFilters, { SortingTypes } from "../TabFilters";

const CollectionTable: FC<{
  collection?: string | [];
  category?: string | [];
}> = ({ category = [], collection = [] }) => {
  const take = 28;
  const firstRender = useRef(null);

  const [categories, setCategories] = useState<
    {
      name: string;
      active: boolean;
      collectionName: string;
      collectionDescription: string;
    }[]
  >([]);
  const [maxProductPrice, setMaxProductPrice] = useState<number>(100);
  const [metals, setMetals] = useState<{ name: string; active: boolean }[]>([]);
  const [carat, setCarat] = useState<{ name: string; active: boolean }[]>([]);
  const [products, setProducts] = useState<Product[]>();
  const [paginationPage, setPaginationPage] = useState(1);
  const [productsLength, setProductLength] = useState(0);
  const [rangePrice, setRangePrices] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    typeof category === "string" ? [category] : []
  );
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedCarats, setSelectedCarats] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortingTypes | "">("");
  const [isOnSale, setIsOnSale] = useState(false);

  const fetchProducts = async () => {
    const products = await fetchStrapi(`/products`, {
      populate: [
        "category",
        "image",
        "category.collection",
        "productVariants",
        "productVariants.metal",
        "productVariants.carat",
      ],
      pagination: {
        page: paginationPage,
        pageSize: take,
      },
      sort: [
        selectedSort === "price-hight-low"
          ? "price:desc"
          : selectedSort === "price-low-hight"
          ? "price:asc"
          : undefined,
        selectedSort === "newest" ? "createdAt:desc" : undefined,
        selectedSort === "best-rating" ? "rating:desc" : undefined,
      ],
      filters: {
        price: {
          $between: [rangePrice[0], rangePrice[1]],
        },
        status: isOnSale
          ? "On Sale"
          : selectedSort === "most-popular"
          ? "Popular"
          : [],
        category: {
          name:
            (selectedCategories.length > 0 ? selectedCategories : category) ||
            [],
          collection: {
            name: collection || [],
          },
        },
        productVariants: {
          metal: {
            name: selectedMetals,
          },
          carat: {
            name: selectedCarats,
          },
        },
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
  const getCarat = async () => {
    const carat = await fetchStrapi("/carats");
    const mappedMetalData = carat.data.map((metal: any) => ({
      name: metal.attributes.name as string,
      active: false,
    }));
    setCarat(mappedMetalData);
  };
  const getMaxPrice = async () => {
    const maxProductPriceResponse = await fetchStrapi(`/products`, {
      sort: ["price:desc"],
      pagination: {
        limit: 1,
      },
    });
    console.log(maxProductPriceResponse, "maxProduct");
    if (maxProductPriceResponse.data) {
      setMaxProductPrice(maxProductPriceResponse.data[0].attributes.price);
      console.log(maxProductPriceResponse.data[0].attributes.price);
    }
  };
  const getAllCategories = async () => {
    const categories = await fetchStrapi("/categories", {
      populate: ["collection"],
      filters: {
        collection: {
          name: collection || [],
        },
      },
      pagination: {
        limit: 6,
      },
    });
    const mappedCategoriesData = categories.data.map((cat: any) => ({
      name: cat.attributes.name as string,
      active: cat.attributes.name === category,
      collectionName: cat.attributes.collection?.data?.attributes.name || "",
      collectionDescription:
        cat.attributes.collection?.data?.attributes.description || "",
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
  const handleCaratFilter = (selectedCarats: string[]) => {
    setSelectedCarats(selectedCarats);
  };
  const handleSortFilter = (selectedSort: SortingTypes | "") => {
    setSelectedSort(selectedSort);
  };

  useEffect(() => {
    if (!firstRender.current) {
      getAllCategories();
      getMaxPrice();
      getMetalTypes();
      getCarat();
    }
    fetchProducts();
  }, [
    paginationPage,
    rangePrice,
    selectedCategories,
    selectedMetals,
    selectedCarats,
    selectedSort,
    isOnSale,
  ]);

  return (
    <div ref={firstRender.current} className="space-y-10 lg:space-y-14">
      {/* HEADING */}
      <>
        <div className="max-w-screen-sm">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {collection || "Shop through our endless Gewlery"}
          </h2>
          {categories[0] && (
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              {collection
                ? categories[0].collectionDescription
                : "Description goes here"}
            </span>
          )}
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />
      </>
      <main>
        {/* TABS FILTER */}
        <TabFilters
          handlePriceFilter={handlePriceFilter}
          categories={categories}
          handleCategoriesFilter={handleCategoryFilter}
          maxProductPrice={maxProductPrice}
          metals={metals}
          carat={carat}
          handleMetalsFilter={handleMetalsFilter}
          handleCaratFilter={handleCaratFilter}
          handleSortFilter={handleSortFilter}
          isOnSaleState={{
            isOnSale,
            setIsOnSale,
          }}
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
