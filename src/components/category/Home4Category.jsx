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

const Home4Category = () => {
  const setttings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 15,
      // autoplay: {
      // 	delay: 2500, // Autoplay duration in milliseconds
      // 	disableOnInteraction: false,
      // },
      navigation: {
        nextEl: ".category-slider-next",
        prevEl: ".category-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        375: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 5,
        },
      },
    }
  }, [])
  return (
    <>
      <div className="home4-category-section mb-120">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title3 text-white">
                <h2>Auction Category.</h2>
                <p>Feel free adapt this based on the specific managed services, features</p>
              </div>
              <Link className="primary-btn3 btn-hover" href="/art-auction/category">
                View All Category
                <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <circle cx={5} cy={5} r={5} />
                </svg>
                <span style={{ top: '40.5px', left: '84.2344px' }} />
              </Link>
            </div>
          </div>
          <div className="category-slider-wrapper wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="row">
              <div className="col-lg-12">
                <Swiper {...setttings} className="swiper home4-category-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon1.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Renaissance Art</Link></h5>
                          <span>45,533 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img1.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon2.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Baroque Art</Link></h5>
                          <span>42,429 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img2.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon3.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Rococo Art</Link></h5>
                          <span>45,958 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img3.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon4.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Romanticism</Link></h5>
                          <span>44,208 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img4.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon5.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Impressionism</Link></h5>
                          <span>41,564 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img5.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon6.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Modernism</Link></h5>
                          <span>42,488 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img6.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon7.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Pencil Drawings</Link></h5>
                          <span>45,958 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img7.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="category-card4">
                        <div className="icon">
                          <img src="../assets/img/home4/icon/home4-category-icon8.svg" alt="" />
                        </div>
                        <div className="content">
                          <h5><Link href="/art-auction/auction-sidebar">Black and White</Link></h5>
                          <span>44,208 Item</span>
                        </div>
                        <div className="category-img">
                          <img src="../assets/img/home4/category-img8.jpg" alt="" />
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="slider-btn-grp">
              <div className="slider-btn category-slider-prev">
                <i className="bi bi-arrow-left" />
              </div>
              <div className="slider-btn category-slider-next">
                <i className="bi bi-arrow-right" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home4Category
