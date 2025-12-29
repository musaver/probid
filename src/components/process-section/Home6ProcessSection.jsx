"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { useMemo } from "react";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home6ProcessSection = () => {
  const setttings = useMemo(() => {
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
      <div className="home6-process-section">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12">
              <div className="section-title4 two white">
                <span>Our Process</span>
                <h2>How To Bid <span>Auction</span></h2>
              </div>
            </div>
          </div>
          <div className="home6-process-slider-wrap wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="row">
              <div className="col-lg-12">
                <Swiper {...setttings} className="swiper home5-process-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2 two">
                        <span className="step-no">Step-01</span>
                        <div className="process-content">
                          <h2>Registration</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2 two">
                        <span className="step-no">Step-02</span>
                        <div className="process-content">
                          <h2>Select Product</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2 two">
                        <span className="step-no">Step-03</span>
                        <div className="process-content">
                          <h2>Go to Bidding</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="process-card2 two">
                        <span className="step-no">Step-04</span>
                        <div className="process-content">
                          <h2>Make Payment</h2>
                          <p>Cras cursus faucibus enim id porta. Curab aenean id lacin estearn.</p>
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
      <div className="process-video-area mb-110">
        <div className="container">
          <div className="video-wrapper">
            <img src="../assets/img/home6/process-video-img.jpg" alt="" />
            <a href="https://www.youtube.com/watch?v=544mITj-4fM" className="video-area video-player">
              <div className="icon">
                <svg className="video-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="65px" viewBox="0 0 206 206" style={{ enableBackground: 'new 0 0 206 206' }} xmlSpace="preserve">
                  <circle className="circle" strokeMiterlimit={10} cx={103} cy={103} r={100} />
                  <path className="circle-half top-half" strokeWidth={4} strokeMiterlimit={10} d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6" />
                  <path className="circle-half bottom-half" strokeWidth={4} strokeMiterlimit={10} d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53" />
                </svg>
                <i className="bi bi-play" />
              </div>
            </a>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home6ProcessSection
