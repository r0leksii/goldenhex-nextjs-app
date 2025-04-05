//@refresh
import React, { ReactNode } from "react";

import HeaderThree from "./headers/header-three";
import FooterThree from "./footers/footer-three";
import BacktoTop from "@/components/common/backToTop/BacktoTop";
import { CategoryGroup } from "@/lib/actions/combine-categories";

const Wrapper = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: CategoryGroup[];
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
