"use client";
import React, { useState, useEffect } from "react";
import ShopSidebarCategories from "./ShopSidebarCategories";
import Pagination from "../elements/product/Pagination";
import GridViewProduct from "./GridViewProduct";
import useGlobalContext from "@/hooks/use-context";
import ProductModal from "./ProductModal";
import PaginationTwo from "../elements/product/PaginationTwo";
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

const ShopSection = () => {
  const {
    products,
    setProducts,
    setotalPages,
    totalPages,
    setcurrentPage,
    currentPage,
    limit,
    page,
    setPage,
    setProdcutLoadding,
  } = useGlobalContext();
  const [apiEndPoint, setapiEndPoint] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProdcutLoadding(true);
    setIsLoading(true);

    // Fetch data from our server-side API route
    fetch(
      `/api/shop/products?page=${page}&limit=${limit}&endpoint=${apiEndPoint}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          // Only include the fields we need, avoiding spreading the entire object
          const formattedProducts = data.products.map(
            (product: any): ProductType => ({
              _id: product._id || product.Id?.toString() || "",
              categoryName: product.categoryName || product.CategoryName || "",
              price: product.price || product.Price || 0,
              img: product.img || product.ImageUrl || "",
              title: product.title || product.Name || "",
              quantity: 1,

              tags: product.tags || product.Tags || [],
              imageURLs: product.imageURLs || [product.ImageUrl || ""],
              description: product.description || product.Description || "",
              isAvailable: product.isAvailable || product.IsAvailable || false,
              currentStock:
                product.currentStock || product.StockSummary?.CurrentStock || 0,
            })
          );

          setProducts(formattedProducts);
          setotalPages(data.totalPages || 1);
          setcurrentPage(data.currentPage || 1);
        } else {
          setProducts([]);
          setotalPages(1);
          setcurrentPage(1);
        }
        setProdcutLoadding(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setProdcutLoadding(false);
        setIsLoading(false);
      });
  }, [
    page,
    limit,
    apiEndPoint,
    setProducts,
    setotalPages,
    setcurrentPage,
    setProdcutLoadding,
  ]);

  return (
    <>
      <section className="bd-shop__area pt-45 pb-85">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12 col-xl-8 col-lg-8">
              <div className="row">
                <div className="col-xl-12">
                  <div className="bd-shop__wrapper">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        {isLoading ? (
                          <div className="text-center py-5">
                            <p>Loading products...</p>
                          </div>
                        ) : products && products.length > 0 ? (
                          <div className="bd-trending__item-wrapper">
                            <div className="row">
                              <GridViewProduct
                                products={products as any}
                                limit={limit}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-5">
                            <p>
                              No products found. Please try a different category
                              or filter.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {products?.length >= limit ? (
                <div className="row justify-content-center">
                  <div className="col-xxl-12">
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setPage={setPage}
                      Pagination_space="d-flex justify-content-center mt-40  mb-45"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="row justify-content-center">
                    <div className="col-xxl-12">
                      <PaginationTwo
                        totalPages={1}
                        currentPage={1}
                        setPage={setPage}
                        Pagination_space="d-flex justify-content-center mt-40  mb-45"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <ProductModal />
    </>
  );
};

export default ShopSection;
