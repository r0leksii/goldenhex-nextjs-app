"use client";
import { offerProductType } from "@/interFace/api-interFace";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeroSliderThree from "./HeroSliderThree";
import BannerPreloader from "@/preloaders/BannerPreloader";
import { formatProductTitle } from "@/utils";

const HeroSectionThree = () => {
  const [product, setproduct] = useState<offerProductType[]>([]);
  useEffect(() => {
    // axios
    //   .get(`${process.env.BASE_URL}product/offer-products-banner`)
    //   .then((res) => {
    //     setproduct(Array.isArray(res.data) ? res.data : []);
    //   })
    //   .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <section className="bd-banner__area pt-30 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="row">
                {Array.isArray(product) && product.length > 0 ? (
                  product.slice(0, 2).map((item, index) => (
                    <div className="col-xl-12 col-md-6" key={index}>
                      <div
                        className="bd-singel__product-banner product-thumb-bg mb-30"
                        style={{ backgroundImage: `url(${item.banner})` }}
                      >
                        <div className="bd-product__banner-inner">
                          <div className="bd-product__banner-content banner-oil product__content-3">
                            <h3 className="bd-product__title">
                              <Link href={`/product/${item.productId}`}>
                                {formatProductTitle(item.productName || "")}
                              </Link>
                            </h3>
                            <div className="text-[white] product__banner-price">
                              <h4>
                                $
                                {item?.price % 1 === 0
                                  ? `${item?.price}.00`
                                  : item?.price.toFixed(2)}
                              </h4>
                            </div>
                            <Link
                              className="bd-bn__btn-3"
                              href={`/product/${item.productId}`}
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <BannerPreloader />
                  </>
                )}
              </div>
            </div>
            <div className="col-xl-8">
              <HeroSliderThree product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSectionThree;
