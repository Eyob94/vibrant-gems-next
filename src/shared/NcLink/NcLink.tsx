import Link, { LinkProps } from "next/link";
import React, { FC, PropsWithChildren } from "react";

export interface NcLinkProps extends LinkProps {
  className?: string;
  colorClass?: string;
}

const NcLink: FC<PropsWithChildren<NcLinkProps>> = ({
  className = "font-medium",
  colorClass = "text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000",
  children,
  ...args
}) => {
  return (
    <Link
      className={`nc-NcLink ${colorClass} ${className}`}
      data-nc-id="NcLink"
      {...(args as any)}
    >
      {children}
    </Link>
  );
};

export default NcLink;
