"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Pagination from "../elements/product/Pagination";
import GridViewProduct from "./GridViewProduct";
import ProductModal from "./ProductModal";
import { getProducts } from "@/lib/actions";

export interface ProductType {
  _id: string;
  categoryName: string;
  price: number;
  img: string;
  title: string;
  quantity: number;
  tags: string[];
  imageURLs: string[];
  description?: string;
  isAvailable?: boolean;
  currentStock?: number;
}

interface ShopSectionProps {
  initialData: {
    products: ProductType[];
    totalPages: number;
    currentPage: number;
  };
}

const ShopSection = ({ initialData }: ShopSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialPage =
    Number(searchParams.get("page")) || initialData?.currentPage || 1;
  const [products, setProducts] = useState(initialData?.products || []);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages || 1);

  const fetchProducts = async (page: number) => {
    const data = await getProducts(page);
    const validProducts = data.products.filter(Boolean) as ProductType[];
    setProducts(validProducts);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
  };

  const handlePageChange = async (newPage: number) => {
    try {
      await fetchProducts(newPage);

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`/?${params.toString()}`);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
                    <GridViewProduct products={products} limit={12} />
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

            {products?.length > 0 && (
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
