"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { createSlug } from "@/utils";
import type { SanitizedCategory } from "@/lib/actions/category.actions";

// Define props interface
interface CategoryItemProps {
  categories: SanitizedCategory[];
  onClose?: () => void;
}

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
            const hasGroupChildren = !!category.children && category.children.length > 0;
            const groupIsOpen = openGroup === i;
            return (
              <div
                key={category._id}
                className={`group ${hasGroupChildren ? "has-dropdown" : ""} ${groupIsOpen ? "open" : ""}`}
              >
                <div className="item-row">
                  {hasGroupChildren ? (
                    <button
                      type="button"
                      className="toggle-btn item-btn p-3"
                      aria-label={`Toggle ${category.name}`}
                      aria-expanded={groupIsOpen}
                      onClick={() => toggleGroup(i)}
                    >
                      <span className="label text-capitalize">{category.name}</span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`chev ${groupIsOpen ? "rot" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      className="item-link text-capitalize p-3 d-flex align-items-center justify-content-between"
                      href={`/category/${createSlug(category.name)}`}
                      onClick={handleNavigate}
                    >
                      <span className="label">{category.name}</span>
                    </Link>
                  )}
                </div>

                {hasGroupChildren && (
                  <div className="submenu">
                    {category.children!.map((subCategory, j) => {
                      const subKey = `${i}-${j}`;
                      const hasChildren = !!subCategory.children?.length;
                      const subIsOpen = openSub === subKey;
                      return (
                        <div
                          key={subCategory._id}
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
                                href={`/category/${createSlug(category.name)}/${createSlug(subCategory.name)}`}
                                onClick={handleNavigate}
                              >
                                <span className="label">{subCategory.name}</span>
                              </Link>
                            )}
                          </div>

                          {hasChildren && (
                            <div className="submenu">
                              {subCategory.children!.map((thirdLevel) => (
                                <div key={thirdLevel._id} className="leaf">
                                  <Link
                                    className="item-link text-capitalize p-3 d-block"
                                    href={`/category/${createSlug(category.name)}/${createSlug(subCategory.name)}/${createSlug(thirdLevel.name)}`}
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
