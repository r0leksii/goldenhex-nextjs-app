"use client";
import React, { useState, useEffect } from "react";
import ShopSidebarCategories from "./ShopSidebarCategories";
import FlashBanner from "../elements/product/FlashBanner";
import GridIcon from "@/svg/GridIcon";
import ListIcon from "@/svg/ListIcon";
import Pagination from "../elements/product/Pagination";
import GridViewProduct from "./GridViewProduct";
import ListViewProduct from "./ListViewProduct";
import useGlobalContext from "@/hooks/use-context";
import ShopSidebarRetting from "./ShopSidebarRetting";
import ProductModal from "./ProductModal";
import NiceSelect from "../common/NiceSelect";
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

  const menuData = [
    {
      id: 1,
      text: "New Arrival",
      api: "new-arrival",
    },
    {
      id: 2,
      text: "Best Sale",
      api: "best-selling-products",
    },
    {
      id: 3,
      text: "Trending",
      api: "trending-products",
    },
    {
      id: 4,
      text: "Offers",
      api: "offer-products",
    },
  ];

  useEffect(() => {
    setProdcutLoadding(true);
    setIsLoading(true);

    // Fetch data from our server-side API route
    fetch(`/api/shop?page=${page}&limit=${limit}&endpoint=${apiEndPoint}`)
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

  const handleFilterChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.api) {
      setapiEndPoint(selectedOption.api);
      setPage(1); // Reset to first page when changing filters
    }
  };

  return (
    <>
      <section className="bd-shop__area pt-115 pb-85">
        <div className="container">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 col-lg-4">
              <div className="bd-sidebar__widget-warpper mb-60">
                <div className="bd-product__filters">
                  <ShopSidebarCategories />
                  <ShopSidebarRetting />
                  <FlashBanner />
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8 col-lg-8">
              <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-8">
                  <div className="bd-filter__tab-inner mb-30">
                    <div className="bd-top__filter">
                      <div className="bd-Product__tab pl-5">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home"
                              type="button"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                            >
                              <GridIcon />
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="shop-filter-bar"
                              data-bs-toggle="tab"
                              data-bs-target="#profile"
                              type="button"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="false"
                            >
                              <ListIcon />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bd-sort__type-filter">
                      <NiceSelect
                        options={menuData}
                        defaultCurrent={0}
                        onChange={handleFilterChange}
                        name="sorting-list"
                        setapiEndPoint={setapiEndPoint}
                        className="sorting-list"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
