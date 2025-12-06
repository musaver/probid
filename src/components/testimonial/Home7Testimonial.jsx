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

const Home7Testimonial = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      // autoplay: {
      // 	delay: 2500, // Autoplay duration in milliseconds
      // 	disableOnInteraction: false,
      // },
      navigation: {
        nextEl: ".home6-testimonial-slider-next",
        prevEl: ".home6-testimonial-slider-prev",
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
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    }
  }, [])
  return (
    <>
      <div className="home7-testimonial-section mb-110">
        <div className="container-one">
          <div className="row mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title2 two">
                <span><i className="bi bi-arrow-right" />TESTIMONIAL</span>
                <h2 className="custom-heading"><span className="bold" style={{ fontWeight: 600 }}>Customer</span> <span className="light" style={{ fontWeight: 400, fontFamily: "revert", color: "#6a6c6c" }}>Stories</span></h2>              </div>
              <div className="slider-btn-grp four">
                <div className="slider-btn home6-testimonial-slider-prev">
                  <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.77219 7.97481L9.74706 -6.10352e-05L11 1.25288L3.02513 9.22775H9.74706V10.9999H0V1.25288L1.77219 1.25288V7.97481Z" />
                  </svg>
                </div>
                <div className="slider-btn home6-testimonial-slider-next">
                  <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.22781 7.97481L1.25294 -6.10352e-05L0 1.25288L7.97487 9.22775H1.25294L1.25294 10.9999H11V1.25288L9.22781 1.25288V7.97481Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Swiper {...settings} className="swiper home6-testimonial-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img1.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Brooks Abelam</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Great Auction Product!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“Working with Nubi has been a game-changer for our business. Their SEO services have helped us rank higher on search engines and attract more organic traffic to our website.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img2.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Weston Bennett</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Fantastic Bidding Item!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“Please feel free to alter the main features in a way that best explains to prospective customers the precise benefits they will receive at each price point.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img3.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Penelop Gian</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Outstanding Auction Items!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“You are welcome to alter the salient characteristics in a way that makes prospective customers aware of the precise benefits.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img4.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Daniel Scoot</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Superb Bidding Deal!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“Feel free to customize the key features based on thena helps potential clients understand the specific valueles they'll receive at each pricing tier.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img5.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Harbard Mack</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Wonderful Auction Items!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“Please feel free to alter the main features in a way that best explains to prospective customers the precise benefits.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="testimonial-card3">
                      <svg className="quote" width={62} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.95 40.52">
                        <g className="cls-1">
                          <path className="cls-2" d="M30.66,42.72a7.18,7.18,0,0,0,.75-.31c.38-.17.83-.4,1.31-.64,1-.5,2-1.08,2.58-1.48m3.8-3.09a21.39,21.39,0,0,1-3.8,3.09M45.48,11c0,3.92,0,7.48-.07,8.74" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M45.48,11l-.07,8.74a35.52,35.52,0,0,1-1.7,10.46,18.56,18.56,0,0,1-4.61,7l-3.8,3.09-4.64,2.43a2.09,2.09,0,0,1-1.14-.1,1.43,1.43,0,0,1-.31-.17,1.47,1.47,0,0,1-.29-.33A22,22,0,0,1,27.81,40c-.48-1-.74-1.56-.88-1.91a2,2,0,0,1-.18-.7,1.46,1.46,0,0,1,.4-1.24h0l0,0,.11-.08.34-.21c.28-.17.63-.36,1-.54s.95-.5,1.39-.77A13.62,13.62,0,0,0,33.17,32a12.1,12.1,0,0,0,2.57-4.48h0a17.94,17.94,0,0,0,.88-5.12V21.24H28.81l-.36-.18a2.1,2.1,0,0,1-.57-.42h0s0,0,0,0a.91.91,0,0,1-.22-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.05-3,0-7V12l0-7.55.14-.25a2.12,2.12,0,0,1,.44-.55,1.7,1.7,0,0,1,.53-.34l.36,0,1.27,0c1.2,0,3.15,0,6.33,0h7.64l.26.14a2.26,2.26,0,0,1,.88.88h0a3.64,3.64,0,0,1,.09,1.05C45.46,6.24,45.47,7.89,45.48,11Z" transform="translate(-0.04 -2.74)" />
                          <path className="cls-2" d="M19.22,12.22c0,4.09,0,6.4-.07,8a36,36,0,0,1-.34,4.1,27,27,0,0,1-1.37,6h0C15.46,35.46,11,39.86,5,42.46a1.82,1.82,0,0,1-2.25-.31l0,0a1.81,1.81,0,0,0-.1-.17c-.08-.14-.18-.33-.29-.55-.24-.44-.52-1-.8-1.59C1,38.72.77,38.21.65,37.89a1.23,1.23,0,0,1-.09-.32,2.5,2.5,0,0,1,0-.33,1.39,1.39,0,0,1,.28-1,4.53,4.53,0,0,1,1.46-.92,15.9,15.9,0,0,0,4-2.64,11.41,11.41,0,0,0,2.54-3.5,14.26,14.26,0,0,0,1.2-3.62c.09-.46.19-1.2.28-1.9s.14-1.4.14-1.76a.61.61,0,0,0-.08-.31.67.67,0,0,0-.32-.26,2.32,2.32,0,0,0-.58-.08c-.49,0-1.44,0-3.24,0H2.58l-.36-.18h0a2,2,0,0,1-.56-.42h0l0,0a1,1,0,0,1-.21-.32,3.43,3.43,0,0,1-.13-.92c-.06-1-.06-3,0-7V12c0-3.83,0-5.74,0-6.74,0-.5,0-.75.06-.88a.31.31,0,0,1,0-.17h0a2,2,0,0,1,.89-.85.81.81,0,0,1,.22-.07c.15,0,.41,0,.93-.05,1,0,3,0,6.86,0H18l.26.14a2,2,0,0,1,.86.86h0a4,4,0,0,1,.09,1.17C19.22,6.48,19.22,8.45,19.22,12.22Z" transform="translate(-0.04 -2.74)" />
                        </g>
                      </svg>
                      <div className="author-and-title-area">
                        <div className="author-area">
                          <div className="author-img-wrap">
                            <div className="author-img">
                              <img src="../assets/img/home2/testi-author-img6.png" alt="" />
                            </div>
                          </div>
                          <div className="author-content">
                            <h6>Hanrry Ghust</h6>
                            <span>CEO At astra.com</span>
                          </div>
                        </div>
                        <span>Amazing Bidding Deals!</span>
                      </div>
                      <div className="testimonial-content">
                        <p>“You are welcome to alter the salient characteristics that makes prospective customers aware of the benefits associated with each price point.”</p>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home7Testimonial
