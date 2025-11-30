import Link from "next/link";
import React from "react";
import useGlobalContext from "../hooks/use-context";
import logo from "../../public/assets/img/logo/logo-h-goldenhex.png";
import Image from "next/image";
import MobileMenu from "./elements/MobileMenu";
import SidebarSearchContent from "./elements/SidebarSearchContent";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  const safeSetShowSidebar = setShowSidebar || (() => {});

  return (
    <>
      <div className="fix">
        <div className={`side-info ${showSidebar ? "info-open" : ""}`}>
          <div className="side-info-content">
            <div className="modals-content">
              <div className="offcanvas__wrapper">
                <div className="offcanvas__content">
                  {/* Header */}
                  <div className="offcanvas__top">
                    <div className="offcanvas__logo">
                      <Link href="/">
                        <Image src={logo} alt="GoldenHex" width={160} height={50} />
                      </Link>
                    </div>
                    <div className="offcanvas__close">
                      <button
                        className="offcanvas__close-btn"
                        onClick={() => safeSetShowSidebar(false)}
                        aria-label="Close menu"
                      >
                        <i className="fal fa-times"></i>
                      </button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="offcanvas__search">
                    <SidebarSearchContent />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="side-mobile-menu d-block d-xl-none mm-menu">
                    <MobileMenu />
                  </nav>

                  {/* Contact Info */}
                  <div className="offcanvas__contact">
                    <h4>Contact Info</h4>
                    <ul>
                      <li>
                        <div className="offcanvas__contact-icon">
                          <i className="fal fa-map-marker-alt"></i>
                        </div>
                        <div className="offcanvas__contact-text">
                          <Link target="_blank" href="https://g.co/kgs/egQkRSZ">
                            1200 NW Maynard Rd, Cary, NC
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="offcanvas__contact-icon">
                          <i className="far fa-phone"></i>
                        </div>
                        <div className="offcanvas__contact-text">
                          <Link href="tel:+19199462649">(919) 946-2649</Link>
                        </div>
                      </li>
                      <li>
                        <div className="offcanvas__contact-icon">
                          <i className="fal fa-envelope"></i>
                        </div>
                        <div className="offcanvas__contact-text">
                          <Link href="mailto:sales@goldenhex.com">
                            sales@goldenhex.com
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="offcanvas__social">
                    <ul>
                      <li>
                        <Link
                          href="https://www.facebook.com/GoldenHex/"
                          target="_blank"
                          aria-label="Facebook"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.instagram.com/goldenhexfoods/"
                          target="_blank"
                          aria-label="Instagram"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => safeSetShowSidebar(false)}
        className={`offcanvas-overlay ${showSidebar ? "overlay-open" : ""}`}
      ></div>
    </>
  );
};

export default Sidebar;
