"use client";
import useGlobalContext from "@/hooks/use-context";
import { components } from "@/types/schema.type";
import ShopPreloader from "@/preloaders/ShopPreloader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { cart_product } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";

// Define CartProductType based on WebProduct schema
type CartProductType = components["schemas"]["WebProduct"];

interface GridViewProductProps {
  products: CartProductType[];
  limit?: number;
}

const GridViewProduct: React.FC<GridViewProductProps> = ({
  products,
  limit,
}) => {
  const { openModal, setOpenModal, setModalId, prodcutLoadding } =
    useGlobalContext();
  const dispatch = useDispatch();

  // Ensure products is an array and handle slicing safely
  const displayProducts = Array.isArray(products)
    ? products.slice(0, limit || products.length)
    : [];

  const handleMoldalData = (id: string) => {
    setOpenModal(!openModal);
    setModalId(id);
  };

  const handleAddToCart = (product: CartProductType) => {
    dispatch(cart_product(product));
  };

  const handleAddToWishlist = (product: CartProductType) => {
    dispatch(wishlist_product(product));
  };

  return (
    <>
      {prodcutLoadding ? (
        <ShopPreloader end={8} />
      ) : (
        <div className="row">
          {displayProducts.length > 0 ? (
            displayProducts.map((item, index) => {
              return (
                <div
                  className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="bd-trending__item text-center mb-30 position-relative">
                    <div className="bd-trending__product-thumb border-5">
                      <Link href={`/shop-details/${item?.Id}`}>
                        <Image
                          src={
                            item?.ProductImages?.[0]?.ImageUrl ||
                            "/images/placeholder.jpg"
                          }
                          alt="product-img"
                          width={500}
                          height={500}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                      <div className="bd-product__action">
                        <span
                          className="cart-btn"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Quick Shop"
                          onClick={() => handleAddToCart(item)}
                        >
                          <i className="fal fa-cart-arrow-down"></i>
                        </span>
                        <span
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Quick View"
                          data-bs-toggle="modal"
                          data-bs-target="#productmodal"
                          onClick={() => handleMoldalData(item.Id!.toString())}
                        >
                          <i className="fal fa-eye"></i>
                        </span>
                        <span
                          className="wishlist-btn"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Quick Wishlist"
                          onClick={() => handleAddToWishlist(item)}
                        >
                          <i className="fal fa-heart"></i>
                        </span>
                      </div>
                    </div>
                    <div className="bd-teanding__content">
                      <h4 className="bd-product__title">
                        <Link href={`/shop-details/${item?.Id}`}>
                          {item?.Name}
                        </Link>
                      </h4>
                      <div className="bd-product__price">
                        <span className="bd-product__new-price">
                          $
                          {item?.SalePrice != null
                            ? item.SalePrice % 1 === 0
                              ? `${item.SalePrice}.00`
                              : item.SalePrice.toFixed(2)
                            : "0.00"}
                        </span>
                      </div>
                      <div className="bd-product__icon">
                        {/* Rating component can be added here if needed */}
                      </div>
                    </div>
                    {/* <div className="bd-product__tag">
                      {item?.StockSummary?.CurrentStock &&
                      item.StockSummary.CurrentStock > 0 ? (
                        <span className="tag-text theme-bg">In Stock</span>
                      ) : (
                        <span className="tag-text wraning-bg">Stock Out</span>
                      )}
                    </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <p className="text-center">No Products Found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GridViewProduct;
