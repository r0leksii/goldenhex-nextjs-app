import ShopSection from "./ShopSection";
import { ShopSharedProps } from "./types/shop.type";

const ShopMain = ({
  products,
  totalPages,
  currentPage,
  page,
  categoryId,
  search,
  limit,
}: ShopSharedProps) => {
  return (
    <>
      <ShopSection
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        page={page}
        categoryId={categoryId}
        search={search}
        limit={limit}
      />
    </>
  );
};

export default ShopMain;
