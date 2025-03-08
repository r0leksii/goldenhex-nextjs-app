"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "swiper/css/bundle";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import Image from "next/image";
import { ProductType } from "../shop/ShopSection";

const ShopDetailsMain = ({ id }: any) => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const myProduct: ProductType = product[0];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/shop?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProduct(data.products);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <>
      <Breadcrumb breadHome={"Home"} breadMenu={"Shop Details"} />
      <div className="bd__shop-details-area pt-115 pb-75">
        <div className="container small-container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="bd__shop-details-inner mb-55">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-details__thumb-inner small-device p-relative">
                      <div className="bd__shop-details-img-gallery mb-30">
                        <div className="product-details__thumb-inner small-device p-relative">
                          <div className="bd__shop-details-img-gallery mb-30">
                            <div className="product-image-container">
                              {myProduct &&
                                myProduct.imageURLs &&
                                myProduct.imageURLs[0] && (
                                  <div className="bd-product__details-large-img w-img">
                                    <Image
                                      src={myProduct.imageURLs[0]}
                                      alt={
                                        myProduct.title || "product-details-img"
                                      }
                                      width={577}
                                      height={577}
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-product-info shop-details-info">
                      <h3>{myProduct?.title}</h3>
                      <div className="product-price">
                        <span>${myProduct?.price}</span>
                      </div>
                      <div className="bd__social-media">
                        <ul>
                          <li>Share:</li>
                          <li>
                            <a
                              href={`https://www.facebook.com/share.php?u=${encodeURIComponent(
                                window.location.href
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `https://www.facebook.com/share.php?u=${encodeURIComponent(
                                    window.location.href
                                  )}`,
                                  "facebook-share",
                                  "width=580,height=296"
                                );
                              }}
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href={`https://twitter.com/share?url=${encodeURIComponent(
                                window.location.href
                              )}&text=${encodeURIComponent(
                                myProduct?.title || ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `https://twitter.com/share?url=${encodeURIComponent(
                                    window.location.href
                                  )}&text=${encodeURIComponent(
                                    myProduct?.title || ""
                                  )}`,
                                  "twitter-share",
                                  "width=550,height=235"
                                );
                              }}
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                // For mobile devices, try deep linking to Instagram
                                if (
                                  /Android|iPhone|iPad|iPod/i.test(
                                    navigator.userAgent
                                  )
                                ) {
                                  // Try to open Instagram app with the image
                                  window.location.href = `instagram://library?AssetPath=${encodeURIComponent(
                                    myProduct?.imageURLs?.[0] || ""
                                  )}`;

                                  // Set a timeout to fallback to web if app doesn't open
                                  setTimeout(() => {
                                    window.location.href =
                                      "https://www.instagram.com/";
                                  }, 2000);
                                } else {
                                  // For desktop, open Instagram website with alert
                                  window.open(
                                    "https://www.instagram.com/",
                                    "_blank"
                                  );
                                  alert(
                                    "Instagram sharing is optimized for mobile devices. Please save the image and upload it manually through the Instagram app."
                                  );
                                }
                              }}
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                                window.location.href
                              )}&media=${encodeURIComponent(
                                myProduct?.imageURLs?.[0] || ""
                              )}&description=${encodeURIComponent(
                                myProduct?.title || ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(
                                  `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                                    window.location.href
                                  )}&media=${encodeURIComponent(
                                    myProduct?.imageURLs?.[0] || ""
                                  )}&description=${encodeURIComponent(
                                    myProduct?.title || ""
                                  )}`,
                                  "pinterest-share",
                                  "width=750,height=550"
                                );
                              }}
                            >
                              <i className="fab fa-pinterest"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bd-related-Product__area mb-95">
        <div className="small-container container">
          <RelatedProduct productID={id} category={myProduct?.categoryName} />
        </div>
      </div> */}
    </>
  );
};

export default ShopDetailsMain;
