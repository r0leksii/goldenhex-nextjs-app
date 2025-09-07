"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Controller, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import useGlobalContext from "@/hooks/use-context";
import Image from "next/image";
import masterCard from "../../../public/assets/img/icon/mastercard.png";
import papyle from "../../../public/assets/img/icon/paypal.png";
import visa from "../../../public/assets/img/icon/visa.png";
import { ProductType } from "@/types/product/product.type";
// no external UI libs

const ProductModal = () => {
  const { modalId, openModal, setOpenModal } = useGlobalContext();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [product, setProduct] = useState<ProductType | null>(null);

  // const cartProducts = useSelector(
  //   (state: RootState) => state.cart.cartProducts
  // );
  // const quantity = product
  //   ? cartProducts.find((item) => item?._id === product?._id)
  //   : undefined;
  // const totalCart = quantity?.totalCard || 0;

  // First: Fetch product data when modalId changes
  useEffect(() => {
    const fetchProduct = async () => {
      if (!modalId) return;

      try {
        const response = await fetch(`/api/shop/products?id=${modalId}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        if (data.products && data.products[0]) {
          setProduct(data.products[0]);
        }
      } catch (error) {
        // suppressed client console logging
      }
    };

    fetchProduct();
  }, [modalId]);

  // Manage body scroll lock and ESC to close when modal is open
  useEffect(() => {
    if (openModal && product) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          // Close on ESC
          try { setOpenModal(false); } catch {}
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [openModal, product, setOpenModal]);

  const handleClose = () => {
    setOpenModal(false);
  };

  // const handleAddToCart = (product: CartProductType) => {
  //   dispatch(cart_product(product));
  // };

  // const handDecressCart = (product: CartProductType) => {
  //   dispatch(decrease_quantity(product));
  // };
  // const handleChange = (e: any) => {};

  // if (isLoading) {
  //   return (
  //     <div className="product__modal-sm modal fade" id="productmodal">
  //       <div className="modal-dialog modal-dialog-centered">
  //         <div className="modal-content">
  //           <div className="text-center p-4">Loading...</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (!product) {
    // Show minimal loading overlay if modal is requested but product isn't loaded yet
    if (openModal) {
      return (
        <div
          className={`product__modal-sm modal fade show`}
          id="productmodal"
          role="dialog"
          aria-hidden={false}
          tabIndex={-1}
          onClick={handleClose}
        >
          <div
            className="modal-dialog modal-dialog-centered "
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="text-center p-4">Loading...</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div
      className={`product__modal-sm modal fade${openModal ? " show" : ""}`}
      id="productmodal"
      role="dialog"
      aria-hidden={!openModal}
      tabIndex={-1}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered "
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="product__modal">
            <div className="product__modal-wrapper p-relative">
              <button
                type="button"
                className="close product__modal-close"
                aria-label="Close"
                onClick={handleClose}
              >
                <i className="fal fa-times"></i>
              </button>
              <div className="modal__inner">
                <div className="bd__shop-details-inner">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="product-details__thumb-inner p-relative">
                        <div className="bd__shop-details-img-gallery mb-30">
                          <div className="product-details-active swiper-container">
                            <div className="swiper-wrappers">
                              <Swiper
                                thumbs={{ swiper: thumbsSwiper }}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={1}
                                freeMode={false}
                                watchSlidesProgress={true}
                                modules={[
                                  Navigation,
                                  Controller,
                                  FreeMode,
                                  Thumbs,
                                ]}
                                navigation={{
                                  nextEl: ".product-details__button-next",
                                  prevEl: ".product-details__button-prev",
                                }}
                              >
                                {product.imageURLs.map(
                                  (item: any, index: any) => {
                                    return (
                                      <SwiperSlide key={index}>
                                        <div className="swiper-slides">
                                          <div className="bd-product__details-large-img w-img">
                                            <Image
                                              src={item}
                                              alt="product-details-img"
                                              width={450}
                                              height={450}
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </SwiperSlide>
                                    );
                                  }
                                )}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                        {/* <div className="bd-product__details-small-img">
                          <div className="swiper-container product-details-nav">
                            <div className="swiper-wrappers">
                              <Swiper
                                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={4}
                                modules={[Controller, FreeMode, Thumbs]}
                                watchSlidesProgress={false}
                              >
                                {product.imageURLs.map(
                                  (item: any, index: any) => (
                                    <SwiperSlide key={index}>
                                      <div className="swiper-slides m-img">
                                        <div className={`product-small__img`}>
                                          <Image
                                            src={item}
                                            alt="product-details-img"
                                            width={70}
                                            height={70}
                                            style={{
                                              width: "100%",
                                              height: "auto",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  )
                                )}
                              </Swiper>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="modal-product-info modal-product__details-content">
                        <h3>{product?.title}</h3>
                        <div className="product-price">
                          <span>
                            $
                            {product?.price % 1 === 0
                              ? `${product?.price}.00`
                              : product?.price.toFixed(2)}
                          </span>
                        </div>
                        {/* <div className="modal-product-meta bd__product-details-menu-1">
                          <ul>
                            <li>
                              <strong>Products:</strong>
                              {product?.currentStock &&
                                product?.currentStock > 0 && (
                                  <span>
                                    {" "}
                                    {product?.currentStock} Pieces Available{" "}
                                  </span>
                                )}
                            </li>
                          </ul>
                        </div>
                        <div className="product-quantity-cart mb-25">
                          {product?.currentStock && product?.currentStock > 0 ? (
                            <>
                              {" "}
                              <div className="product-quantity-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                  <button
                                    onClick={() =>
                                      handDecressCart(product as any)
                                    }
                                    className="cart-minus"
                                  >
                                    <i className="far fa-minus"></i>
                                  </button>
                                  <input
                                    className="cart-input"
                                    type="text"
                                    readOnly
                                    value={totalCart ? totalCart : 0}
                                  />
                                  <button
                                    className="cart-plus"
                                    onClick={() =>
                                      handleAddToCart(product as any)
                                    }
                                  >
                                    <i className="far fa-plus"></i>
                                  </button>
                                </form>
                              </div>
                              <span data-bs-dismiss="modal" aria-label="Close">
                                <Link
                                  className="cart-btn bd-fill__btn"
                                  href="/cart"
                                >
                                  <i className="fal fa-cart-arrow-down"></i>{" "}
                                  View Cart
                                </Link>
                              </span>{" "}
                            </>
                          ) : (
                            <>
                              <span className="text-danger">
                                This Product Is Out Of Stock
                              </span>
                            </>
                          )}
                        </div>

                        {product?.currentStock && product?.currentStock > 0 ? (
                          <>
                            <div className="bd__product-details-menu-3">
                              <ul>
                                <li>
                                  <span
                                    className="wishlist-btn"
                                    title="Wishlist"
                                    onClick={() =>
                                      dispatch(wishlist_product(product as any))
                                    }
                                  >
                                    <i className="far fa-heart"></i>
                                    <span>Add to Wishlist</span>
                                  </span>
                                </li>
                                <li>
                                  <span
                                    className="wishlist-btn cart-btn"
                                    title="Compare"
                                  >
                                    <i className="fas fa-exchange-alt"></i>
                                    <span>Compare</span>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </>
                        ) : (
                          <></>
                        )} */}

                        <div className="bd__social-media">
                          <ul>
                            <li>Share:</li>
                            <li>
                              <Link
                                href="https://www.facebook.com/"
                                target="_blank"
                                title="Facebook"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://www.tiktok.com/@"
                                target="_blank"
                                title="TikTok"
                              >
                                <i className="fab fa-tiktok"></i>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="https://www.threads.net/"
                                title="Threads"
                                target="_blank"
                              >
                                <i className="fab fa-threads"></i>
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
                        <div className="bd__safe-checkout">
                          <h5>Guaranteed Safe Checkout</h5>
                          <a href="#">
                            <Image src={masterCard} alt="Payment Image" />
                          </a>
                          <a href="#">
                            <Image src={papyle} alt="Payment Image" />
                          </a>
                          <a href="#">
                            <Image src={visa} alt="Payment Image" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
