"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/use-context";
import HeaderMiddleThree from "./header-middle-three";
import NavMenu from "./navmenu";
import logo from "../../../public/assets/img/logo/logo-h-goldenhex.png";
import support from "../../../public/assets/img/icon/support.svg";
import Image from "next/image";
import CartIcon from "@/sheardComponent/elements/icons/cart-icon";
import WishlistIcon from "@/sheardComponent/elements/icons/wishlist-icon";
import Sidebar from "@/sheardComponent/Sidebar";
import User from "@/sheardComponent/elements/icons/user";
import CategoryItem from "@/components/home-three/CategoryItem";
import SidebarCart from "./SidebarCart";
// import {
//   useTotalProductCount,
//   useTotalProductWishlistCount,
// } from "@/hooks/useCartQuantity";
import { usePathname } from "next/navigation";
import { SanitizedCategory } from "@/lib/actions/category.actions";
// import SidebarWishlist from "./SidebarWishlist";

// Define props for HeaderThree
interface HeaderThreeProps {
  categories: SanitizedCategory[];
}

const HeaderThree = ({ categories }: HeaderThreeProps) => {
  const pathName = usePathname();
  const { setShowSidebar } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const safeSetShowSidebar = setShowSidebar || (() => {});
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  // const productQuantity = useTotalProductCount();
  // const wishlistQuantity = useTotalProductWishlistCount();

  // Sticky Menu Area start
  useEffect(() => {
    window.addEventListener("scroll", sticky);
    return () => {
      window.removeEventListener("scroll", sticky);
    };
  });

  const sticky = () => {
    const header = document.querySelector("#header-sticky");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 40
        ? header.classList.add("header-sticky")
        : header.classList.remove("header-sticky");
    }
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);

    // if (pathName === "/shop") {
    //   setProdcutLoadding(true);
    //   // axios
    //   //   .get(
    //   //     `${process.env.BASE_URL}product/search-products-admin?search=${searchValue}`
    //   //   )
    //   //   .then((res) => {
    //   //     setProducts(res.data);
    //   //     setProdcutLoadding(false);
    //   //   })
    //   //   .catch((e) => console.log(e));
    // }
  };

  // Sticky Menu Area End
  return (
    <>
      <header>
        <HeaderMiddleThree />
        <div className="bd-header__border">
          <div id="header-sticky" className="bd-header__middle-inner">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-6">
                  <div className="bd-header__logo-3">
                    <Link href="/">
                      <Image
                        src={logo}
                        alt="logo"
                        width={240}
                        height={92}
                        priority
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 d-none d-lg-block">
                  <div className="main-menu d-none d-none d-lg-flex justify-content-center">
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-6">
                  <div className="bd-header__right d-flex align-items-center justify-content-end">
                    {/* <div className="bd-action__cart-list">
                      <div className="bd-action__item">
                        <div className="bd-action__cart">
                          <div
                            className="bd-action__cart-icon"
                            onClick={() => setOpenCart(true)}
                          >
                            <span className="bd-cart-mini-btn">
                              <CartIcon />
                            </span>
                            <span className="bd-action__item-number cart-count">
                              {productQuantity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bd-action__item">
                        <div className="bd-action__wishlist">
                          <div
                            className="bd-action__wistlist-icon"
                            onClick={() => setOpenWishlist(true)}
                          >
                            <span className="bd-cart-mini-btn">
                              <WishlistIcon />
                            </span>
                            <span className="bd-action__item-number wishlist-count">
                              {wishlistQuantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bd-action__item d-sm-flex align-items-center">
                        {user?.email ? (
                          <>
                            <div className="bd-action__cart">
                              <div className="bd-action__cart-icon">
                                <Link
                                  className="header-author-img"
                                  href="/profile"
                                >
                                  {user?.photo ? (
                                    <>
                                      <Image
                                        src={user?.photo}
                                        width={50}
                                        height={50}
                                        style={{
                                          width: "auto",
                                          height: "auto",
                                        }}
                                        alt="trending-quite"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <User />
                                    </>
                                  )}
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bd-action__cart">
                              <div className="bd-action__cart-icon">
                                <Link href="/login">
                                  <User />
                                </Link>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div> */}
                    <div className="header__hamburger d-flex ml-25">
                      <button
                        type="button"
                        className="hamburger-btn"
                        onClick={() => safeSetShowSidebar(true)}
                      >
                        <span className="hamburger-icon">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bd-header__buttom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xxl-8 col-xl-8 col-md-8 col-sm-6">
                  <div className="bd-header__butttom-left">
                    <div className="bd-header__category-nav p-relative">
                      <div
                        className={
                          catMenuOpen
                            ? "bd-category__click items-open"
                            : "bd-category__click"
                        }
                        onClick={() => {
                          setCatMenuOpen(!catMenuOpen);
                        }}
                      >
                        <div className="bd-bar__icon">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span>All Categories</span>
                      </div>
                      <div
                        className={
                          catMenuOpen
                            ? "category__items d-block"
                            : "category__items"
                        }
                      >
                        <div className="category-item">
                          <CategoryItem
                            categories={categories}
                            onClose={() => setCatMenuOpen(false)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bd-header__filterbar d-none d-md-block">
                      <form className="bd-filter__input" action="#">
                        <input
                          type="text"
                          placeholder={"Search products..."}
                          value={searchValue}
                          onChange={handleInputChange}
                        />
                        <button>
                          <i className="flaticon-magnifiying-glass"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-md-4 col-sm-6  d-none d-sm-block">
                  <div className="bd-action__support d-flex justify-content-end">
                    <div className="bd-support__inner">
                      <div className="bd-support__icon">
                        <Image
                          src={support}
                          alt="support-icon"
                          width={45}
                          height={51}
                          style={{ color: "var(--clr-theme-1)" }}
                        />
                      </div>
                      <div className="bd-support__text">
                        <span>
                          Monday - Saturday: 10:00am - 8:00pm
                          <br />
                          Sunday: 10:00am - 5:00pm
                        </span>
                        <Link href="tel:=19199462649"> +1 (919) 946-2649</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar />
      {/* <SidebarCart /> */}
      {/* <SidebarWishlist /> */}
    </>
  );
};

export default HeaderThree;
