"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import { ProductType } from "@/types/product/product.type";
import { formatProductTitle } from "@/utils";

interface ShopDetailsMainProps {
  product: ProductType;
}

const ShopDetailsMain = ({ product }: ShopDetailsMainProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const stockMap = useSelector((state: any) => state?.webStock || {});
  const stockFromState = stockMap?.[product?._id];
  const currentStock = (typeof stockFromState?.currentStock === "number" ? stockFromState.currentStock : product?.currentStock) ?? 0;
  const minStock = (typeof stockFromState?.minStock === "number" ? stockFromState.minStock : product?.minStock) ?? 0;
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
    <>
      {/* <Breadcrumb breadHome={"Home"} breadMenu={"Shop Details"} /> */}
      <section className="bd__shop-details-area pt-115 pb-75">
        <div className="container small-container">
          <div className="bd__shop-details-inner d-flex flex-column gap-3 gap-lg-4">
            <div className="d-flex align-items-center justify-content-start">
              <button
                type="button"
                className="shop-details__back d-inline-flex align-items-center gap-2"
                onClick={() => router.back()}
              >
                <i className="fa-regular fa-angle-left" aria-hidden="true"></i>{" "}
                <span className="fw-medium">Back</span>
              </button>
            </div>

            <div className="row g-4 align-items-start">
              <div className="col-md-6">
                <div className="product-details__thumb-inner">
                  {product.imageURLs?.[0] && (
                    <div className="bd-product__details-large-img">
                      <Image
                        src={product.imageURLs[0]}
                        alt={formatProductTitle(product.title)}
                        priority
                        width={577}
                        height={577}
                        style={{
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="modal-product-info shop-details-info">
                  <h1 className="mb-0 shop-details__title">
                    {formatProductTitle(product.title)}
                  </h1>

                  <div className="bd-product__price">
                    <span className="bd-product__new-price">${formattedPrice}</span>
                  </div>

                  <div className="bd-product__meta mb-20">
                    {origin && (
                      <div className="bd-product__meta-row">
                        <span className="bd-product__meta-label fw-bold">Origin:</span>{" "}
                        <span className="bd-product__meta-value">{origin}</span>
                      </div>
                    )}
                    {categoryLabel && (
                      <div className="bd-product__meta-row">
                        <span className="bd-product__meta-label fw-bold">Category:</span>{" "}
                        <span className="bd-product__meta-value">{categoryLabel}</span>
                      </div>
                    )}
                    <div className="bd-product__availability">
                      {isAvailable ? (
                        <>
                          <span className="bd-product__availability-label fw-bold">In stock ·</span>{" "}
                          <span className="bd-product__stock-count">
                            {displayStock} units
                          </span>
                        </>
                      ) : (
                        <span className="bd-product__availability-label out-of-stock text-danger fw-bold">
                          This Product Is Out Of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {product.productDescription && (
                    <div className="bd-product__description">
                      <p>{product.productDescription}</p>
                    </div>
                  )}

                  <div className="product-quantity-cart">
                    {!isAvailable && (
                      <span className="text-danger">
                        Currently unavailable for purchase
                      </span>
                    )}
                  </div>

                  {/* <div className="bd__social-media">
                    <ul>
                      <li>Share:</li>
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Facebook"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                     
                      <li>
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on LinkedIn"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(formatProductTitle(product.title) + " " + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on WhatsApp"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(shareUrl)}
                          title="Copy link"
                        >
                          <i className="fa-solid fa-link"></i>
                        </button>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="bd-related-Product__area mb-95">
        <div className="small-container container">
          <RelatedProduct productID={id} category={myProduct?.categoryName} />
        </div>
      </div> */}
    </>
  );
};

export default ShopDetailsMain;
