import Glide from "@glidejs/glide";
import Heading from "../Heading/Heading";
import React, { FC, useId } from "react";
import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export interface SectionClientSayProps {
  className?: string;
}

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 3,
    clientName: "Berta Emili",
    content:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
];

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 1,
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <img
          className="absolute top-9 -left-20"
          src="/images/clientSay1.png"
          alt=""
        />
        <img
          className="absolute bottom-[100px] right-full mr-40"
          src="/images/clientSay2.png"
          alt=""
        />
        <img
          className="absolute top-full left-[140px]"
          src="/images/clientSay3.png"
          alt=""
        />
        <img
          className="absolute -bottom-10 right-[140px]"
          src="/images/clientSay4.png"
          alt=""
        />
        <img
          className="absolute left-full ml-32 bottom-[80px]"
          src="/images/clientSay5.png"
          alt=""
        />
        <img
          className="absolute -right-10 top-10 "
          src="/images/clientSay6.png"
          alt=""
        />
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative flow-root ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading desc="Let's see what people think of Ciseco" isCenter>
        Good news from far away 🥇
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}

        <img className="mx-auto" src="/images/clientSayMain.png" alt="" />
        <div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
          <img
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src="/images/quotation.png"
            alt=""
          />
          <img
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src="images/quotation2.png"
            alt=""
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="glide__slide flex flex-col items-center text-center"
                >
                  <span className="block text-2xl">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500">
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                    <StarIcon className="w-6 h-6" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
