"use client";
import React, { createContext, useState, useEffect, useMemo } from "react";

export const AppContext = createContext<any>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalId, setModalId] = useState<string>("");
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalProduct, settotalProduct] = useState<number>(0);
  const [dynamicId, setDynamicId] = useState<string>("");
  const [openOrderTrack, setOpenOrderTrack] = useState<boolean>(false);

  // const token = localStorage.getItem("accessToken");
  const header = useMemo(
    () => ({
      headers: {
        "Content-Type": "application/json",
      },
    }),
    []
  );

  const logout = () => {
    localStorage.removeItem("accessToken");
    setLoading(false);
    setLoggedIn(false);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const contextValue: any = {
    sideMenuOpen,
    toggleSideMenu,
    scrollDirection,
    setScrollDirection,
    showSidebar,
    setShowSidebar,
    setLoggedIn,
    setLoading,
    loading,
    logout,
    header,
    loggedIn,
    openCart,
    setOpenCart,
    toggleModal,
    openModal,
    setOpenModal,
    modalId,
    setModalId,
    dynamicId,
    setDynamicId,
    openOrderTrack,
    setOpenOrderTrack,
    paymentSuccess,
    setPaymentSuccess,
    totalProduct,
    settotalProduct,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
