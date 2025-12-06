
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { useCountdownTimer } from "@/customHooks/useCountdownTimer";
import { useMemo } from "react";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home6Banner2 = () => {
  const { days, hours, minutes, seconds } = useCountdownTimer("2024-10-23 12:00:00")
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      slidesPerView: 1,
      centerSlides: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".home5-banner-slider-next",
        prevEl: ".home5-banner-slider-prev",
      },
      pagination: {
        el: ".paginations1",
        clickable: true,
      },
    }
  }, [])
  return (
    <>
      <div className="home6-banner2-section mb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Swiper {...settings} className="swiper home5-banner-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="home6-banner-slider-wrap" style={{ backgroundImage: 'url(/assets/img/home6/home6-banner2-bg.png), linear-gradient(180deg, rgba(227, 232, 251, 1) 0%, rgba(227, 232, 251, 1) 100%)' }}>
                      <div className="batch">
                        <span>HOT <br />NOW</span>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="banner2-content">
                            <div className="price-area">
                              <span>Current Bid at:</span>
                              <h3>$2,898</h3>
                            </div>
                            <h2>Velocity Vision Where Perform</h2>
                            <div className="offer-timer">
                              <span>Auction Will Be End:</span>
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
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                          <div className="banner2-img">
                            <img src="../assets/img/home6/home6-banner2-img1.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="btn-area">
                        <Link className="primary-btn5 btn-hover" href="/book-and-comic/auction-details">
                          Bid Now
                          <span style={{ top: '40.5px', left: '84.2344px' }} />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="home6-banner-slider-wrap" style={{ backgroundImage: 'url(/assets/img/home6/home6-banner2-bg.png), linear-gradient(180deg, rgba(238, 243, 214, 1) 0%, rgba(238, 243, 214, 1) 100%)' }}>
                      <div className="batch">
                        <span>HOT <br />NOW</span>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="banner2-content">
                            <div className="price-area">
                              <span>Current Bid at:</span>
                              <h3>$2,898</h3>
                            </div>
                            <h2>Place for high velocity</h2>
                            <div className="offer-timer">
                              <span>Auction Will Be End:</span>
                              <div className="countdown-timer">
                                <ul data-countdown="2024-08-18 12:00:00">
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
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                          <div className="banner2-img">
                            <img src="../assets/img/home6/home6-banner2-img2.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="btn-area">
                        <Link className="primary-btn5 btn-hover" href="/book-and-comic/auction-details">
                          Bid Now
                          <span style={{ top: '40.5px', left: '84.2344px' }} />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="home6-banner-slider-wrap" style={{ backgroundImage: 'url(/assets/img/home6/home6-banner2-bg.png), linear-gradient(180deg, rgba(233, 243, 241, 1) 0%, rgba(233, 243, 241, 1) 100%)' }}>
                      <div className="batch">
                        <span>HOT <br />NOW</span>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="banner2-content">
                            <div className="price-area">
                              <span>Current Bid at:</span>
                              <h3>$2,898</h3>
                            </div>
                            <h2>Where speed meets excellence</h2>
                            <div className="offer-timer">
                              <span>Auction Will Be End:</span>
                              <div className="countdown-timer">
                                <ul data-countdown="2024-08-15 12:00:00">
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
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                          <div className="banner2-img">
                            <img src="../assets/img/home6/home6-banner2-img3.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="btn-area">
                        <Link className="primary-btn5 btn-hover" href="/book-and-comic/auction-details">
                          Bid Now
                          <span style={{ top: '40.5px', left: '84.2344px' }} />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="slider-btn-grp three">
          <div className="slider-btn home5-banner-slider-prev">
            <i className="bi bi-arrow-left" />
          </div>
          <div className="slider-btn home5-banner-slider-next">
            <i className="bi bi-arrow-right" />
          </div>
        </div>
      </div>

    </>
  )
}

export default Home6Banner2
