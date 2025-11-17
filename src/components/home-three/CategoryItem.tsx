"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { createSlug } from "@/utils";
import type { components } from "@/types/schema.type";

type CategoryType = components["schemas"]["Category"];

// Define props interface
interface CategoryItemProps {
  categories: CategoryType[];
  onClose?: () => void;
}

const formatTopCategoryName = (name?: string | null) => {
  return (name || "").toUpperCase();
};

const formatChildCategoryName = (name?: string | null) => {
  const value = (name || "").toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

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
    <nav className="category-nav" style={{ overflowY: "scroll", height: "400px" }}>
      <div className="root">
        {categories && categories.length > 0 ? (
          categories.map((category, i) => {
            const hasGroupChildren = Array.isArray(category.Children) && category.Children.length > 0;
            const groupIsOpen = openGroup === i;
            return (
              <div
                key={category.Id ?? i}
                className={`group ${hasGroupChildren ? "has-dropdown" : ""} ${groupIsOpen ? "open" : ""}`}
              >
                <div className="item-row">
                  {hasGroupChildren ? (
                    <button
                      type="button"
                      className="toggle-btn item-btn p-3"
                      aria-label={`Toggle ${category.Name || ""}`}
                      aria-expanded={groupIsOpen}
                      onClick={() => toggleGroup(i)}
                    >
                      <span className="label">{formatTopCategoryName(category.Name)}</span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`chev ${groupIsOpen ? "rot" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      className="item-link p-3 d-flex align-items-center justify-content-between"
                      href={`/category/${createSlug(category.Name || "")}`}
                      onClick={handleNavigate}
                    >
                      <span className="label">{formatTopCategoryName(category.Name)}</span>
                    </Link>
                  )}
                </div>

                {hasGroupChildren && (
                  <div className="submenu">
                    {category.Children!.map((subCategory, j) => {
                      const subKey = `${i}-${j}`;
                      const hasChildren = Array.isArray(subCategory.Children) && subCategory.Children.length > 0;
                      const subIsOpen = openSub === subKey;
                      return (
                        <div
                          key={subCategory.Id ?? subKey}
                          className={`sub ${hasChildren ? "has-dropdown" : ""} ${subIsOpen ? "open" : ""}`}
                        >
                          <div className="item-row">
                            {hasChildren ? (
                              <button
                                type="button"
                                className="toggle-btn item-btn p-3"
                                aria-label={`Toggle ${subCategory.Name || ""}`}
                                aria-expanded={subIsOpen}
                                onClick={() => toggleSub(i, j)}
                              >
                                <span className="label">{formatChildCategoryName(subCategory.Name)}</span>
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className={`chev ${subIsOpen ? "rot" : ""}`}
                                />
                              </button>
                            ) : (
                              <Link
                                className="item-link p-3 d-flex align-items-center justify-content-between"
                                href={`/category/${createSlug(category.Name || "")}/${createSlug(subCategory.Name || "")}`}
                                onClick={handleNavigate}
                              >
                                <span className="label">{formatChildCategoryName(subCategory.Name)}</span>
                              </Link>
                            )}
                          </div>

                          {hasChildren && (
                            <div className="submenu">
                              {subCategory.Children!.map((thirdLevel, k) => (
                                <div key={thirdLevel.Id ?? k} className="leaf">
                                  <Link
                                    className="item-link p-3 d-block"
                                    href={`/category/${createSlug(category.Name || "")}/${createSlug(subCategory.Name || "")}/${createSlug(thirdLevel.Name || "")}`}
                                    onClick={handleNavigate}
                                  >
                                    {formatChildCategoryName(thirdLevel.Name)}
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
