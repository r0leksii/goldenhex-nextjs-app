"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "@/lib/actions/category.actions";
const chevronRight = <FontAwesomeIcon icon={faChevronRight} />;

interface SanitizedCategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  children?: SanitizedCategory[];
}

const CategoryItem = () => {
  const [categories, setCategories] = useState<SanitizedCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [activeThirdLevel, setActiveThirdLevel] = useState<string | null>(null);

  const fecthCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    fecthCategories();
  }, []);

  return (
    <nav>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li
              key={category._id}
              className="has-dropdown"
              onMouseEnter={() => setActiveCategory(category._id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                className="text-capitalize d-flex align-items-center justify-content-between"
                href={`/shop?category=${category.name}`}
              >
                <span>{category.name}</span>
                {category.children && category.children.length > 0 && (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="submenu-arrow"
                  />
                )}
              </Link>
              {category.children && category.children.length > 0 && (
                <ul className="category-submenu">
                  {category.children.map((subCategory) => (
                    <li
                      key={subCategory._id}
                      className={
                        subCategory.children?.length ? "has-dropdown" : ""
                      }
                      onMouseEnter={() => setActiveSubCategory(subCategory._id)}
                      onMouseLeave={() => setActiveSubCategory(null)}
                    >
                      <Link
                        className="text-capitalize d-flex align-items-center justify-content-between"
                        href={`/shop?category=${category.name}&subcategory=${subCategory.name}`}
                      >
                        <span>{subCategory.name}</span>
                        {subCategory.children &&
                          subCategory.children.length > 0 && (
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className="submenu-arrow"
                            />
                          )}
                      </Link>
                      {/* Third level categories */}
                      {subCategory.children &&
                        subCategory.children.length > 0 && (
                          <ul className="category-submenu">
                            {subCategory.children.map((thirdLevel) => (
                              <li key={thirdLevel._id}>
                                <Link
                                  className="text-capitalize"
                                  href={`/shop?category=${category.name}&subcategory=${subCategory.name}&thirdlevel=${thirdLevel.name}`}
                                >
                                  {thirdLevel.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li className="text-center">No Categories Available</li>
        )}
      </ul>
    </nav>
  );
};

export default CategoryItem;
