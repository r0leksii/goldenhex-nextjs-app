"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/use-context";
import NavMenu from "./navmenu";
import logo from "../../../public/assets/img/logo/logo-h-goldenhex.png";
import Image from "next/image";
import Sidebar from "@/sheardComponent/Sidebar";
import CategoryItem from "@/components/home-three/CategoryItem";
import { usePathname, useRouter } from "next/navigation";
import type { components } from "@/types/schema.type";

type CategoryType = components["schemas"]["Category"];

interface HeaderThreeProps {
  categories: CategoryType[];
}

const HeaderThree = ({ categories }: HeaderThreeProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { setShowSidebar } = useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const safeSetShowSidebar = setShowSidebar || (() => {});
  const [catMenuOpen, setCatMenuOpen] = useState(false);

  // Sticky search bar
  useEffect(() => {
    const sticky = () => {
      const searchBar = document.querySelector("#search-bar-sticky");
      if (searchBar) {
        window.scrollY >= 100
          ? searchBar.classList.add("is-sticky")
          : searchBar.classList.remove("is-sticky");
      }
    };
    window.addEventListener("scroll", sticky);
    return () => window.removeEventListener("scroll", sticky);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = (searchValue || "").trim();
    if (pathName && pathName.startsWith("/category")) {
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      router.push(params.toString() ? `${pathName}?${params.toString()}` : pathName);
    } else {
      router.push(q ? `/?search=${encodeURIComponent(q)}` : "/");
    }
  };

  return (
    <>
      <header className="bd-header-modern">
        {/* Top Bar - Contact Info */}
        <div className="bd-header__topbar-modern">
          <div className="container">
            <div className="bd-header__topbar-content">
              <div className="bd-header__topbar-left">
                <Link href="tel:+19199462649" className="bd-header__topbar-item">
                  <i className="fas fa-phone-alt"></i>
                  <span>(919) 946-2649</span>
                </Link>
                <Link
                  href="https://g.co/kgs/egQkRSZ"
                  target="_blank"
                  className="bd-header__topbar-item"
                >
                  <i className="fas fa-map-marker-alt"></i>
                  <span>1200 NW Maynard Rd, Cary, NC</span>
                </Link>
              </div>
              <div className="bd-header__topbar-right">
                <span className="bd-header__topbar-hours">
                  <i className="far fa-clock"></i>
                  Mon-Sat: 10am-8pm | Sun: 10am-5pm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bd-header__main-modern">
          <div className="container">
            <div className="bd-header__main-content">
              {/* Logo */}
              <div className="bd-header__logo-modern">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="GoldenHex Logo"
                    width={180}
                    height={69}
                    priority
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="bd-header__nav-modern">
                <NavMenu />
              </nav>

              {/* Right Actions */}
              <div className="bd-header__actions-modern">
                {/* Mobile Menu Toggle */}
                <button
                  type="button"
                  className="bd-header__menu-toggle"
                  onClick={() => safeSetShowSidebar(true)}
                  aria-label="Open menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div id="search-bar-sticky" className="bd-header__search-bar">
          <div className="container">
            <div className="bd-header__search-content">
              {/* Categories Dropdown */}
              <div className="bd-header__categories">
                <button
                  type="button"
                  className={`bd-header__categories-btn ${catMenuOpen ? "is-open" : ""}`}
                  onClick={() => setCatMenuOpen(!catMenuOpen)}
                >
                  <span className="bd-header__categories-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="bd-header__categories-text">All Categories</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className={`bd-header__categories-dropdown ${catMenuOpen ? "is-visible" : ""}`}>
                  <CategoryItem
                    categories={categories}
                    onClose={() => setCatMenuOpen(false)}
                  />
                </div>
              </div>

              {/* Search Form */}
              <form className="bd-header__search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              {/* Store Hours (Desktop) */}
              <div className="bd-header__store-info">
                <div className="bd-header__store-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="bd-header__store-text">
                  <span>Need Help? Call Us</span>
                  <Link href="tel:+19199462649">+1 (919) 946-2649</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar />
    </>
  );
};

export default HeaderThree;
