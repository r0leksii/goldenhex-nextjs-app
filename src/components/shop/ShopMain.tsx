import ShopSection from "./ShopSection";
import { ShopSharedProps } from "./types/shop.type";

const ShopMain = ({
  products,
  totalPages,
  currentPage,
  page,
  search,
  limit,
  categoryId,
  omitCategoryIdQuery,
}: ShopSharedProps) => {
  return (
    <ShopSection
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      page={page}
      search={search}
      limit={limit}
      categoryId={categoryId}
      omitCategoryIdQuery={omitCategoryIdQuery}
    />
  );
};

export default ShopMain;
