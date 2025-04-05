//@refresh
import React, { ReactNode } from "react";

import HeaderThree from "./headers/header-three";
import FooterThree from "./footers/footer-three";
import BacktoTop from "@/components/common/backToTop/BacktoTop";
import { SanitizedCategory } from "@/lib/actions/category.actions";

const Wrapper = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: SanitizedCategory[];
}) => {
  return (
    <>
      <BacktoTop />
      <HeaderThree categories={categories} />
      {children}
      <FooterThree />;
    </>
  );
};

export default Wrapper;
