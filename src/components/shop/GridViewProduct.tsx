"use client";
import useGlobalContext from "@/hooks/use-context";
import ShopPreloader from "@/preloaders/ShopPreloader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { cart_product } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import { ProductType } from "./ShopSection";

interface GridViewProductProps {
  products: ProductType[];
  limit?: number;
}

const GridViewProduct: React.FC<GridViewProductProps> = ({
  products,
  limit,
}) => {
  const { openModal, setOpenModal, setModalId, prodcutLoadding } =
    useGlobalContext();
  const dispatch = useDispatch();

  // No need to slice products here as pagination is handled by the API
  const displayProducts = Array.isArray(products) ? products : [];

  const handleMoldalData = (id: string) => {
    setOpenModal(!openModal);
    setModalId(id);
  };

  const handleAddToCart = (product: ProductType) => {
    dispatch(cart_product(product));
  };

  const handleAddToWishlist = (product: ProductType) => {
    dispatch(wishlist_product(product));
  };

  // Helper function to get image URL safely
  const getImageUrl = (product: ProductType): string => {
    if (product.img) {
      return product.img;
    } else if (product.imageURLs && product.imageURLs.length > 0) {
      return product.imageURLs[0];
    }
    return "/assets/img/icon/image-x-generic.svg";
  };

  // Helper function to get product description
  const getDescription = (product: ProductType): string => {
    return product.description || "";
  };

  // Helper function to calculate discount percentage
  const calculateDiscount = (
    oldPrice: number,
    currentPrice: number
  ): number => {
    if (!oldPrice || !currentPrice || oldPrice <= currentPrice) {
      return 0;
    }

    const discountAmount = oldPrice - currentPrice;
    const discountPercentage = (discountAmount / oldPrice) * 100;
    return Math.round(discountPercentage);
  };

  // Helper function to safely get price
  const getPrice = (product: any): number => {
    // Just use the price property since it contains the SalePrice value from the API
    if (product.price !== undefined && product.price !== null) {
      return product.price;
    }
    return 0;
  };

  // Helper function to safely get old price
  const getOldPrice = (product: any): number => {
    // Just use the oldPrice property since it contains the RrPrice value from the API
    if (product.oldPrice !== undefined && product.oldPrice !== null) {
      return product.oldPrice;
    }
    return 0;
  };

  // Debug function to see what properties are available
  const debugProduct = (product: any) => {
    console.log("Product properties:", Object.keys(product));
    console.log("SalePrice:", product.SalePrice);
    console.log("price:", product.price);
    console.log("RrPrice:", product.RrPrice);
    console.log("oldPrice:", product.oldPrice);
  };

  return (
    <>
      {prodcutLoadding ? (
        <ShopPreloader end={8} />
      ) : (
        <div className="row">
          {displayProducts.length > 0 ? (
            displayProducts.map((item, index) => {
              // Debug the first item to see what's available
              if (index === 0) {
                debugProduct(item);
              }

              const price = getPrice(item);
              const oldPrice = getOldPrice(item);
              const discount = calculateDiscount(oldPrice, price);

              return (
                <div
                  className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="bd-trending__item text-center mb-30 position-relative">
                    <div className="bd-trending__product-thumb border-5">
                      <Link href={`/shop-details/${item?._id}`}>
                        <Image
                          src={getImageUrl(item)}
                          alt={item?.title || "Product image"}
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
                          onClick={() => handleMoldalData(item._id)}
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
                        <Link href={`/shop-details/${item?._id}`}>
                          {item?.title || "Unnamed Product"}
                        </Link>
                      </h4>
                      <div className="bd-product__price">
                        {discount > 0 && (
                          <span className="bd-product__old-price">
                            ${oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="bd-product__new-price">
                          ${price.toFixed(2)}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="bd-product__discount">
                          <span className="bd-product__discount-tag">
                            {discount}% OFF
                          </span>
                        </div>
                      )}
                      {getDescription(item) && (
                        <div className="bd-product__description">
                          <p>
                            {getDescription(item).substring(0, 60)}
                            {getDescription(item).length > 60 ? "..." : ""}
                          </p>
                        </div>
                      )}
                      {!item.isAvailable && (
                        <div className="bd-product__availability">
                          <span className="out-of-stock">Out of Stock</span>
                        </div>
                      )}
                      <div className="bd-product__icon">
                        {/* Rating component can be added here if needed */}
                      </div>
                    </div>
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
