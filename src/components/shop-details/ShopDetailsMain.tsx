"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "swiper/css/bundle";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import Image from "next/image";
import { ProductType } from "@/types/product/product.type";

interface ShopDetailsMainProps {
  product: ProductType;
}

const ShopDetailsMain = ({ product }: ShopDetailsMainProps) => {
  return (
    <>
      {/* <Breadcrumb breadHome={"Home"} breadMenu={"Shop Details"} /> */}
      <div className="bd__shop-details-area pt-115 pb-75">
        <div className="container small-container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="bd__shop-details-inner mb-55">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-details__thumb-inner">
                      {product.imageURLs?.[0] && (
                        <div className="bd-product__details-large-img">
                          <Image
                            src={product.imageURLs[0]}
                            alt={product.title}
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
                      <h3>{product.title}</h3>
                      <div className="product-price">
                        <span>${product.price}</span>
                      </div>

                      {product?.isAvailable && (
                        <div className="modal-product-meta bd__product-details-menu-1">
                          <ul>
                            <li>
                              <strong>Products:</strong>
                              <span>
                                {" "}
                                {product?.currentStock} Pieces Available{" "}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}

                      <div className="product-quantity-cart mb-25">
                        {/* {product?.isAvailable && (
                          <>
                            <div className="product-quantity-form">
                              <form onSubmit={(e) => e.preventDefault()}>
                                <button
                                  // onClick={() => handDecressCart(myProduct)}
                                  className="cart-minus"
                                >
                                  <i className="far fa-minus"></i>
                                </button>
                                <input
                                  className="cart-input"
                                  type="text"
                                  readOnly
                                  // value={totalCart ? totalCart : 0}
                                />
                                <button
                                  className="cart-plus"
                                  // onClick={() => handleAddToCart(myProduct)}
                                >
                                  <i className="far fa-plus"></i>
                                </button>
                              </form>
                            </div>
                            <span data-bs-dismiss="modal" aria-label="Close">
                              <Link
                                className="cart-btn bd-fill__btn"
                                href="#"
                                // href="/cart"
                              >
                                <i className="fal fa-cart-arrow-down"></i> View
                                Cart
                              </Link>
                            </span>{" "}
                          </>
                        )} */}

                        {!product?.isAvailable && (
                          <span className="text-danger">
                            This Product Is Out Of Stock
                          </span>
                        )}
                      </div>

                      <div className="bd__social-media">
                        <ul>
                          <li>Share:</li>
                          <li>
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
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
