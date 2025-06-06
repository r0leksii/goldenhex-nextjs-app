import Link from "next/link";
import React from "react";
import footerlogo from "../../../public/assets/img/logo/logo-goldenhex.png";
import Image from "next/image";

const year = new Date().getFullYear();

const FooterThree = () => {
  return (
    <footer>
      <div className="bd-footer__area grey-bg pt-100 pb-60">
        <div className="bd-footer__style-2">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__logo">
                    <Link href="/">
                      <Image
                        src={footerlogo}
                        alt="footer-logo"
                        width={150}
                        height={57}
                      />
                    </Link>
                  </div>
                </div>
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__link">
                    <ul>
                      <li>
                        <Link href="/about">About Our Company</Link>
                      </li>
                      <li>
                        <Link href="/about">Awards Winnings</Link>
                      </li>

                      <li>
                        <Link href="#">Flash Offers</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bd-footer__widget text-center mb-40">
                  <div className="bd-footer__social">
                    <Link
                      href="https://www.facebook.com/GoldenHex/"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </Link>

                    <Link
                      href="https://www.instagram.com/goldenhexfoods/"
                      target="_blank"
                      title="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-sub__fotter">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="bd-footer__copyright text-center">
                <ul>
                  <li>All Rights Reserved</li>
                  <li>|</li>
                  <li>Copyrighted by ©{year} GoldenHex</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterThree;
