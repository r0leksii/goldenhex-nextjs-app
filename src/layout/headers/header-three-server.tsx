import React from "react";
import HeaderThree from "./header-three";
import { getCategories } from "@/lib/actions/category.actions";

const HeaderThreeServer = async () => {
  const categories = await getCategories();
  return <HeaderThree categories={categories} />;
};

export default HeaderThreeServer;
