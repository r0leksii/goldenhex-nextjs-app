import React from "react";
import thumbOne from "../../../public/assets/img/about/about-img-3.jpg";
import thumbTwo from "../../../public/assets/img/about/about-img-4.jpg";
import thumbThree from "../../../public/assets/img/about/about-img-5.jpg";
import authorImg from "../../../public/assets/img/about/about-author.png";
import authorSigneture from "../../../public/assets/img/about/author-signature.png";
import Image from "next/image";
const AboutSectionTwo = () => {
  return (
    <section className="bd-about__area pt-130 pb-65">
      <div className="container">
        <div className="row g-0">
          <div className="col-xxl-5 col-xl-5 col-lg-6">
            <div className="bd-about__wrapper mb-60">
              <div className="bd-about__image-1 m-img mb-60">
                <Image src={thumbOne} alt="about-image" />
              </div>
              <div className="bd-about__image-2 m-img">
                <Image src={thumbTwo} alt="about-image" />
              </div>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7 col-lg-6">
            <div className="bd-about__content-box mb-60">
              <div className="bd-section__title-wrapper mb-50">
                <span className="bd-sub__title">About Us</span>
                <h2 className="bd-section__title mb-30">
                  We believe in pure and <br /> organic quality
                </h2>
              </div>
              <div className="bd-about__inner">
                <div className="bd-about__image-3">
                  <Image src={thumbThree} alt="about-image" />
                </div>
                <div className="bd-about__info">
                  <p>
                    Golden Hex story started in California, where a family of
                    beekeepers decided to share their love of raw honey with the
                    friends and family in Silicon Valley. Soon, the word about
                    the quality of the honey got out, and the requests were
                    pouring in. That how we began selling our bee products to
                    Bay Area and Los Angeles customers. Our company kept
                    growing, producing the finest raw honey, pollen, propolis,
                    candies made out from beeswax, natural cosmetics, and soaps.
                    Upon moving to North Carolina, we decided to grow our brand
                    to the new level and to open a specialty store with European
                    and Mediterranean products. In the Golden Hex store, we
                    continue to offer our raw honey and other natural products
                    of the Golden Hex brand, that is now produced in North
                    Carolina. Our store is conveniently located next to downtown
                    Cary, NC right next to Preston near Thomas Bond Park @ 1200
                    NW Maynard Rd, Cary 27513
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
