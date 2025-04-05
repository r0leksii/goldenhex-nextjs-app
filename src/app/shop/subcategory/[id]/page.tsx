"use client";

export const runtime = "edge";
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import ShopSectionSubCategoryWise from "@/components/shop/subcategory-product/ShopSectionSubCategoryWise";
import React from "react";

const SubCategoryWizeProductPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <Breadcrumb breadHome="Home" breadMenu="Shop" />
      <ShopSectionSubCategoryWise id={id} />
    </>
  );
};

export default SubCategoryWizeProductPage;
