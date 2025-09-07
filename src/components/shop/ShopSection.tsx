"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/elements/product";
import GridViewProduct from "./GridViewProduct";
import { ShopSharedProps } from "./types/shop.type";
 

const ShopSection = ({
  products,
  totalPages,
  currentPage,
  search,
  limit,
  categoryId,
  omitCategoryIdQuery,
}: ShopSharedProps) => {
  const router = useRouter();


  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("limit", limit.toString());
    if (!omitCategoryIdQuery && categoryId) {
      params.set("categoryId", categoryId.toString());
    }
    if (search) {
      params.set("search", search);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="bd-shop__area pt-45 pb-85">
      <div className="container">
        <div className="bd-shop__grid">
          <div className="bd-shop__grid-full">
            <div className="bd-shop__wrapper">
              {products && products.length > 0 ? (
                <div className="bd-trending__item-wrapper">
                  <div className="bd-shop__products">
                    <GridViewProduct products={products} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p>
                    No products found. Please try a different category or
                    filter.
                  </p>
                </div>
              )}
            </div>

            {products?.length > 0 && totalPages > 1 && (
              <div className="bd-shop__pagination">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setPage={handlePageChange}
                  Pagination_space=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <ProductModal /> */}
    </section>
  );
};

export default ShopSection;
