//@refresh
import React, { ReactNode } from "react";

import HeaderThreeServer from "./headers/header-three-server";
import FooterThree from "./footers/footer-three";
import BacktoTop from "@/components/common/backToTop/BacktoTop";

const Wrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <BacktoTop />
      <HeaderThreeServer />
      {children}
      <FooterThree />;
    </>
  );
};

export default Wrapper;
