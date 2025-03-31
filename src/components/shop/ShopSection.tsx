"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/elements/product";
import { GridViewProduct, ProductModal } from "@/components/shop";
import { ShopSharedProps } from "./types/shop.type";

const ShopSection = ({
  products,
  totalPages,
  currentPage,
  categoryId,
  search,
  limit,
}: ShopSharedProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage: number) => {
    router.push(
      `?page=${newPage}&limit=${limit}&categoryId=${categoryId}&search=${search}`
    );
  };

  return (
    <section className="bd-shop__area pt-45 pb-85">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="bd-shop__wrapper">
              {loading ? (
                <div className="text-center py-5">
                  <p>Loading products...</p>
                </div>
              ) : products && products.length > 0 ? (
                <div className="bd-trending__item-wrapper">
                  <div className="row">
                    <GridViewProduct products={products} limit={limit} />
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

            {!loading && products?.length > 0 && totalPages > 1 && (
              <div className="row justify-content-center">
                <div className="col-xxl-12">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setPage={handlePageChange}
                    Pagination_space="d-flex justify-content-center mt-40 mb-45"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductModal />
    </section>
  );
};

export default ShopSection;
