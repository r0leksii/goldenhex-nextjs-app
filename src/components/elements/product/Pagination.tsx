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

  const paginationItems = [];

  // Loop through totalPages and generate pagination elements
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    // Create a new URLSearchParams object based on the current ones
    const newParams = new URLSearchParams(searchParams.toString());
    // Set the 'page' parameter for this specific link
    newParams.set("page", pageNumber.toString());

    // Construct the href for the Link
    const href = `?${newParams.toString()}`;

    paginationItems.push(
      <li
        className={pageNumber === currentPage ? "active" : ""}
        key={pageNumber}
      >
        <Link href={href} onClick={() => setPage(pageNumber)}>
          {pageNumber < 10 ? "0" + pageNumber : pageNumber}
        </Link>
      </li>
    );
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
