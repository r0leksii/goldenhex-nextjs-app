"use client";
// import useGlobalContext from "@/hooks/use-context";
// import ShopPreloader from "@/preloaders/ShopPreloader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { ProductType } from "@/types/product/product.type";
import { createSlug, formatProductTitle } from "@/utils";
import { useDispatch } from "react-redux";
import { upsertStocks } from "@/redux/slices/webStockSlice";

interface GridViewProductProps {
  products: ProductType[];
}

const GridViewProduct = ({ products }: GridViewProductProps) => {
  // const { openModal, setOpenModal, setModalId, prodcutLoadding } =
  //   useGlobalContext();

  // No need to slice products here as pagination is handled by the API
  // const displayProducts = Array.isArray(products) ? products : [];

  const dispatch = useDispatch();
  useEffect(() => {
    if (!Array.isArray(products)) return;
    const map: Record<string, { currentStock: number; minStock: number }> = {};
    for (const p of products) {
      if (!p?._id) continue;
      map[p._id] = {
        currentStock: p.currentStock ?? 0,
        minStock: p.minStock ?? 0,
      };
    }
    if (Object.keys(map).length > 0) {
      dispatch(upsertStocks(map));
    }
  }, [dispatch, products]);

  // const handleMoldalData = (id: string) => {
  //   // First set the ID
  //   setModalId(id);
  //   // Then set openModal to true
  //   setOpenModal(true);
  // };

  // const handleAddToCart = (product: any) => {
  //   dispatch(cart_product(product));
  // };

  // const handleAddToWishlist = (product: any) => {
  //   dispatch(wishlist_product(product));
  // };

  // Helper function to get image URL safely
  const getImageUrl = (product: ProductType): string => {
    if (product.img) {
      return product.img || "";
    } else if (product.imageURLs && product.imageURLs.length > 0) {
      return product.imageURLs[0] || "";
    }
    return "/assets/img/icon/image-x-generic.svg";
  };

  // Helper function to get product description
  const getDescription = (product: ProductType): string => {
    return product.description || "";
  };

  // Helper function to safely get price
  const getPrice = (product: any): number => {
    // Just use the price property since it contains the SalePrice value from the API
    if (product.price !== undefined && product.price !== null) {
      return product.price;
    }
    return 0;
  };

  const getStock = (product: ProductType): number => {
    return product.currentStock ?? 0;
  };

  const getProductDescription = (product: any): string => {
    return product.productDescription;
  };

  const availableProducts = Array.isArray(products)
    ? products.filter(
        (item) => (item.currentStock ?? 0) > (item.minStock ?? 0)
      )
    : [];

  if (!availableProducts.length) {
    return <div>No products to display</div>;
  }

  return (
    <>
      {availableProducts.map((item) => {
        // Debug the first item to see what's available
        const price = getPrice(item);
        const slug = createSlug(formatProductTitle(item.title));
        const href = `/product/${slug}-${item._id}`;
        const description = getDescription(item);
        const stock = getStock(item);
        const isAvailable = (item.currentStock ?? 0) > (item.minStock ?? 0);

        return (
          <div className="bd-shop__product" key={item._id}>
            <div className="bd-trending__item text-center mb-30 position-relative">
              <div className="bd-trending__product-thumb border-5">
                <Link href={href} className="ratio ratio-1x1 d-block">
                  <Image
                    src={getImageUrl(item)}
                    alt={
                      formatProductTitle(item?.title || "") || "Product image"
                    }
                    width={500}
                    height={500}
                    className="object-fit-contain"
                    priority
                  />
                </Link>
              </div>
              <div className="bd-teanding__content">
                <h4 className="bd-product__title">
                  <Link href={href}>
                    {formatProductTitle(item?.title || "") || "Unnamed Product"}
                  </Link>
                </h4>
                <div className="bd-product__price">
                  <span className="bd-product__new-price">
                    ${price.toFixed(2)}
                  </span>
                </div>
                <div className="bd-product__description">
                  <p>From: {getProductDescription(item)}</p>
                </div>
                {/* {getDescription(item) && (
                        <div className="bd-product__description">
                          <p>
                            {getDescription(item).substring(0, 60)}
                            {getDescription(item).length > 60 ? "..." : ""}
                          </p>
                        </div>
                      )} */}
                <div className="bd-product__availability">
                  {isAvailable ? (
                    <>
                      <span>In Stock</span>
                      <span className="bd-product__stock-count">
                        {item.currentStock ?? 0} items available
                      </span>
                    </>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default GridViewProduct;
