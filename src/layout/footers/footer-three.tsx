import Link from "next/link";
import React from "react";
import footerlogo from "../../../public/assets/img/logo/logo-goldenhex.png";
import Image from "next/image";

const year = new Date().getFullYear();

const FooterThree = () => {
  return (
    <footer className="bd-footer-three">
      <div className="bd-footer__main">
        <div className="container">
          <div className="bd-footer__content">
            {/* Logo */}
            <div className="bd-footer__logo">
              <Link href="/">
                <Image
                  src={footerlogo}
                  alt="GoldenHex Logo"
                  width={180}
                  height={68}
                  priority
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="bd-footer__nav">
              <Link href="/about">About Us</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </nav>

            {/* Social Icons */}
            <div className="bd-footer__social">
              <Link
                href="https://www.facebook.com/GoldenHex/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href="https://www.instagram.com/goldenhexfoods/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bd-footer__copyright-bar">
        <div className="container">
          <p>© {year} GoldenHex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterThree;
