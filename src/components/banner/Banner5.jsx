"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { useMemo } from "react";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Banner5 = () => {
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
    };
  }, []);
  return (
    <>
      <div className="home5-banner-section">
        <Swiper {...settings} className="swiper home5-banner-slider">
          <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
              <div
                className="banner-bg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(/assets/img/home5/home5-banner-img1.jpg)",
                }}
              ></div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="banner-bg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(11, 12, 12, 0.6) 0%, rgba(11, 12, 12, 0.6) 100%), url(/assets/img/home5/home5-banner-img2.jpg)",
                }}
              ></div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div
                className="banner-bg"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(11, 12, 12, 0.6) 0%, rgba(11, 12, 12, 0.6) 100%), url(/assets/img/home5/home5-banner-img3.jpg)",
                }}
              ></div>
            </SwiperSlide>
          </div>
        </Swiper>
        <div className="banner-wrapper">
          <div className="banner-content">
            <span className="sub-title">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
              </svg>
              PROBID YOU CAN TRUST
            </span>
            <h1>
              Select <span>Our Product</span> At Our Auction.
            </h1>
            <p>
              Join us as we carve a path to success, driven by passion, powered
              by innovation, and we're here to turn them into reality.
            </p>
            <div className="button-area">
              <Link
                className="primary-btn2 btn-hover"
                href="/gadget-and-technology/auction-grid"
              >
                Start A Bid
                <svg
                  width={11}
                  height={11}
                  viewBox="0 0 11 11"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0266 9.33856L0.689022 0.000487831L-3.01181e-08 0.68951L9.33807 10.0271L2.88172 10.0271L2.88172 11.001L11.0005 11.001L11.0005 2.88221L10.0266 2.88221L10.0266 9.33856Z"
                  />
                </svg>
                <span style={{ top: "40.5px", left: "84.2344px" }} />
              </Link>
              <Link
                className="primary-btn4 btn-hover"
                href="/gadget-and-technology/auction-grid"
              >
                View All Auction
                <span style={{ top: "40.5px", left: "84.2344px" }} />
              </Link>
            </div>
          </div>
          <div className="slider-btn-grp">
            <div className="slider-btn home5-banner-slider-prev d-md-flex d-none">
              <svg
                width={25}
                height={26}
                viewBox="0 0 25 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.7176 3.99566L11.7171 24.4341C11.7171 24.8665 12.0676 25.2171 12.5 25.2171C12.9324 25.2171 13.2829 24.8665 13.2829 24.4341L13.2824 3.99566L20.0655 10.7788C20.3711 11.0844 20.8666 11.0844 21.1721 10.7788C21.4777 10.4732 21.4777 9.97774 21.1721 9.67215L12.5 1L3.82785 9.67215C3.52226 9.97774 3.52226 10.4732 3.82785 10.7788C4.13344 11.0844 4.6289 11.0844 4.93449 10.7788L11.7176 3.99566Z"
                  />
                </g>
              </svg>
            </div>
            <div className="paginations1" />
            <div className="slider-btn home5-banner-slider-next d-md-flex d-none">
              <svg
                width={19}
                height={26}
                viewBox="0 0 19 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.2824 22.0043L10.2829 1.56589C10.2829 1.13349 9.9324 0.782947 9.5 0.782948C9.06759 0.782947 8.71706 1.13349 8.71707 1.56589L8.71761 22.0043L1.93449 15.2212C1.6289 14.9156 1.13344 14.9156 0.827853 15.2212C0.522265 15.5268 0.522265 16.0223 0.827854 16.3279L9.5 25L18.1721 16.3279C18.4777 16.0223 18.4777 15.5268 18.1721 15.2212C17.8666 14.9156 17.3711 14.9156 17.0655 15.2212L10.2824 22.0043Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <ul className="social-list">
          <li>
            <a href="https://www.facebook.com/">
              <i className="bx bxl-facebook" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <i className="bi bi-twitter-x" />
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/">
              <i className="bx bxl-pinterest-alt" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <i className="bx bxl-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Banner5;
