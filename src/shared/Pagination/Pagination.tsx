import { CustomLink } from "../../data/types";
import React, { FC, MouseEventHandler, useState } from "react";
import Link from "next/link";
import twFocusClass from "../../utils/twFocusClass";

interface PaginationProps {
  className?: string;
  length: number;
  take: number;
  handleClick: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  length,
  take,
  handleClick: handlePaginate,
}) => {
  const [activePage, setActivePage] = useState(1);

  const handleClick = (value: number) => {
    handlePaginate(value);
    setActivePage(value);
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {Array.from({ length: Math.ceil(length / take) }, (_, idx) => ++idx).map(
        (label, idx) =>
          label === activePage ? (
            <span
              key={idx}
              onClick={() => handleClick(label)}
              className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
            >
              {label}
            </span>
          ) : (
            <span
              key={idx}
              onClick={() => handleClick(label)}
              className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
            >
              {label}
            </span>
          )
      )}
    </nav>
  );
};

export default Pagination;
