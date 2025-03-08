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
                            <Link
                              href="https://www.facebook.com/"
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://twitter.com/?lang=en"
                              title="Twitter"
                            >
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.linkedin.com/"
                              title="Linkedin"
                              target="_blank"
                            >
                              <i className="fab fa-linkedin"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="https://www.instagram.com/"
                              target="_blank"
                              title="Instagram"
                            >
                              <i className="fab fa-instagram"></i>
                            </Link>
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
