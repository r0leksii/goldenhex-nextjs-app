export const runtime = "edge";

import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import ShopSectionCategoryWize from "@/components/shop/categoryWizeShop/ShopSectionCategoryWize";
import React from "react";

const ShopPageCategoryWize = ({ params }: { params: { category: string } }) => {
  const category = params.category;
  return (
    <>
      {/* <Breadcrumb breadHome="Home" breadMenu="Shop"/> */}
      <ShopSectionCategoryWize category={category} />
    </>
  );
};

export default ShopPageCategoryWize;
