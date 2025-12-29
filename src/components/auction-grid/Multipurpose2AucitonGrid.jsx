"use client";
import AuctionFilterSidebar from "@/components/auction/AuctionFilterSidebar";
import AuctionCard from "@/components/auction/auction-card";
import React, { useEffect, useState } from "react";
import auctionCardData from "@/data/auction-card.json";
import SelectComponent from "@/components/common/SelectComponent";
const products = auctionCardData["products"];
const Multipurpose2AucitonGrid = () => {
  const [activeColumn, setActiveColumn] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const sortOptions = [
    "Default Sorting",
    "Price Low to High",
    "Price High to Low",
  ];

  const productsPerPage = 8; // Number of products per page
  const totalProducts = products.length;

  const handleColumnClick = (columnNumber) => {
    setActiveColumn(columnNumber);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <AuctionFilterSidebar isMenuOpen={isMenuOpen} />
      <div className="auction-grid-section pt-110 mb-110">
        <div className="container">
          <div className="auction-grid-title-section mb-40">
            <h6>
              Showing{" "}
              {currentPage === 1 ? 1 : (currentPage - 1) * productsPerPage + 1}–
              {Math.min(currentPage * productsPerPage, totalProducts)} of{" "}
              {totalProducts} results
            </h6>
            <div className="filter-selector">
              <div className="filter" onClick={toggleMenu}>
                <div className="filter-icon">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_456_25)">
                      <path d="M0.5625 3.17317H9.12674C9.38486 4.34806 10.4341 5.2301 11.6853 5.2301C12.9366 5.2301 13.9858 4.3481 14.2439 3.17317H17.4375C17.7481 3.17317 18 2.92131 18 2.61067C18 2.30003 17.7481 2.04817 17.4375 2.04817H14.2437C13.9851 0.873885 12.9344 -0.00871277 11.6853 -0.00871277C10.4356 -0.00871277 9.38545 0.873744 9.12695 2.04817H0.5625C0.251859 2.04817 0 2.30003 0 2.61067C0 2.92131 0.251859 3.17317 0.5625 3.17317ZM10.191 2.61215L10.191 2.6061C10.1935 1.78461 10.8638 1.11632 11.6853 1.11632C12.5057 1.11632 13.1761 1.78369 13.1796 2.6048L13.1797 2.61306C13.1784 3.43597 12.5086 4.10513 11.6853 4.10513C10.8625 4.10513 10.1928 3.43663 10.191 2.61422L10.191 2.61215ZM17.4375 14.8268H14.2437C13.985 13.6525 12.9344 12.7699 11.6853 12.7699C10.4356 12.7699 9.38545 13.6524 9.12695 14.8268H0.5625C0.251859 14.8268 0 15.0786 0 15.3893C0 15.7 0.251859 15.9518 0.5625 15.9518H9.12674C9.38486 17.1267 10.4341 18.0087 11.6853 18.0087C12.9366 18.0087 13.9858 17.1267 14.2439 15.9518H17.4375C17.7481 15.9518 18 15.7 18 15.3893C18 15.0786 17.7481 14.8268 17.4375 14.8268ZM11.6853 16.8837C10.8625 16.8837 10.1928 16.2152 10.191 15.3928L10.191 15.3908L10.191 15.3847C10.1935 14.5632 10.8638 13.8949 11.6853 13.8949C12.5057 13.8949 13.1761 14.5623 13.1796 15.3834L13.1797 15.3916C13.1785 16.2146 12.5086 16.8837 11.6853 16.8837ZM17.4375 8.43751H8.87326C8.61514 7.26262 7.56594 6.38062 6.31466 6.38062C5.06338 6.38062 4.01418 7.26262 3.75606 8.43751H0.5625C0.251859 8.43751 0 8.68936 0 9.00001C0 9.31068 0.251859 9.56251 0.5625 9.56251H3.75634C4.01498 10.7368 5.06559 11.6194 6.31466 11.6194C7.56439 11.6194 8.61455 10.7369 8.87305 9.56251H17.4375C17.7481 9.56251 18 9.31068 18 9.00001C18 8.68936 17.7481 8.43751 17.4375 8.43751ZM7.80901 8.99853L7.80898 9.00458C7.80652 9.82607 7.13619 10.4944 6.31466 10.4944C5.49429 10.4944 4.82393 9.82699 4.82038 9.00591L4.82027 8.99769C4.8215 8.17468 5.49141 7.50562 6.31466 7.50562C7.13753 7.50562 7.80718 8.17408 7.80905 8.99653L7.80901 8.99853Z" />
                    </g>
                  </svg>
                </div>
                <span>Filters</span>
              </div>
              <div className="selector">
                <SelectComponent
                  options={sortOptions}
                  placeholder="Sort by price"
                />
              </div>
              <ul className="grid-view">
                <li
                  className={`column-2 ${activeColumn === 2 ? "active" : ""}`}
                  onClick={() => handleColumnClick(2)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={20}
                    viewBox="0 0 12 20"
                  >
                    <g>
                      <rect width="4.88136" height="5.10638" rx="2.44068" />
                      <rect
                        y="7.44678"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        y="14.8937"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        y="7.44678"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                      <rect
                        x="7.11865"
                        y="14.8937"
                        width="4.88136"
                        height="5.10638"
                        rx="2.44068"
                      />
                    </g>
                  </svg>
                </li>
                <li
                  className={`column-3 ${activeColumn === 3 ? "active" : ""}`}
                  onClick={() => handleColumnClick(3)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <g clipPath="url(#clip0_1610_1442)">
                      <rect width="5.10638" height="5.10638" rx="2.55319" />
                      <rect
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="7.44678"
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        y="7.44678"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                      <rect
                        x="14.8936"
                        y="14.8937"
                        width="5.10638"
                        height="5.10638"
                        rx="2.55319"
                      />
                    </g>
                  </svg>
                </li>
                <li
                  className={`column-4 ${activeColumn === 4 ? "active" : ""}`}
                  onClick={() => handleColumnClick(4)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                  >
                    <g clipPath="url(#clip0_1610_1453)">
                      <rect width="3.64741" height="3.64741" rx="1.8237" />
                      <rect
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="5.31909"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6382"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6384"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        y="8.17627"
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="10.6382"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                      <rect
                        x="16.3525"
                        y={16}
                        width="3.64741"
                        height="3.64741"
                        rx="1.8237"
                      />
                    </g>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`list-grid-product-wrap column-${
              activeColumn === 2
                ? "2"
                : activeColumn === 3
                ? "3"
                : activeColumn === 4
                ? "4"
                : "4"
            }-wrapper`}
          >
            <div className="row g-4 mb-60">
              {displayedProducts.map((item) => {
                return (
                  <div
                    key={item.auctionId}
                    className="col-xl-3 col-md-4 item wow animate fadeInDown"
                    data-wow-delay="200ms"
                    data-wow-duration="1500ms"
                  >
                    <AuctionCard item={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-12 d-flex justify-content-center wow animate fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-pagination-area">
                <ul className="paginations">
                  <li
                    onClick={handlePreviousPage}
                    className={`page-item paginations-button ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a href="#">
                      <svg
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.557 10.1026L1.34284 1.89603M15.557 10.1026C12.9386 8.59083 10.8853 3.68154 12.7282 0.489511M15.557 10.1026C12.9386 8.59083 7.66029 9.2674 5.81744 12.4593"
                          stroke-width="0.96"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </li>
                  {Array.from(
                    { length: Math.ceil(totalProducts / productsPerPage) },
                    (_, index) => (
                      <li
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`page-item ${
                          index + 1 === currentPage ? "active" : ""
                        }`}
                      >
                        <a href="#">{index + 1}</a>
                      </li>
                    )
                  )}
                  <li
                    onClick={handleNextPage}
                    className={`page-item paginations-button ${
                      currentPage === Math.ceil(totalProducts / productsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <a href="#">
                      <svg
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.557 10.1026L1.34284 1.89603M15.557 10.1026C12.9386 8.59083 10.8853 3.68154 12.7282 0.489511M15.557 10.1026C12.9386 8.59083 7.66029 9.2674 5.81744 12.4593"
                          stroke-width="0.96"
                          stroke-linecap="round"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Multipurpose2AucitonGrid;
