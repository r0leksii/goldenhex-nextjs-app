import React from "react";
import ShopSection from "./ShopSection";
import { ProductType } from "@/types/product/product.type";

interface ShopMainProps {
  initialData: {
    products: ProductType[];
    totalPages: number;
    currentPage: number;
  };
}

const ShopMain = ({ initialData }: ShopMainProps) => {
  return (
    <>
      <ShopSection initialData={initialData} />
    </>
  );
};

export default ShopMain;
