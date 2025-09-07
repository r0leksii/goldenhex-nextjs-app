import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

// Set explicit width and height for icons to prevent layout shift on load
const phoneIcon = <FontAwesomeIcon icon={faPhone} width="16" height="16" />;
const locationIcon = (
  <FontAwesomeIcon icon={faLocationDot} width="16" height="16" />
);

const HeaderMiddleThree = () => {
  return (
    <div className="bd-header__topbar">
      <div className="container">
        <ul className="bd-header__toplist">
          <li>
            <Link href="tel:+19199462649" className="bd-header__toplink">
              {phoneIcon}
              (919) 946-2649
            </Link>
          </li>
          <li>
            <Link
              href="https://g.co/kgs/egQkRSZ"
              target="_blank"
              className="bd-header__toplink"
            >
              {locationIcon}
              1200 NW Maynard Rd Cary, North Carolina
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMiddleThree;
