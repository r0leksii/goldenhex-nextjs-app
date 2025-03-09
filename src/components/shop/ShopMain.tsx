import React from "react";
import ShopSection, { ProductType } from "./ShopSection";

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
