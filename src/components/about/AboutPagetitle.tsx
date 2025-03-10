import React from "react";
import bgImage from "../../../public/assets/img/banner/page-banner-1.jpg";
const AboutPagetitle = () => {
  return (
    <section
      className="bd-page__banner-area include-bg page-overlay"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="bd-page__banner-content text-center">
              <h2>About Golden Hex</h2>
              <span>Europian food market</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPagetitle;
