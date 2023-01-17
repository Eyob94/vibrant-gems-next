import React from "react";
import HeaderLogged from "../components/Header/HeaderLogged";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";

const SiteHeader = () => {
  let router = useRouter();

  return <HeaderLogged />;
};

export default SiteHeader;
