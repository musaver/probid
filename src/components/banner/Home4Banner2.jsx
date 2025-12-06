"use client"
import { useCountdownTimer } from '@/customHooks/useCountdownTimer';
import Link from 'next/link'
import React from 'react'

const Home4Banner2 = () => {
  const { days, hours, minutes, seconds } = useCountdownTimer("2024-10-23 12:00:00");
  return (
    <>
      <div className="home4-offer-banners-section mb-120">
        <div className="container-fluid">
          <div className="row gy-5">
            <div className="col-xl-4 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="left-banner-area">
                <img src="../assets/img/home4/offer-left-banner.jpg" alt="" />
                <div className="banner-content-wrap">
                  <div className="banner-content">
                    <div className="price-area">
                      <span>Current Bid at:</span>
                      <h3>$9,599</h3>
                    </div>
                    <h2>New Impressionism Art</h2>
                    <div className="offer-timer">
                      <span>Auction Will Be End:</span>
                      <div className="countdown-timer">
                        <ul data-countdown="2024-08-24 12:00:00">
                          <li data-days={0}>{days}<span>Days</span><span>Days</span></li>
                          <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                              <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                            </svg>
                          </li>
                          <li data-hours={0}>{hours}<span>Hours</span><span>Hours</span></li>
                          <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                              <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                            </svg>
                          </li>
                          <li data-minutes={0}>{minutes}<span>Min</span><span>Min</span></li>
                          <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                              <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                            </svg>
                          </li>
                          <li data-seconds={0}>{seconds}<span>Sec</span><span>Sec</span></li>
                        </ul>
                      </div>
                    </div>
                    <Link className="primary-btn btn-hover" href="/art-auction/auction-details">
                      Bid Now
                      <span style={{ top: '40.5px', left: '84.2344px' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row g-4">
                <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <div className="single-banner">
                    <img src="../assets/img/home4/offer-single-banner-bg1.jpg" alt="" />
                    <div className="banner-content-wrap">
                      <div className="banner-content">
                        <div className="price-area">
                          <span>Current Bid at:</span>
                          <h3>$2,898</h3>
                        </div>
                        <h3>Neoclassical Art</h3>
                        <Link className="primary-btn btn-hover" href="/art-auction/auction-details">
                          Bid Now
                          <span style={{ top: '40.5px', left: '84.2344px' }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                  <div className="single-banner two">
                    <img src="../assets/img/home4/offer-single-banner-bg2.jpg" alt="" />
                    <div className="banner-content-wrap">
                      <div className="banner-content">
                        <div className="price-area">
                          <span>Current Bid at:</span>
                          <h3>$3,587</h3>
                        </div>
                        <h3><Link href="/art-auciton/auction-details">Art Nouveau</Link></h3>
                        <div className="countdown-timer">
                          <ul data-countdown="2024-08-24 12:00:00">
                            <li data-days={0}>{days}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-hours={0}>{hours}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-minutes={0}>{minutes}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-seconds={0}>{seconds}<span>Days</span><span>Days</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                  <div className="single-banner three">
                    <img src="../assets/img/home4/offer-single-banner-bg3.jpg" alt="" />
                    <div className="banner-content-wrap">
                      <div className="banner-content">
                        <div className="price-area">
                          <span>Current Bid at:</span>
                          <h3>$5,920</h3>
                        </div>
                        <h3><Link href="/art-auction/auction-details">Baroque Art</Link></h3>
                        <div className="countdown-timer">
                          <ul data-countdown="2024-08-24 12:00:00">
                            <li data-days={0}>{days}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-hours={0}>{hours}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-minutes={0}>{minutes}<span>Days</span><span>Days</span></li>
                            <li className="colon">
                              <svg xmlns="http://www.w3.org/2000/svg" width={4} height={13} viewBox="0 0 4 13">
                                <path d="M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z" />
                              </svg>
                            </li>
                            <li data-seconds={0}>{seconds}<span>Days</span><span>Days</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                  <div className="single-banner four">
                    <img src="../assets/img/home4/offer-single-banner-bg4.jpg" alt="" />
                    <div className="banner-content-wrap">
                      <div className="banner-content">
                        <div className="price-area">
                          <span>Current Bid at:</span>
                          <h3>$8,681</h3>
                        </div>
                        <h3>Renaissance Art</h3>
                        <Link className="primary-btn btn-hover" href="/art-auction/auction-details">
                          Bid Now
                          <span style={{ top: '40.5px', left: '84.2344px' }} />
                        </Link>
                      </div>
                    </div>
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
export default Home4Banner2
