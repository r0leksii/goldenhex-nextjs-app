//@refresh
"use client";
import React, { useEffect } from "react";
import { animationCreate } from "@/utils/utils";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import HeaderThree from "./headers/header-three";
import FooterThree from "./footers/footer-three";
import { childrenType } from "@/interFace/interFace";
import BacktoTop from "@/components/common/backToTop/BacktoTop";
import OrderTrackModal from "@/components/profile/studentProfile/OrderTrackModal";

const Wrapper = ({ children }: childrenType) => {
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 200);
  }, []);

  return (
    <>
      <BacktoTop />
      <HeaderThree />
      {children}
      <OrderTrackModal />
      <FooterThree />;
    </>
  );
};

export default Wrapper;
