"use client";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const SidebarSearchContent = () => {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchProducts, setSearchProducts] = useState<CartProductType[]>([]);

  const { setProdcutLoadding, setShowSidebar } = useGlobalContext();
  const searchRef = useRef(null);
  const safeSetShowSidebar = setShowSidebar || (() => {});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = searchRef.current as HTMLElement | null;
      if (
        currentRef &&
        currentRef.contains &&
        !currentRef.contains(event.target as Node)
      ) {
        setOpenSearchBox(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchProducts([]);
    setSearchQuery(event.target.value);
    setOpenSearchBox(true);
    if (event.target.value === "") {
      setSearchProducts([]);
      setOpenSearchBox(false);
      setProdcutLoadding(false);
    } else {
      setProdcutLoadding(true);
      // axios
      //   .get(
      //     `${process.env.NEXT_PUBLIC_BASE_URL}product/search-products?search=${event.target.value}&page=${page}&limit=${limit}`
      //   )
      //   .then((res) => {
      //     setSearchProducts(
      //       Array.isArray(res.data.products) ? res.data.products : []
      //     );
      //     setTotalPages(res.data.totalPages);
      //     setCurrentPage(res.data.currentPage);
      //     setProdcutLoadding(false);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //     setSearchProducts([]);
      //     setProdcutLoadding(false);
      //   });
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        ref={searchRef}
        action="#"
        className="p-relative"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          placeholder="What are you searching for?"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <i className="far fa-search"></i>
        </button>

        <div
          className={`search-result-inner search-result-inner-two ${
            openSearchBox
              ? "open_search_box search_wrapper search_wrapper_two"
              : ""
          }`}
        >
          <div className="search-result-2">
            {searchProducts?.length ? (
              <>
                {searchProducts.map((item, index) => (
                  <div
                    key={index}
                    className="search_product header_search_one search_two"
                  >
                    <div className="product_wrapper">
                      <div className="preview_img">
                        <Image
                          src={item?.img}
                          alt="product-img"
                          width={50}
                          height={50}
                          style={{ width: "auto", height: "auto" }}
                        />
                      </div>
                      <div className="single_product">
                        <Link
                          onClick={() => safeSetShowSidebar(false)}
                          href={`/product/${item._id}`}
                        >
                          {item.productName}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SidebarSearchContent;
