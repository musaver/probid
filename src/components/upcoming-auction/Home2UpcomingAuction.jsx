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
import { useCountdownTimer } from "@/customHooks/useCountdownTimer";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home2UpcomingAuction = () => {
  const { days, hours, minutes, seconds } = useCountdownTimer('2024-10-23 12:00:00');
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 15,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      pagination: {
        el: ".progress-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".upcoming-slider-next",
        prevEl: ".upcoming-slider-prev",
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
          slidesPerView: 4,
        },
      },
    }
  }, [])
  return (
    <>
      <div className="home2-upcoming-section mb-110">
        <div className="container-fluid">
          <div className="home2-upcoming-section-wrap">
            <div className="upcoming-section-banner">
              <img src="../assets/img/home2/home2-upcoming-section-banner-bg.jpg" alt="" />
              <div className="upcoming-banner-content-wrap">
                <div className="upcoming-banner-content">
                  <div className="price-area">
                    <span>Current Bid at:</span>
                    <h3>$2,898</h3>
                  </div>
                  <h4>Velocity Vision Where Performance Meets.</h4>
                </div>
                <div className="timer-and-btn-area">
                  <div className="countdown-timer">
                    <ul data-countdown="2024-08-24 12:00:00">
                      <li data-days={0}>{days}<span>Days</span><span>Days</span></li>
                      <li className="colon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-hours={0}>{hours}<span>Hours</span><span>Hours</span></li>
                      <li className="colon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-minutes={0}>{minutes}<span>Min</span><span>Min</span></li>
                      <li className="colon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                          <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                        </svg>
                      </li>
                      <li data-seconds={0}>{seconds}<span>Sec</span><span>Sec</span></li>
                    </ul>
                  </div>
                  <Link href="/car-auction/auction-details" className="bid-btn">Bid Now</Link>
                </div>
              </div>
            </div>
            <div className="upcoming-auction-slider-area">
              <div className="row mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="col-lg-12">
                  <div className="section-title-and-slider-btn d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="section-title">
                      <h2>Upcoming <span>Auction</span></h2>
                    </div>
                    <div className="slider-btn-grp">
                      <div className="slider-btn upcoming-slider-prev">
                        <svg width={9} height={15} viewBox="0 0 9 15" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 7.50009L9 0L3.27273 7.50009L9 15L0 7.50009Z" />
                        </svg>
                      </div>
                      <div className="slider-btn upcoming-slider-next">
                        <svg width={9} height={15} viewBox="0 0 9 15" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 7.50009L0 0L5.72727 7.50009L0 15L9 7.50009Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="progress-pagination" />
                </div>
              </div>
              <div className="row wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="col-lg-12">
                  <Swiper {...settings} className="swiper home2-upcoming-auction-slider">
                    <div className="swiper-wrapper">
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img1.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Genesis motors pioneering on tomorrow's drive.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$4,648</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img2.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Zenith autoesai elevating your driving experience.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$5,758</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img3.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Titan motors build to conquer every mile cars.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$6,867</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img4.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Opp automotive reaching new heights of excellence.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$7,529</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img5.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Genesis motors pioneering on tomorrow's drive.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$5,758</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img6.jpg" alt="" />
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
                            <h6><Link href="/car-auction/auction-details">Every mile cars are the goal of Titan Motors.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$6,867</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="auction-card style-2">
                          <div className="auction-card-img-wrap">
                            <Link href="/car-auction/auction-details" className="card-img">
                              <img src="../assets/img/home2/upcoming-auction-img7.jpg" alt="" />
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
                              <ul data-countdown="2024-09-05 12:00:00">
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
                            <h6><Link href="/car-auction/auction-details">Opp automotive reaching new heights of excellence.</Link></h6>
                            <div className="price-and-code-area">
                              <div className="price">
                                <span>Current Bid at:</span>
                                <strong>$7,529</strong>
                              </div>
                              <Link href="/car-auction/auction-details2" className="bid-btn">Notify Me</Link>
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
  )
}

export default Home2UpcomingAuction
