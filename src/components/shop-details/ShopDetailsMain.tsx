"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ProductType } from "@/types/product/product.type";
import { formatProductTitle } from "@/utils";

interface ShopDetailsMainProps {
  product: ProductType;
}

const ShopDetailsMain = ({ product }: ShopDetailsMainProps) => {
  const router = useRouter();
  const stockMap = useSelector((state: any) => state?.webStock || {});
  const stockFromState = stockMap?.[product?._id];
  const currentStock =
    (typeof stockFromState?.currentStock === "number"
      ? stockFromState.currentStock
      : product?.currentStock) ?? 0;
  const minStock =
    (typeof stockFromState?.minStock === "number"
      ? stockFromState.minStock
      : product?.minStock) ?? 0;
  const isAvailable = currentStock > minStock;
  const origin = product.sku?.trim();
  const categoryLabel =
    product.categoryName && !/^\d+$/.test(product.categoryName.trim())
      ? product.categoryName
      : undefined;
  const displayStock = Math.max(0, currentStock);
  const price = typeof product.price === "number" ? product.price : 0;
  const formattedPrice = price.toFixed(2);

  return (
    <section className="bd__shop-details-area">
      <div className="container small-container">
        <div className="bd__shop-details-inner">
          {/* Back Button */}
          <div>
            <button
              type="button"
              className="shop-details__back"
              onClick={() => router.back()}
            >
              <i className="fa-regular fa-angle-left" aria-hidden="true"></i>
              <span>Back</span>
            </button>
          </div>

          {/* Product Card */}
          <div className="row g-0">
            {/* Product Image */}
            <div className="col-lg-6">
              <div className="product-details__thumb-inner">
                {product.imageURLs?.[0] ? (
                  <div className="bd-product__details-large-img">
                    <Image
                      src={product.imageURLs[0]}
                      alt={formatProductTitle(product.title)}
                      priority
                      width={500}
                      height={500}
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <div className="bd-product__details-large-img">
                    <Image
                      src="/assets/img/icon/image-x-generic.svg"
                      alt="No image"
                      width={200}
                      height={200}
                      style={{ opacity: 0.3 }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="shop-details-info">
                {/* Title */}
                <h1 className="shop-details__title">
                  {formatProductTitle(product.title)}
                </h1>

                {/* Price */}
                <div className="bd-product__price">
                  <span className="bd-product__new-price">${formattedPrice}</span>
                </div>

                {/* Meta Info */}
                <div className="bd-product__meta">
                  {origin && (
                    <div className="bd-product__meta-row">
                      <span className="bd-product__meta-label">Origin:</span>
                      <span className="bd-product__meta-value">{origin}</span>
                    </div>
                  )}
                  {categoryLabel && (
                    <div className="bd-product__meta-row">
                      <span className="bd-product__meta-label">Category:</span>
                      <span className="bd-product__meta-value">{categoryLabel}</span>
                    </div>
                  )}
                  <div className="bd-product__availability">
                    {isAvailable ? (
                      <>
                        <span className="bd-product__availability-label">
                          In stock ·
                        </span>
                        <span className="bd-product__stock-count">
                          {displayStock} units
                        </span>
                      </>
                    ) : (
                      <span className="bd-product__availability-label out-of-stock">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {product.productDescription && (
                  <div className="bd-product__description">
                    <p>{product.productDescription}</p>
                  </div>
                )}

                {/* Unavailable Notice */}
                {!isAvailable && (
                  <div className="product-quantity-cart">
                    <span className="text-danger">
                      Currently unavailable for purchase
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopDetailsMain;
