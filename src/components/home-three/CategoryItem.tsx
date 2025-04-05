import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// No longer need getCategories here if data is passed via props
// import { getCategories } from "@/lib/actions/category.actions";

interface SanitizedCategory {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  parentId?: number;
  children?: SanitizedCategory[];
}

// Define props interface
interface CategoryItemProps {
  categories: SanitizedCategory[];
}

// Make it a regular component accepting props
const CategoryItem: React.FC<CategoryItemProps> = ({ categories }) => {
  // No fetching logic needed here anymore

  return (
    <nav>
      <ul>
        {categories && categories.length > 0 ? ( // Check if categories exist
          categories.map((category) => (
            <li key={category._id} className="has-dropdown">
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
