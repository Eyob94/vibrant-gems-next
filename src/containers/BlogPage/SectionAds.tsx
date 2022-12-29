import Link from "next/link";
import React, { FC } from "react";
import NcImage from "../../shared/NcImage/NcImage";

export interface SectionAdsProps {
  className?: string;
}

const SectionAds: FC<SectionAdsProps> = ({ className = "" }) => {
  return (
    <Link href="/#" className={`nc-SectionAds block w-full ${className}`}>
      <NcImage className="w-full" src="images/ads.png" />
    </Link>
  );
};

export default SectionAds;
