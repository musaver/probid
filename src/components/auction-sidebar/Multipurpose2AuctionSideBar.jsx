"use client";
import auctionCardData from "@/data/auction-card.json";
import SelectComponent from "@/components/common/SelectComponent";
import AuctionCard from "@/components/auction/auction-card";
const products = auctionCardData["products"]
import React, {useState } from "react";
import Link from "next/link";
import SingleSearchBox from "@/components/common/SingleSearchBox";
const Multipurpose2AuctionSideBar = () => {

  const [activeColumn, setActiveColumn] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);

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

  const condition = ["New", "Used", "Refurbished"];
  const countries = ["Spain", "France", "Brazil", "Bangladesh"];
  const period = [
    "Today  (110)",
    "Yesterday (115)",
    "Last 7 Days (515)",
    "Last 30 Days (945)",
  ];
  const sales = ["Online", "In-Store", "Phone Order", "Email Order"];
  return (
    <>
    <div className="auction-grid-sidebar-section pt-110 mb-110">
      <div className="container">
        <div className="row gy-5">
        <div className="col-xl-3 order-xl-1 order-2">
              <div className="auction-sidebar">
                <form>
                  <div className="single-widget mb-30">
                    <div className="search-box">
                      <input type="text" placeholder="Search" />
                      <button type="submit">
                        <i className="bx bx-search" />
                      </button>
                    </div>
                  </div>
                  <div className="single-widget mb-30">
                    <SingleSearchBox
                      placeholder="Online"
                      options={sales}
                      label="Sales"
                      variant="two"
                    />
                  </div>
                  <div className="single-widget mb-30">
                    <h5 className="widget-title">Category</h5>
                    <div className="checkbox-container">
                      <ul>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Automotive</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Antiques</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Digital Art</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Books &amp; Comic</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Old Coin</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Gadget and Technology</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-widget mb-30">
                    <SingleSearchBox
                      placeholder="Country"
                      options={countries}
                      label="Country"
                      variant="two"
                    />
                  </div>
                  <div className="single-widget mb-30">
                    <SingleSearchBox
                      placeholder="Today  (110)"
                      options={period}
                      label="Period"
                      variant="two"
                    />
                  </div>
                  <div className="single-widget mb-30">
                    <SingleSearchBox
                      placeholder="New"
                      options={condition}
                      label="Condition"
                      variant="two"
                    />
                  </div>
                   
                  <div className="single-widget mb-30">
                    <h5 className="widget-title">Type Of Sales</h5>
                    <div className="checkbox-container">
                      <ul>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Upcoming</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Latest</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Highest Bidding</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Live Auction</span>
                          </label>
                        </li>
                        <li>
                          <label className="containerss">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span>Popular</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
                <div className="single-widget">
                  <h5 className="widget-title">Highest Bidding</h5>
                  <div className="highest-bidding-widget mb-20">
                    <div className="highest-bidding-img">
                      <Link href="/antiques-auction/auction-details">
                        <img
                          src="/assets/img/inner-pages/highest-bidding-img1.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="highest-bidding-content">
                      <h6>
                        <Link href="/antiques-auction/auction-details">
                          Poutsicle Hydratingani Stain offering.
                        </Link>
                      </h6>
                      <div className="price-area">
                        <span>Current Bid at:</span>
                        <strong>$4,648</strong>
                      </div>
                    </div>
                  </div>
                  <div className="highest-bidding-widget mb-20">
                    <div className="highest-bidding-img">
                      <Link href="/antiques-auction/auction-details">
                        <img
                          src="/assets/img/inner-pages/highest-bidding-img2.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="highest-bidding-content">
                      <h6>
                        <Link href="/antiques-auction/auction-details">
                          Heritage Had Curating Watch.
                        </Link>
                      </h6>
                      <div className="price-area">
                        <span>Current Bid at:</span>
                        <strong>$2,458</strong>
                      </div>
                    </div>
                  </div>
                  <div className="highest-bidding-widget">
                    <div className="highest-bidding-img">
                      <Link href="/antiques-auction/auction-details">
                        <img
                          src="/assets/img/inner-pages/highest-bidding-img3.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="highest-bidding-content">
                      <h6>
                        <Link href="/antiques-auction/auction-details">
                          Art decorat bronze sculpture.
                        </Link>
                      </h6>
                      <div className="price-area">
                        <span>Current Bid at:</span>
                        <strong>$2,878</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="col-xl-9 order-xl-2 order-1">
            <div className="auction-grid-title-section mb-40">
            <h6>
                Showing{" "}
                {currentPage === 1 ? 1 : (currentPage - 1) * productsPerPage + 1}–
                {Math.min(currentPage * productsPerPage, totalProducts)} of{" "}
                {totalProducts} results
              </h6>
              <div className="filter-selector">
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
                </ul>
              </div>
            </div>
            <div
              className={`list-grid-product-wrap column-${
                activeColumn === 2
                  ? "2"
                  : activeColumn === 3
                  ? "3"
                  : "3"
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
      </div>
    </div>
   </>
  )
}

export default Multipurpose2AuctionSideBar
