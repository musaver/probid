"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home2PopularAuction = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 15,
      pagination: {
        el: ".progress-pagination2",
        type: "progressbar",
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
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="home2-popular-auction-section mb-110">
        <div className="container-fluid">
          <div className="home2-popular-auction-wrap">
            <div className="highest-bidding-wrap">
              <div className="highest-bidding">
                <div className="row mb-25">
                  <div className="col-lg-12">
                    <div className="section-title">
                      <h2>
                        Highest <span>Bidding.</span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="highest-bidding-card-wrap">
                  <div className="auction-card style-2 mb-25">
                    <div className="auction-card-content">
                      <h6>
                        <Link href="/car-auction/auction-details">
                          Roar Auto Illuminating Your Drive.
                        </Link>
                      </h6>
                      <div className="price-and-code-area">
                        <div className="price">
                          <span>Current Bid at:</span>
                          <strong>$9,648</strong>
                        </div>
                        <div className="batch">
                          <span className="live">
                            <svg
                              width={9}
                              height={9}
                              viewBox="0 0 11 11"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                            </svg>
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="auction-card style-2 mb-25">
                    <div className="auction-card-content">
                      <h6>
                        <Link href="/car-auction/auction-details">
                          Xus Drives Connecting You To The.
                        </Link>
                      </h6>
                      <div className="price-and-code-area">
                        <div className="price">
                          <span>Current Bid at:</span>
                          <strong>$8,325</strong>
                        </div>
                        <div className="batch">
                          <span className="live">
                            <svg
                              width={9}
                              height={9}
                              viewBox="0 0 11 11"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                            </svg>
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="auction-card style-2">
                    <div className="auction-card-content">
                      <h6>
                        <Link href="/car-auction/auction-details">
                          Izon Motors Expanding Your Journey.
                        </Link>
                      </h6>
                      <div className="price-and-code-area">
                        <div className="price">
                          <span>Current Bid at:</span>
                          <strong>$9.245</strong>
                        </div>
                        <div className="batch">
                          <span className="live">
                            <svg
                              width={9}
                              height={9}
                              viewBox="0 0 11 11"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                            </svg>
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="popular-auction-slider-area">
              <div className="row mb-60">
                <div className="col-lg-12">
                  <div className="section-title-and-btn-area d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="section-title">
                      <h2>
                        Popular Auction <span>For You.</span>
                      </h2>
                    </div>
                    <Link className="view-button" href="/auction-grid">
                      View All Auction
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </Link>
                  </div>
                  <div className="progress-pagination2" />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Swiper
                    {...settings}
                    className="swiper home2-popular-auction-slider"
                  >
                    <div className="swiper-wrapper">
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img1.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Horizon Motors Expanding Your Journey.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$2,898</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img2.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Prime Per for Empowering Your Drive.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$6,648</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img3.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Nexus Driveso Connecting You to the Future.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$8,457</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img4.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Aurora Autosi Illuminating Your Driver.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$5,274</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <diSwiperSlidev className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img5.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Eclipse on Car Redefining the Road Ahead.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$7,345</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img6.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Velocity Visions Precision Performance Meets.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$4,648</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </diSwiperSlidev>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img1.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Horizon Motors Expanding Your Journey.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$2,898</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img2.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Prime Per for Empowering Your Drive.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$6,648</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img3.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Nexus Driveso Connecting You to the Future.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$8,457</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img4.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Aurora Autosi Illuminating Your Driver.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$5,274</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2 mb-25">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img5.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Eclipse on Car Redefining the Road Ahead.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$7,345</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link
                              href="/car-auction/auction-details"
                              className="card-img"
                            >
                              <img
                                src="../assets/img/home2/home2-popular-auction-img6.jpg"
                                alt=""
                              />
                            </Link>
                            <div className="batch">
                              <span className="live">
                                <svg
                                  width={11}
                                  height={11}
                                  viewBox="0 0 11 11"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M10.6777 11H4.83398C4.65599 11 4.51172 10.8557 4.51172 10.6777V10.334C4.51172 9.97798 4.80025 9.68944 5.15625 9.68944V9.30414C5.15625 8.79397 5.57133 8.37889 6.0815 8.37889H9.43022C9.94039 8.37889 10.3555 8.79397 10.3555 9.30414V9.68944C10.7115 9.68944 11 9.97798 11 10.334V10.6777C11 10.8556 10.8556 11 10.6777 11ZM6.96665 7.09722C6.75245 7.38146 6.34829 7.43829 6.06405 7.22402C5.77973 7.00985 5.72299 6.60568 5.93716 6.32134L7.8766 3.74766C8.09087 3.46333 8.49494 3.40659 8.7792 3.62077C9.06353 3.83503 9.12035 4.23911 8.90609 4.52346L6.96665 7.09722ZM2.334 3.60618C2.11973 3.89042 1.71563 3.94725 1.43131 3.73298C1.14707 3.51881 1.09025 3.11473 1.30451 2.83038L3.24397 0.256726C3.45815 -0.027598 3.86231 -0.0844241 4.14657 0.12984C4.43081 0.344103 4.48763 0.748181 4.27337 1.03253L2.334 3.60618ZM3.74767 5.4785C3.27134 5.11956 2.91373 4.67385 2.69008 4.20454L4.94678 1.20984C5.45955 1.29552 5.98651 1.51631 6.46293 1.87534C6.93928 2.23428 7.29689 2.67999 7.52054 3.14921L5.26382 6.14409C4.75108 6.05841 4.22411 5.83751 3.74767 5.4785ZM2.87749 5.56242C3.02753 5.71533 3.18557 5.86196 3.35979 5.99329C3.53409 6.12456 3.71864 6.23606 3.90689 6.33822L3.48668 6.89589L2.45719 6.12018L2.87749 5.56242ZM2.06929 6.63488L3.09878 7.41059L1.15932 9.98436C0.945055 10.2687 0.540977 10.3254 0.256717 10.1112C-0.027607 9.89698 -0.0843477 9.4929 0.12983 9.20856L2.06929 6.63488Z" />
                                </svg>
                                Live
                              </span>
                            </div>
                            <div className="code-no">
                              <span className="code">Lot # 25896742</span>
                            </div>
                          </div>
                          <div className="auction-card-content">
                            <h6>
                              <Link href="/car-auction/auction-details">
                                Velocity Visions Precision Performance Meets.
                              </Link>
                            </h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$4,648</strong>
                              </div>
                              <Link
                                href="/car-auction/auction-details"
                                className="bid-btn"
                              >
                                Bid Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </div>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2PopularAuction;
