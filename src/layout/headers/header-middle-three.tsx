import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const phoneIcon = <FontAwesomeIcon icon={faPhone} />;
const locationIcon = <FontAwesomeIcon icon={faLocationDot} />;

const HeaderMiddleThree = () => {
  return (
    <div className="d-none d-lg-flex" style={{ height: "40px" }}>
      <div className="container d-flex gap-3 align-items-center py-2">
        <ul className="d-flex gap-3 align-items-center py-2">
          <li>
            <Link
              href="tel:9199462649"
              className="d-flex gap-2 align-items-center hover-primary"
            >
              {phoneIcon}
              (919) 946-2649
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="d-flex gap-2 align-items-center hover-primary"
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
