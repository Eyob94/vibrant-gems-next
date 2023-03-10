import { FC, useState } from "react";
import {
  SparklesIcon,
  NoSymbolIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import BagIcon from "../../components/BagIcon";
import IconDiscount from "../../components/IconDiscount";
import LikeButton from "../../components/LikeButton";
import NcInputNumber from "../../components/NcInputNumber";
import NotifyAddTocart from "../../components/NotifyAddTocart";
import Prices from "../../components/Prices";
import ReviewItem from "../../components/ReviewItem";
import SectionPromo2 from "../../components/SectionPromo2";
import SectionSliderProductCard from "../../components/SectionSliderProductCard";
import AccordionInfo from "../../containers/ProductDetailPage/AccordionInfo";
import ModalViewAllReviews from "../../containers/ProductDetailPage/ModalViewAllReviews";
import Policy from "../../containers/ProductDetailPage/Policy";
// import { Product, PRODUCTS } from "../../data/data";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import { fetchStrapi } from "../../lib/strapi";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { getStrapiMedia, getStrapiMedias } from "../../lib/media";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "..";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await fetchStrapi(`/products`, {
      filters: {
        slug: query.slug,
      },
      populate: [
        "image",
        "altImages",
        "productVariants",
        "productVariants.carat",
        "productVariants.metal",
        "relatedProducts",
        "relatedProducts.image",
      ],
    });

    const productData = data[0];
    console.log(productData);

    const product: Product = {
      id: productData.id,
      name: productData.attributes.name,
      price: productData.attributes.price,
      image: getStrapiMedia(productData.attributes.image),
      variantImages: getStrapiMedias(productData.attributes.altImages),
      description: productData.attributes.description,
      type: productData.attributes.type,
      productVariants: productData.attributes.productVariants.data?.map(
        ({ attributes }: any) => ({
          inStock: attributes.inStock,
          metal: {
            name: attributes.metal.data?.attributes.name,
          },
          carat: {
            name: attributes.carat.data?.attributes.name,
          },
        })
      ),
      details: productData.attributes.details,
      rating: 0,
      relatedProducts: productData.attributes.relatedProducts.data?.map(
        ({ attributes }: any) => ({
          ...attributes,
          image: getStrapiMedia(attributes.image),
        })
      ),
      accordionInfo: productData.attributes.accordionInfo,
      slug: productData.attributes.name,
      status: productData.attributes.status,
    };
    console.log(product.relatedProducts);
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
export interface ProductDetailPageProps
  extends InferGetServerSidePropsType<typeof getServerSideProps> {
  className?: string;
  product: Product;
  maxProductPrice: number;
}
const ProductDetailPage: FC<ProductDetailPageProps> = ({
  className = "",
  product,
  maxProductPrice,
}) => {
  const { addItem } = useShoppingCart();
  const status = product.status;
  const [metalTypes, setMetalTypes] = useState(
    Array.from(
      new Set(
        product.productVariants
          ?.map(({ metal }) => metal.name)
          .filter((name) => !!name)
      )
    )
  );
  const [metalTypeSelected, setMetalTypeSelected] = useState(
    metalTypes ? metalTypes[0] : ""
  );

  const [carat, setCarat] = useState(
    Array.from(
      new Set(
        product.productVariants
          ?.map(({ carat }) => carat.name)
          .filter((name) => !!name)
      )
    )
  );

  const [caratSelected, setCaratSelected] = useState(carat ? carat[0] : "");

  // const LIST_IMAGES_DEMO = [product.image, ...(product.variantImage || [])];
  // const LIST_IMAGES_DEMO = [
  //   "/images/products/detail1.jpg",
  //   "/images/products/detail2.jpg",
  //   "/images/products/detail3.jpg",
  // ];

  const [variantActive, setVariantActive] = useState(0);
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  const notifyAddTocart = () => {
    addItem({
      name: product.name,
      currency: "USD",
      price: product.price,
      id: product.id,
      product_data: product,
      sku: "",
    });
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={product.image}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={"this"}
          variantActive={0}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  // const renderVariants = () => {
  //   if (!variants || !variants.length) {
  //     return null;
  //   }

  //   return (
  //     <div>
  //       <label htmlFor="">
  //         <span className="text-sm font-medium">
  //           Color:
  //           <span className="ml-1 font-semibold">
  //             {variants[variantActive].name}
  //           </span>
  //         </span>
  //       </label>
  //       <div className="flex mt-3">
  //         {variants.map((variant, index) => (
  //           <div
  //             key={index}
  //             onClick={() => setVariantActive(index)}
  //             className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
  //               variantActive === index
  //                 ? "border-primary-6000 dark:border-primary-500"
  //                 : "border-transparent"
  //             }`}
  //           >
  //             <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
  //               {variant.thumbnail && (
  //                 <Image
  //                   src={variant.thumbnail}
  //                   alt=""
  //                   className="absolute w-full h-full object-cover"
  //                   width={1000}
  //                   height={1000}
  //                 />
  //               )}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const renderCarat = () => {
    if (!carat || !carat.length || !product.productVariants) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              Carat:
              <span className="ml-1 font-semibold">{caratSelected}</span>
            </span>
          </label>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {carat
            .map((carat, index) => {
              if (!carat) return;
              const isActive = carat === caratSelected;
              return (
                <div
                  key={index}
                  className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-xs  sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer
                 ${
                   isActive
                     ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                     : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                 }`}
                  onClick={() => {
                    setCaratSelected(carat);
                  }}
                >
                  {carat}
                </div>
              );
            })
            .filter((html) => !!html)}
        </div>
      </div>
    );
  };
  const renderMetalType = () => {
    console.log(product);
    if (!metalTypes || !metalTypes.length || !product.productVariants) {
      return null;
    }
    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span>
              Metal Type:
              <span className="ml-1 font-semibold">{metalTypeSelected}</span>
            </span>
          </label>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
          {metalTypes
            ?.map((metal, index) => {
              if (!metal) return;
              const isActive = metal === metalTypeSelected;
              return (
                <div
                  key={index}
                  className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 cursor-pointer ${
                  isActive
                    ? "bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000"
                    : "border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                }`}
                  onClick={() => {
                    setMetalTypeSelected(metal);
                  }}
                >
                  {metal}
                </div>
              );
            })
            .filter((html) => !!html)}
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    } else if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    } else if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    } else if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    } else {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {product?.name}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={112}
            />

            <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">??</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">??</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span className="ml-1 leading-none">{status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {/* <div className="">{renderVariants()}</div> */}
        {/* {product.type === "JEWLERY" || ( */}
        <div className="">{renderMetalType()}</div>
        <div className="">{renderCarat()}</div>
        {/* )} */}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
          {/* <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div> */}
          <ButtonPrimary
            className="flex-1 flex-shrink-0"
            onClick={notifyAddTocart}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>

        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        {product.accordionInfo && (
          <AccordionInfo data={product.accordionInfo} />
        )}

        {/* ---------- 6 ----------  */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          {product.details}
          {/*  <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul> */}
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 ?? 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you???re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it???s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      {/* MAIn */}
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="w-full lg:w-[55%] ">
            {/* HEADING */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <Image
                  src={product.image}
                  className="w-full rounded-2xl object-cover"
                  alt="product detail 1"
                  width={1000}
                  height={1000}
                />
              </div>
              {renderStatus()}
              {/* META FAVORITES */}
              <LikeButton className="absolute right-3 top-3 " />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {[...(product.variantImages || [])]
                .slice(0, 2)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16"
                    >
                      <Image
                        src={item}
                        className="w-full rounded-2xl object-cover "
                        alt="product detail 1"
                        width={700}
                        height={700}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">
            <Policy />
          </div>

          {renderDetailSection()}

          <hr className="border-slate-200 dark:border-slate-700" />

          {/* {renderReviews()} */}

          {/* <hr className="border-slate-200 dark:border-slate-700" /> */}

          {/* OTHER SECTION */}
          {product.relatedProducts && (
            <SectionSliderProductCard
              heading="Related Products"
              subHeading=""
              headingFontClassName="text-2xl font-semibold"
              headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
              data={product.relatedProducts}
            />
          )}

          {/* SECTION */}
          {/* <div className="pb-20 xl:pb-28 lg:pt-14">
            <SectionPromo2 />
          </div> */}
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
