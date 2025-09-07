"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@/components/elements/product";
import GridViewProduct from "./GridViewProduct";
import { ShopSharedProps } from "./types/shop.type";
import { useEffect } from "react";

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

  // Debug: log ShopSection props in the browser console
  useEffect(() => {
    try {
      console.log("[ShopSection] props", {
        productsLength: products?.length ?? 0,
        totalPages,
        currentPage,
        search,
        limit,
        categoryId,
        omitCategoryIdQuery,
      });
      if (Array.isArray(products) && products.length > 0) {
        const p = products[0];
        console.log("[ShopSection] first product sample", {
          _id: p?._id,
          title: p?.title,
          price: p?.price,
          isAvailable: p?.isAvailable,
        });
      }
    } catch (err) {
      console.error("[ShopSection] logging error", err);
    }
  }, [products, totalPages, currentPage, search, limit, categoryId, omitCategoryIdQuery]);

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
        <div className="row">
          <div className="col-xxl-12">
            <div className="bd-shop__wrapper">
              {products && products.length > 0 ? (
                <div className="bd-trending__item-wrapper">
                  <div className="row">
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
      {/* <ProductModal /> */}
    </section>
  );
};

export default ShopSection;
