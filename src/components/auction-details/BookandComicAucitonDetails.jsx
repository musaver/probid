"use client";
import auctionCardData from "@/data/auction-card.json";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { useCountdownTimer } from "@/customHooks/useCountdownTimer";
import AuctionCard from "@/components/auction/auction-card";
import HandleQuantity from "@/components/common/HandleQuantity";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const BookandComicAucitonDetails = () => {
    const { days, hours, minutes, seconds } = useCountdownTimer(
    "2024-08-23 11:42:00"
  );
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 15,
      grabCursor: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".category-slider-next",
        prevEl: ".category-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 2,
        },
        350: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 5,
        },
      },
    };
  }, []);
  const settingsForUpcomingAuction = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".auction-slider-next",
        prevEl: ".auction-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    };
  }, []);
  return (
    <>
        <div className="auction-details-section style-2 pt-110 mb-110">
        <div className="container-fluid">
          <div className="row gy-5">
            <div className="col-xl-7">
              <div className="auction-details-img">
                <ul
                  className="nav nav-pills order-xl-1 order-2"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="v-pills-img1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-img1"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-img1"
                      aria-selected="true"
                    >
                      <img
                        src="/assets/img/inner-pages/auction-details2-img1.jpg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="v-pills-img2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-img2"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-img2"
                      aria-selected="false"
                    >
                      <img
                        src="/assets/img/inner-pages/auction-details2-img2.jpg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="v-pills-img3-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-img3"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-img3"
                      aria-selected="false"
                    >
                      <img
                        src="/assets/img/inner-pages/auction-details2-img3.jpg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="v-pills-img4-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-img4"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-img4"
                      aria-selected="false"
                    >
                      <img
                        src="/assets/img/inner-pages/auction-details2-img4.jpg"
                        alt=""
                      />
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="v-pills-img5-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-img5"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-img5"
                      aria-selected="false"
                    >
                      <img
                        src="/assets/img/inner-pages/auction-details2-img5.jpg"
                        alt=""
                      />
                    </button>
                  </li>
                </ul>
                <div
                  className="tab-content order-xl-2 order-1"
                  id="v-pills-tabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-img1"
                    role="tabpanel"
                  >
                    <div className="auction-details-tab-img">
                      <img
                        src="/assets/img/inner-pages/auction-details2-img1.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-img2"
                    role="tabpanel"
                  >
                    <div className="auction-details-tab-img">
                      <img
                        src="/assets/img/inner-pages/auction-details2-img2.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-img3"
                    role="tabpanel"
                    aria-labelledby="v-pills-img3-tab"
                  >
                    <div className="auction-details-tab-img">
                      <img
                        src="/assets/img/inner-pages/auction-details2-img3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-img4"
                    role="tabpanel"
                    aria-labelledby="v-pills-img4-tab"
                  >
                    <div className="auction-details-tab-img">
                      <img
                        src="/assets/img/inner-pages/auction-details2-img4.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-img5"
                    role="tabpanel"
                    aria-labelledby="v-pills-img5-tab"
                  >
                    <div className="auction-details-tab-img">
                      <img
                        src="/assets/img/inner-pages/auction-details2-img5.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="auction-details-content">
                <div className="batch">
                  <span>Lot: # 25896742</span>
                </div>
                <h1>
                  Zenith Auto Elevating Driving Your Automotive Experience
                </h1>
                <p>
                  Aptent tacit sociosq litor torquen per conubia nostra, per
                  incep placerat felis non aliquam.Mauris nec justo vitae ante
                  auctor.
                </p>
                <div className="price-area">
                  <span>Current Bid at:</span>
                  <strong>$2,898</strong>
                </div>
                <div className="coundown-area">
                  <h6>Auction Will Be End:</h6>
                  <div className="countdown-timer">
                    <ul data-countdown="2024-08-24 12:00:00">
                      <li data-days={0}>
                        {days} <span>Days</span> <span>Days</span>
                      </li>
                      <li className="clone">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={4}
                          height={13}
                          viewBox="0 0 4 13"
                        >
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-hours={0}>
                        {hours} <span>Hours</span> <span>Hours</span>
                      </li>
                      <li className="clone">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={4}
                          height={13}
                          viewBox="0 0 4 13"
                        >
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-minutes={0}>
                        {minutes} <span>Mint</span> <span>Minutes</span>
                      </li>
                      <li className="clone">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={4}
                          height={13}
                          viewBox="0 0 4 13"
                        >
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-seconds={0}>
                        {seconds} <span>Sec</span> <span>Seconds</span>
                      </li>
                    </ul>
                  </div>
                  <span>
                    <strong>Ending On:</strong> August 22, 2024 11:42 am
                  </span>
                </div>
                <div className="quantity-area">
                  <h6>Your Max Bid:</h6>
                  <div className="quantity-counter-and-btn-area">
                    <HandleQuantity />

                    <Link
                      className="primary-btn btn-hover"
                      href="/book-and-comic/auction-grid"
                    >
                      Place Bid
                      <span style={{ top: "40.5px", left: "84.2344px" }} />
                    </Link>
                  </div>
                </div>
                <div className="payment-method">
                  <h6>Guaranted Safe Checkout</h6>
                  <ul className="payment-card-list">
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img1.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img2.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img3.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img4.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img5.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img6.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="/assets/img/inner-pages/payment-img7.svg"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
                <ul className="question-and-wishlist-area">
                  <li>
                    <Link href="/book-and-comic/contact">
                      <span>
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="M5.5 0C2.46015 0 0 2.45988 0 5.5C0 8.5398 2.45988 11 5.5 11C8.53985 11 11 8.54012 11 5.5C11 2.46015 8.54012 0 5.5 0ZM5.5 10.2326C2.89046 10.2326 0.767443 8.10956 0.767443 5.5C0.767443 2.89044 2.89046 0.767443 5.5 0.767443C8.10956 0.767443 10.2326 2.89044 10.2326 5.5C10.2326 8.10956 8.10956 10.2326 5.5 10.2326Z" />
                            <path d="M5.337 6.95948C5.03293 6.95948 4.78679 7.21287 4.78679 7.51692C4.78679 7.81377 5.02569 8.07439 5.337 8.07439C5.64831 8.07439 5.89443 7.81377 5.89443 7.51692C5.89443 7.21287 5.64105 6.95948 5.337 6.95948ZM5.4311 2.73877C4.45373 2.73877 4.00488 3.31797 4.00488 3.7089C4.00488 3.99124 4.24379 4.12157 4.43925 4.12157C4.83021 4.12157 4.67094 3.56409 5.40938 3.56409C5.77135 3.56409 6.06096 3.72338 6.06096 4.05641C6.06096 4.44734 5.65553 4.67176 5.41662 4.87447C5.20665 5.05543 4.93157 5.35228 4.93157 5.9749C4.93157 6.35135 5.03293 6.45995 5.32974 6.45995C5.68447 6.45995 5.75687 6.30069 5.75687 6.1631C5.75687 5.78665 5.76411 5.56947 6.1623 5.25816C6.35777 5.10613 6.97312 4.61382 6.97312 3.9333C6.97312 3.25278 6.35777 2.73877 5.4311 2.73877Z" />
                          </g>
                        </svg>
                      </span>
                      Ask a question
                    </Link>
                  </li>
                  <li>
                    <a href="#">
                      <span>
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_168_378)">
                            <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                          </g>
                        </svg>
                      </span>
                      Add to wishlist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auction-details-description-area style-2 mb-110">
        <div className="container">
          <div className="auction-details-description-nav mb-50">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-description"
                  type="button"
                  role="tab"
                  aria-controls="nav-description"
                  aria-selected="true"
                >
                  Description
                </button>
                <button
                  className="nav-link"
                  id="nav-add-info-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-add-info"
                  type="button"
                  role="tab"
                  aria-controls="nav-add-info"
                  aria-selected="false"
                >
                  Additional Information
                </button>
                <button
                  className="nav-link"
                  id="nav-reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-reviews"
                  type="button"
                  role="tab"
                  aria-controls="nav-reviews"
                  aria-selected="false"
                >
                  Reviews (15)
                </button>
              </div>
            </nav>
          </div>
          <div className="auction-details-description-tab">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-description"
                role="tabpanel"
                aria-labelledby="nav-description-tab"
              >
                <div className="description-content">
                  <h2>About Product</h2>
                  <p>
                    Urna Aenean onewaryzo eleifend vitae tellus a facilisis.
                    Nunc posuere at augue eget port. Inei odion goat tellus,
                    dignissim fermentumara purus nec, consequat dapibus metus.
                    Vav urna worlda mauris, goat te faucibus at egestas quis,
                    fermentum egetonav neque. Dphare lectus nec risusonl
                    pellentesque, opi vitae aliquet nisi dapibus. Sed volutpat
                    mi velit.
                  </p>
                  <div className="video-wrapper">
                    <img
                      src="/assets/img/inner-pages/auction-details-video-img.jpg"
                      alt=""
                    />
                    <a
                      href="https://www.youtube.com/watch?v=_P8N0SQpE-0"
                      className="video-area video-player"
                    >
                      <div className="icon">
                        <svg
                          className="video-circle"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          width="65px"
                          viewBox="0 0 206 206"
                          style={{ enableBackground: "new 0 0 206 206" }}
                          xmlSpace="preserve"
                        >
                          <circle
                            className="circle"
                            strokeMiterlimit={10}
                            cx={103}
                            cy={103}
                            r={100}
                          />
                          <path
                            className="circle-half top-half"
                            strokeWidth={4}
                            strokeMiterlimit={10}
                            d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6"
                          />
                          <path
                            className="circle-half bottom-half"
                            strokeWidth={4}
                            strokeMiterlimit={10}
                            d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53"
                          />
                        </svg>
                        <i className="bi bi-play" />
                      </div>
                    </a>
                  </div>
                  <ul>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Paraben-Free
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Sulfate-Free
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Clean at Sephora
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Clean at Sephora
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Fragrance Free
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Cruelty-Free
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Antioxidants
                    </li>
                    <li>
                      <svg
                        width={13}
                        height={11}
                        viewBox="0 0 13 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.2986 0.0327999C9.89985 0.832756 6.86143 2.97809 4.03623 6.6688L2.36599 4.778C2.09946 4.4871 1.63748 4.4871 1.38872 4.778L0.162693 6.17792C-0.0682981 6.45063 -0.0505298 6.86879 0.19823 7.12332L3.96516 10.814C4.28499 11.1231 4.78251 11.0322 4.99574 10.6504C7.00358 6.92333 9.17134 4.15985 12.7961 0.996384C13.2581 0.596406 12.8672 -0.167189 12.2986 0.0327999Z" />
                      </svg>
                      Antioxidants
                    </li>
                  </ul>
                  <p>
                    Urna Aenean onewaryzo eleifend vitae tellus a facilisis.
                    Nunc posuere at augue eget port. Inei odion goat tellus,
                    dignissim fermentumara purus nec, consequat dapibus metus.
                    Vav urna worlda mauris, goat te faucibus at egestas quis,
                    fermentum egetonav neque. Dphare lectus nec risusonl
                    pellentesque, opi vitae aliquet nisi dapibus. Sed volutpat
                    mi velit.
                  </p>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-add-info"
                role="tabpanel"
                aria-labelledby="nav-add-info-tab"
              >
                <div className="addithonal-information">
                  <table className="table total-table2">
                    <tbody>
                      <tr>
                        <td>
                          <span>SKU</span>
                        </td>
                        <td>123ABC</td>
                      </tr>
                      <tr>
                        <td>
                          <span>Category</span>
                        </td>
                        <td>Car</td>
                      </tr>
                      <tr>
                        <td>
                          <span>Tags</span>
                        </td>
                        <td>Car, Digital Art, Book</td>
                      </tr>
                      <tr>
                        <td>
                          <span>Weight</span>
                        </td>
                        <td>20 gm</td>
                      </tr>
                      <tr>
                        <td>
                          <span>Dimensions</span>
                        </td>
                        <td>2 × 4 × 5 cm</td>
                      </tr>
                      <tr>
                        <td>
                          <span>Brand</span>
                        </td>
                        <td>BMW </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-reviews"
                role="tabpanel"
                aria-labelledby="nav-reviews-tab"
              >
                <div className="reviews-area">
                  <div className="row g-lg-4 gy-5">
                    <div className="col-lg-7">
                      <div className="number-of-review">
                        <h4>Review (03) :</h4>
                      </div>
                      <div className="review-list-area">
                        <ul className="comment">
                          <li>
                            <div className="single-comment-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/inner-pages/comment-author-01.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="comment-content">
                                <div className="author-and-review">
                                  <div className="author-name-deg">
                                    <h6>Mr. Bowmik Haldar,</h6>
                                    <span>12 January, 2024</span>
                                  </div>
                                  <ul className="review d-flex flex-row align-items-center">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  However, here are some well-regarded car
                                  dealerships known for their customer service,
                                  inventory, and overall reputation. It's always
                                  a good idea to research and read reviews
                                  specific...
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-comment-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/inner-pages/comment-author-02.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="comment-content">
                                <div className="author-and-review">
                                  <div className="author-name-deg">
                                    <h6>Srileka Panday,</h6>
                                    <span>05 March, 2024</span>
                                  </div>
                                  <ul className="review d-flex flex-row align-items-center">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star" />
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  However, here are some well-regarded car
                                  dealerships known for their customer service,
                                  inventory, and overall reputation. It's always
                                  a good idea to research and read reviews
                                  specific...
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-comment-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/inner-pages/comment-author-03.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="comment-content">
                                <div className="author-and-review">
                                  <div className="author-name-deg">
                                    <h6>Mr. Bowmik Haldar,</h6>
                                    <span>10 March, 2024</span>
                                  </div>
                                  <ul className="review d-flex flex-row align-items-center">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-half" />
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  However, here are some well-regarded car
                                  dealerships known for their customer service,
                                  inventory, and overall reputation. It's always
                                  a good idea to research and read reviews
                                  specific...
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="review-form">
                        <div className="number-of-review">
                          <h4>Write A Review</h4>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-inner2 mb-40">
                                <div className="review-rate-area">
                                  <p>Your Rating</p>
                                  <div className="rate">
                                    <input
                                      type="radio"
                                      id="star5"
                                      name="rate"
                                      defaultValue={5}
                                    />
                                    <label htmlFor="star5" title="text">
                                      5 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star4"
                                      name="rate"
                                      defaultValue={4}
                                    />
                                    <label htmlFor="star4" title="text">
                                      4 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star3"
                                      name="rate"
                                      defaultValue={3}
                                    />
                                    <label htmlFor="star3" title="text">
                                      3 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star2"
                                      name="rate"
                                      defaultValue={2}
                                    />
                                    <label htmlFor="star2" title="text">
                                      2 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star1"
                                      name="rate"
                                      defaultValue={1}
                                    />
                                    <label htmlFor="star1" title="text">
                                      1 star
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner mb-20">
                                <input
                                  type="text"
                                  placeholder="Name*"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner mb-20">
                                <input
                                  type="email"
                                  placeholder="Email*"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner mb-30">
                                <textarea
                                  placeholder="Message..."
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner two">
                                <button
                                  className="primary-btn btn-hover"
                                  type="submit"
                                >
                                  Submit
                                  <span
                                    style={{ top: "40.5px", left: "84.2344px" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="related-aution-section mb-110">
        <div className="container">
          <div
            className="row mb-60 wow animate fadeInDown"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title">
                <h2>
                  Related <span>Auction</span>
                </h2>
              </div>
              <div className="slider-btn-grp">
                <div className="slider-btn auction-slider-prev">
                  <svg
                    width={9}
                    height={15}
                    viewBox="0 0 9 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 7.50009L9 0L3.27273 7.50009L9 15L0 7.50009Z" />
                  </svg>
                </div>
                <div className="slider-btn auction-slider-next">
                  <svg
                    width={9}
                    height={15}
                    viewBox="0 0 9 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 7.50009L0 0L5.72727 7.50009L0 15L9 7.50009Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            className="auction-slider-area wow animate fadeInUp"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="row">
              <div className="col-lg-12">
                <Swiper
                  {...settingsForUpcomingAuction}
                  className="swiper auction-slider"
                >
                  <div className="swiper-wrapper">
                    {auctionCardData["products"]
                      .filter((item) => item.status === "live")
                      .map((item) => {
                        return (
                          <SwiperSlide
                            key={item.auctionId}
                            className="swiper-slide"
                          >
                            <AuctionCard item={item} />
                          </SwiperSlide>
                        );
                      })}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookandComicAucitonDetails