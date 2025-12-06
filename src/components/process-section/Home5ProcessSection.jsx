"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

import Link from "next/link";
import { useMemo } from "react";
import Marquee from "react-fast-marquee";
const Home5ProcessSection = () => {
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
        nextEl: ".home5-process-slider-next",
        prevEl: ".home5-process-slider-prev",
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
    }
  }, [])
  return (
    <>
      <div className="home5-process-section mb-110">
        <div className="container">
          <div className="row mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12">
              <div className="section-title4 text-center">
                <span>Featured Option</span>
                <h2>Four Step <span>Process</span></h2>
              </div>
            </div>
          </div>
          <div className="home5-process-process-slider-wrap wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="row">
              <div className="col-lg-12">
                <Swiper {...settings} className="swiper home5-process-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2">
                        <span className="step-no">Step-01</span>
                        <div className="process-content">
                          <h2>Registration</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                          <ul>
                            <li><strong>01.</strong> Short specific information</li>
                            <li><strong>02.</strong> Required For New Registration</li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2">
                        <span className="step-no">Step-02</span>
                        <div className="process-content">
                          <h2>Select Product</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                          <ul>
                            <li><strong>01.</strong> Search Your Auction</li>
                            <li><strong>02.</strong> Find The Right Product</li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2">
                        <span className="step-no">Step-03</span>
                        <div className="process-content">
                          <h2>Go to Bidding</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                          <ul>
                            <li><strong>01.</strong> Choose The Bid Product</li>
                            <li><strong>02.</strong> Bid according your ability</li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2">
                        <span className="step-no">Step-04</span>
                        <div className="process-content">
                          <h2>Make Payment</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                          <ul>
                            <li><strong>01.</strong> Specific Information</li>
                            <li><strong>02.</strong> Required For Registration</li>
                          </ul>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="progress-pagination" />
          </div>
        </div>
      </div>
      <div className="logo-section three mb-110">
        <div className="container">
          <div className="logo-wrap">
            <div className="logo-title wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <h6>We Worked With Global Largest Trusted Brand</h6>
            </div>
            <div className="logo-area">
              <div className="marquee_text">
                <Marquee>
                  <a href="#"><img src="../assets/img/home1/company-logo-01.png" alt="" /></a>
                  <a href="#"><img src="../assets/img/home1/company-logo-02.png" alt="" /></a>
                  <a href="#"><img src="../assets/img/home1/company-logo-03.png" alt="" /></a>
                  <a href="#"><img src="../assets/img/home1/company-logo-04.png" alt="" /></a>
                  <a href="#"><img src="../assets/img/home1/company-logo-05.png" alt="" /></a>
                  <a href="#"><img src="../assets/img/home1/company-logo-06.png" alt="" /></a>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home5ProcessSection
