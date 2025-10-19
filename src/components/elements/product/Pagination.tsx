import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

interface paginationType {
  Pagination_space: string;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({
  Pagination_space,
  totalPages,
  currentPage,
  setPage,
}: paginationType) => {
  const searchParams = useSearchParams();

  const paginationItems: React.ReactNode[] = [];

  // Helper to build a page <li>
  const makePageItem = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageNumber.toString());
    const href = `?${newParams.toString()}`;
    return (
      <li className={pageNumber === currentPage ? "active" : ""} key={pageNumber}>
        <Link href={href} onClick={() => setPage(pageNumber)}>
          {pageNumber < 10 ? "0" + pageNumber : pageNumber}
        </Link>
      </li>
    );
  };

  // Helper to build Prev/Next
  const makeNavItem = (label: string, targetPage: number, disabled: boolean, key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", targetPage.toString());
    const href = `?${newParams.toString()}`;
    return (
      <li className={disabled ? "disabled" : ""} key={key}>
        <Link href={href} onClick={(e) => { if (disabled) { e.preventDefault(); return; } setPage(targetPage); }}>
          {label}
        </Link>
      </li>
    );
  };

  // Dynamic condensed pagination
  // Patterns:
  // - Early pages (<=3): 1 2 3 4 5 ... last
  // - Middle pages: 1 ... (p-1) p (p+1) ... last
  // - Late pages (>= total-2): 1 ... last-4 last-3 last-2 last-1 last
  const headCount = 3; // how many pages to show at the start/end block
  const showAllThreshold = 5; // for small totals, just show everything

  const pushDots = (key: string) =>
    paginationItems.push(
      <li className="dots" key={key}>
        <span>...</span>
      </li>
    );

  // Add Prev
  const hasPrev = currentPage > 1;
  const prevPage = hasPrev ? currentPage - 1 : 1;
  paginationItems.push(makeNavItem("Prev", prevPage, !hasPrev, "prev"));

  if (totalPages <= showAllThreshold) {
    // Small page counts: show all
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      paginationItems.push(makePageItem(pageNumber));
    }
  } else if (currentPage <= 3) {
    // Early range: include up to currentPage+1 to show the next neighbor
    const end = Math.min(Math.max(headCount, currentPage + 1), totalPages - 1);
    for (let pageNumber = 1; pageNumber <= end; pageNumber++) {
      paginationItems.push(makePageItem(pageNumber));
    }
    if (end < totalPages - 1) {
      pushDots("dots-right");
    }
    paginationItems.push(makePageItem(totalPages));
  } else if (currentPage >= totalPages - 2) {
    // Late range
    const start =
      currentPage === totalPages - 2
        ? Math.max(totalPages - (headCount + 1) + 1, 1) // show one extra page on the left when on last-2
        : Math.max(totalPages - headCount + 1, 1);
    paginationItems.push(makePageItem(1));
    if (start > 2) {
      pushDots("dots-left");
    }
    for (let pageNumber = start; pageNumber <= totalPages; pageNumber++) {
      paginationItems.push(makePageItem(pageNumber));
    }
  } else {
    // Middle range
    paginationItems.push(makePageItem(1));
    pushDots("dots-left");
    const startMid = Math.max(currentPage - 1, 2);
    const endMid = Math.min(currentPage + 1, totalPages - 1);
    for (let pageNumber = startMid; pageNumber <= endMid; pageNumber++) {
      paginationItems.push(makePageItem(pageNumber));
    }
    pushDots("dots-right");
    paginationItems.push(makePageItem(totalPages));
  }

  return (
    <div
      className={`bd-basic__pagination ${
        Pagination_space ? Pagination_space : "mt-30 mb-20"
      }`}
    >
      <nav>
        <ul>{paginationItems}</ul>
      </nav>
    </div>
  );
};

export default Pagination;
