"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { CategoryGroup } from "@/lib/actions/combine-categories";

// import { getCategories } from "@/lib/actions/category.actions";
import { createSlug } from "@/utils";

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
  categories: CategoryGroup[];
  onClose?: () => void;
}

// Make it a regular component accepting props
const CategoryItem: React.FC<CategoryItemProps> = ({ categories, onClose }) => {
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleGroup = (idx: number) => {
    setOpenGroup((prev) => (prev === idx ? null : idx));
    // collapse any open sub when switching groups
    setOpenSub(null);
  };

  const toggleSub = (groupIdx: number, subIdx: number) => {
    const key = `${groupIdx}-${subIdx}`;
    setOpenSub((prev) => (prev === key ? null : key));
  };

  const handleNavigate = () => {
    // collapse internal state and let parent close the panel
    setOpenGroup(null);
    setOpenSub(null);
    onClose?.();
  };

  return (
    <nav className="category-nav">
      <div className="root">
        {categories && categories.length > 0 ? (
          categories.map((category, i) => {
            const hasGroupChildren = !!category.categories && category.categories.length > 0;
            const groupIsOpen = openGroup === i;
            return (
              <div
                key={category.groupName}
                className={`group ${hasGroupChildren ? "has-dropdown" : ""} ${groupIsOpen ? "open" : ""}`}
              >
                <div className="item-row">
                  {hasGroupChildren ? (
                    <button
                      type="button"
                      className="toggle-btn item-btn p-3"
                      aria-label={`Toggle ${category.groupName}`}
                      aria-expanded={groupIsOpen}
                      onClick={() => toggleGroup(i)}
                    >
                      <span className="label text-capitalize">{category.groupName}</span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`chev ${groupIsOpen ? "rot" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      className="item-link text-capitalize p-3 d-flex align-items-center justify-content-between"
                      href={`/shop?category=${createSlug(category.groupName)}`}
                      onClick={handleNavigate}
                    >
                      <span className="label">{category.groupName}</span>
                    </Link>
                  )}
                </div>

                {hasGroupChildren && (
                  <div className="submenu">
                    {category.categories.map((subCategory, j) => {
                      const subKey = `${i}-${j}`;
                      const hasChildren = !!subCategory.children?.length;
                      const subIsOpen = openSub === subKey;
                      return (
                        <div
                          key={subCategory.id}
                          className={`sub ${hasChildren ? "has-dropdown" : ""} ${subIsOpen ? "open" : ""}`}
                        >
                          <div className="item-row">
                            {hasChildren ? (
                              <button
                                type="button"
                                className="toggle-btn item-btn p-3"
                                aria-label={`Toggle ${subCategory.name}`}
                                aria-expanded={subIsOpen}
                                onClick={() => toggleSub(i, j)}
                              >
                                <span className="label text-capitalize">{subCategory.name}</span>
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className={`chev ${subIsOpen ? "rot" : ""}`}
                                />
                              </button>
                            ) : (
                              <Link
                                className="item-link text-capitalize p-3 d-flex align-items-center justify-content-between"
                                href={`/shop?category=${createSlug(category.groupName)}&subcategory=${createSlug(subCategory.name)}`}
                                onClick={handleNavigate}
                              >
                                <span className="label">{subCategory.name}</span>
                              </Link>
                            )}
                          </div>

                          {hasChildren && (
                            <div className="submenu">
                              {subCategory.children!.map((thirdLevel) => (
                                <div key={thirdLevel.id} className="leaf">
                                  <Link
                                    className="item-link text-capitalize p-3 d-block"
                                    href={`/shop?category=${createSlug(category.groupName)}&subcategory=${createSlug(subCategory.name)}&thirdlevel=${createSlug(thirdLevel.name)}`}
                                    onClick={handleNavigate}
                                  >
                                    {thirdLevel.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center empty">No Categories Available</div>
        )}
      </div>
    </nav>
  );
};

export default CategoryItem;
