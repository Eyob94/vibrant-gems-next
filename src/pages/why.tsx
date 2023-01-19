import { link } from "fs/promises";
import React, { useState } from "react";
import Content from "../components/why/Content";

const links = [
  {
    id: 0,
    link: "100% Money back guarantee",
  },
  {
    id: 1,
    link: "24/7 Customer service",
  },
  {
    id: 2,
    link: "Encrypted Payment options",
  },
  {
    id: 3,
    link: "Free Worldwide Shipping",
  },
  {
    id: 4,
    link: "Standardized Gemstone Grading",
  },
  {
    id: 5,
    link: "360∘ 4K Gemstone Display",
  },
  {
    id: 6,
    link: "Our Packaging",
  },
  {
    id: 7,
    link: "Price Matching",
  },
  {
    id: 8,
    link: "Gemstone certification services",
  },
  {
    id: 9,
    link: "Virtual aapointment",
  },
  {
    id: 10,
    link: "Track your order",
  },
  {
    id: 11,
    link: "FAQs",
  },
  {
    id: 12,
    link: "Policies",
    subLinks: [
      {
        id: 12.1,
        link: "Privacy Policy",
      },
      {
        id: 12.2,
        link: "Return Policy",
      },
      {
        id: 12.3,
        link: "Terms and Conditions",
      },
    ],
  },
  {
    id: 13,
    link: "Accessibility",
  },
];

const Why = () => {
  const [selectedLink, setSelectedLink] = useState<number>(0);
  const [selectedSubLink, setSelectedSubLink] = useState<number>(0.1);

  return (
    <div className="flex justify-center w-full">
      <div className="relative flex justify-center w-full pt-48 pb-20 max-w-screen-2xl">
        <div className="top-0 h-full pb-40 w-96">
          <div className="sticky flex flex-col border-r-2 top-72 ">
            {links.map(
              (link: { id: number; link: string; subLinks?: any[] }, idx) => {
                return (
                  <div
                    onClick={() => setSelectedLink(link.id)}
                    key={idx}
                    className={`${
                      selectedLink === link.id
                        ? "text-purple-500 font-semibold"
                        : ""
                    } flex justify-end w-full cursor-pointer`}
                  >
                    <div
                      className={` ${
                        selectedLink === link.id ? "" : "hover:text-violet-500"
                      } flex-col flex w-80  justify-center items-start transition-all duration-150 ${
                        selectedLink === link.id && link.subLinks
                          ? "h-44 text-purple-300"
                          : "h-12"
                      } mb-4`}
                    >
                      {link.link}

                      <div
                        className={`flex flex-col pl-4 mt-4 ${
                          link.subLinks && selectedLink == link.id
                            ? "h-48"
                            : "h-0 opacity-0"
                        } font-normal w-full transition-all duration-300 overflow-hidden relative text-neutral-800`}
                      >
                        {link?.subLinks?.map((subLink: any) => {
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedSubLink(subLink.id % 1)}
                              className="mb-6"
                            >
                              <div
                                className={`${
                                  selectedLink + selectedSubLink ===
                                    subLink.id &&
                                  "text-purple-600 border-r-2 border-purple-600 right-0 font-semibold"
                                } flex items-center justify-start w-full h-6`}
                              >
                                {subLink.link}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
            <div
              style={{
                top: (selectedLink / links.length) * 100 + "%",
              }}
              className={`${
                links[selectedLink].subLinks
                  ? "bg-transparent"
                  : "bg-purple-400"
              } transition-all duration-200 absolute w-1 h-12 rounded-full -right-[3px]`}
            ></div>
          </div>
        </div>
        <div className="w-full">
          <div>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
