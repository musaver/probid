"use client";
import AuctionFilterSidebar from '@/components/auction/AuctionFilterSidebar'
import React, { useState } from 'react'
import auctionCardData from "@/data/auction-card.json";
import SelectComponent from '@/components/common/SelectComponent';
import { useCountdownTimer } from '@/customHooks/useCountdownTimer';
import Link from 'next/link';
const products = auctionCardData["products"]

const ArtAucitonGrid = () => {
  const [activeColumn, setActiveColumn] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { days, hours, minutes, seconds } = useCountdownTimer("2024-08-23 11:42:00");
    const sortOptions = [
      "Default Sorting",
      "Price Low to High",
      "Price High to Low",
    ];
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
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
    <AuctionFilterSidebar isMenuOpen={isMenuOpen}/>
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
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img1.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-23 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content">
        <h6><Link href="/art-auction/auction-details">Masterpiece Marketplace Art Auction Extra.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$2,898</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">
            Bid Now
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img2.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="upcoming">
            <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
            </svg>
            UPCOMING
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-08 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Palette on Perfection Primer Art Auction Event.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$4,648</strong>
          </div>
          <Link href="/art-auction/auction-details2" className="bid-btn">Notify Me</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img3.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-08 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Brushstroke &amp; Bids Exclusive Art Auction.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$8,974</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">Bid Now</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img4.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-11-15 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Artistry in Auction Celebratin Creative Excellence.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$5,237</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">Bid Now</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img5.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="upcoming">
            <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
            </svg>
            UPCOMING
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-11-05 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Auction of Elegance Fine Art and Antiques.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$5,250</strong>
          </div>
          <Link href="/art-auction/auction-details2" className="bid-btn">Notify Me</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img6.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-11-15 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Art &amp; Bidding Contemporary  Auction.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$5,237</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">Bid Now</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img7.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="upcoming">
            <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
            </svg>
            UPCOMING
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-11-20 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Artisan Auctions Showcasing Artistic Brilliance.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$2,898</strong>
          </div>
          <Link href="/art-auction/auction-details2" className="bid-btn">Notify Me</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img8.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-15 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Gallery Gavel Prestigious Art Auction Series.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$8,974</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">Bid Now</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img9.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-23 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content">
        <h6><Link href="/art-auction/auction-details">Canvas Conclavi Elite Auction Art Experience.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$2,898</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">
            Bid Now
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img10.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="upcoming">
            <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
            </svg>
            UPCOMING
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-08 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Masterworks Auctions Where Art Finds a Home.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$4,648</strong>
          </div>
          <Link href="/art-auction/auction-details2" className="bid-btn">Notify Me</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img11.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="live">
            <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
            </svg>
            Live
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-08-05 12:00:00">
            <li className="times" data-days={0}>{days}<span>Days</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content">
        <h6><Link href="/art-auction/auction-details">Brushed Brilliance Modernity Art Auction.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$8,974</strong>
          </div>
          <Link href="/art-auction/auction-details" className="bid-btn">
            Bid Now
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-md-4 item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
    <div className="auction-card style-4">
      <div className="auction-card-img-wrap">
        <Link href="/art-auction/auction-details" className="card-img">
          <img src="../assets/img/home4/auction-img12.jpg" alt="" />
        </Link>
        <div className="batch">
          <span className="upcoming">
            <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.731707 3.29268H0V7.46341C0 8.30488 0.695122 9 1.53659 9H7.46341C8.30488 9 9 8.30488 9 7.46341V3.29268H8.26829H0.731707ZM5.67073 4.84756C5.79878 4.70122 6.05488 4.71951 6.18293 4.84756C6.58537 5.21341 6.96951 5.57927 7.37195 5.96342C7.51829 6.10976 7.5 6.34756 7.37195 6.47561C7.0061 6.87805 6.64024 7.2622 6.2561 7.66463C6.10976 7.81098 5.87195 7.79268 5.7439 7.66463C5.59756 7.53659 5.61585 7.28049 5.7439 7.15244C6.01829 6.84146 6.31098 6.54878 6.58537 6.23781C6.27439 5.94512 5.96341 5.65244 5.65244 5.37805C5.5061 5.21342 5.52439 4.97561 5.67073 4.84756ZM4.20732 4.84756C4.33537 4.70122 4.59146 4.71951 4.71951 4.84756C5.12195 5.21341 5.5061 5.57927 5.90854 5.96342C6.05488 6.10976 6.03658 6.34756 5.90854 6.47561C5.54268 6.87805 5.17683 7.2622 4.79268 7.66463C4.64634 7.81098 4.40854 7.79268 4.28049 7.66463C4.13415 7.53659 4.15244 7.28049 4.28049 7.15244C4.55488 6.84146 4.84756 6.54878 5.12195 6.23781C4.81098 5.94512 4.5 5.65244 4.18902 5.37805C4.04268 5.21342 4.06098 4.97561 4.20732 4.84756ZM8.26829 2.56098H9V1.53659C9 0.713415 8.34146 0.0365854 7.51829 0V0.841463C7.51829 1.04268 7.35366 1.20732 7.15244 1.20732C6.95122 1.20732 6.78658 1.02439 6.78658 0.841463V0H2.26829V0.804878C2.26829 1.0061 2.10366 1.17073 1.90244 1.17073C1.70122 1.17073 1.53659 0.987805 1.53659 0.804878V0C0.695122 0 0 0.695122 0 1.53659V2.56098H0.731707H8.26829Z" />
            </svg>
            UPCOMING
          </span>
          <div className="code-no">
            <span className="code">Lot # 25896742</span>
          </div>
        </div>
        <ul className="view-and-favorite-area">
          <li>
            <a href="#">
              <svg width={16} height={15} viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00013 3.32629L7.32792 2.63535C5.75006 1.01348 2.85685 1.57317 1.81244 3.61222C1.32211 4.57128 1.21149 5.95597 2.10683 7.72315C2.96935 9.42471 4.76378 11.4628 8.00013 13.6828C11.2365 11.4628 13.03 9.42471 13.8934 7.72315C14.7888 5.95503 14.6791 4.57128 14.1878 3.61222C13.1434 1.57317 10.2502 1.01254 8.67234 2.63441L8.00013 3.32629ZM8.00013 14.8125C-6.375 5.31378 3.57406 -2.09995 7.83512 1.8216C7.89138 1.87317 7.94669 1.9266 8.00013 1.98192C8.05303 1.92665 8.10807 1.87349 8.16513 1.82254C12.4253 -2.10182 22.3753 5.31284 8.00013 14.8125Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg width={17} height={11} viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4028 5.44118C14.0143 7.8425 11.3811 9.33421 8.53217 9.33421C5.68139 9.33421 3.04821 7.8425 1.65968 5.44118C1.55274 5.25472 1.55274 5.05762 1.65968 4.87132C3.04821 2.47003 5.68139 0.978484 8.53217 0.978484C11.3811 0.978484 14.0143 2.47003 15.4028 4.87132C15.5116 5.05762 15.5116 5.25472 15.4028 5.44118ZM16.2898 4.39522C14.7224 1.68403 11.7499 0 8.53217 0C5.31258 0 2.3401 1.68403 0.772715 4.39522C0.492428 4.87896 0.492428 5.43355 0.772715 5.91693C2.3401 8.62812 5.31258 10.3125 8.53217 10.3125C11.7499 10.3125 14.7224 8.62812 16.2898 5.91693C16.5701 5.43358 16.5701 4.87896 16.2898 4.39522ZM8.53217 7.1634C9.68098 7.1634 10.6159 6.26305 10.6159 5.15617C10.6159 4.04929 9.68098 3.14894 8.53217 3.14894C7.38152 3.14894 6.44663 4.04929 6.44663 5.15617C6.44663 6.26305 7.38156 7.1634 8.53217 7.1634ZM8.53217 2.17045C6.82095 2.17045 5.43061 3.50998 5.43061 5.1562C5.43061 6.80278 6.82098 8.14176 8.53217 8.14176C10.2416 8.14176 11.6319 6.80275 11.6319 5.1562C11.6319 3.50998 10.2416 2.17045 8.53217 2.17045Z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="countdown-timer">
          <ul data-countdown="2024-10-26 12:00:00">
            <li className="times" data-days={0}></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-hours={0}>{hours}<span>Hours</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-minutes={0}>{minutes}<span>Min</span></li>
            <li className="colon">
              :
            </li>
            <li className="times" data-seconds={0}>{seconds}<span>Sec</span></li>
          </ul>
        </div>
      </div>
      <div className="auction-card-content"> 
        <h6><Link href="/art-auction/auction-details">Auction House of Art Premier Auction Event.</Link></h6>
        <div className="price-and-code-area">
          <div className="price">
            <span>Current Bid at:</span>
            <strong>$5,237</strong>
          </div>
          <Link href="/art-auction/auction-details2" className="bid-btn">Notify Me</Link>
        </div>
      </div>
    </div>
  </div>
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
  )
}

export default ArtAucitonGrid