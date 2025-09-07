import React from "react";
// import TrendingProductSlider from "../elements/product/TrendingProductSlider";
import HurryupBanner from "./sub-component/HurryupBanner";
import BrowseProductSlider from "./sub-component/BrowseProductSlider";
import BrowseProductBanner from "./sub-component/BrowseProductBanner";
import MasalaProductBanner from "./sub-component/MasalaProductBanner";
import ShippingInfo from "./sub-component/ShippingInfo";
import FlashBanner from "./sub-component/FlashBanner";
import SidebarTopratedProduct from "./sub-component/SidebarTopratedProduct";

const TrendingProducts = () => {
  return (
    <>
      <section className="bd-product__trending-area">
        <div className="container">
          <div className="bd-trending__grid">
            <div className="bd-trending__left">
              <div className="mb-45">
                {/* <TrendingProductSlider trending_product_title="Trending Product" /> */}
              </div>
              <HurryupBanner />
              <BrowseProductSlider />
              <BrowseProductBanner />
            </div>
            <div className="bd-trending__right">
              <div className="bd-product__sidebar pb-40">
                <div className="bd-trending__right-item">
                  <MasalaProductBanner />
                </div>
                <div className="bd-trending__right-item">
                  <ShippingInfo />
                </div>
                <div className="bd-trending__right-item">
                  <FlashBanner />
                </div>
                <div className="bd-trending__right-item">
                  <SidebarTopratedProduct />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
