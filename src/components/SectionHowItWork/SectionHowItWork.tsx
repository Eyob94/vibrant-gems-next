import React, { FC } from "react";
import NcImage from "../../shared/NcImage/NcImage";
import Badge from "../../shared/Badge/Badge";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: "images/HIW1img.png",
    imgDark: "images/HIW1img.png",
    title: "Filter & Discover",
    desc: "Smart filtering and suggestions make it easy to find",
  },
  {
    id: 2,
    img: "images/HIW2img.png",
    imgDark: "images/HIW2img.png",
    title: "Add to bag",
    desc: "Easily select the correct items and add them to the cart",
  },
  {
    id: 3,
    img: "images/HIW3img.png",
    imgDark: "images/HIW3img.png",
    title: "Fast shipping",
    desc: "The carrier will confirm and ship quickly to you",
  },
  {
    id: 4,
    img: "images/HIW4img.png",
    imgDark: "images/HIW4img.png",
    title: "Enjoy the product",
    desc: "Have fun and enjoy your 5-star quality products",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 top-5"
          src={"images/VectorHIW.svg"}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
