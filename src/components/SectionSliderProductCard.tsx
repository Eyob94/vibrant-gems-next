import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import Glide from "@glidejs/glide";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "../data/data";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (!sliderRef.current) {
      return () => {};
    }

    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [sliderRef, UNIQUE_CLASS]);

  const fetchProducts = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/products?populate[0]=category&populate[1]=image&filters[status][$eq]=New In`
    );
    const json = await res.json();
    const s = json.data.map(({ attributes }: any) => ({
      id: attributes.id,
      name: attributes.name,
      price: attributes.price,
      image: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${attributes.image.data.attributes.formats.thumbnail.url}`,
      description: attributes.description,
      category: attributes.category.data.attributes.name,
      tags: attributes.name,
      link: attributes.name,
      status: attributes.name,
    }));
    setProducts(s);
    console.log(s, "here");
  };
  useEffect(() => {
    (async function () {
      await fetchProducts();
      console.log(products);
    })();
  }, []);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products &&
              products.map((item, index) => (
                <li key={index} className={`glide__slide ${itemClassName}`}>
                  <ProductCard data={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
