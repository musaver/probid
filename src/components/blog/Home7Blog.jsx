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

const Home7Blog = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      navigation: {
        nextEl: ".home7-blog-slider-next",
        prevEl: ".home7-blog-slider-prev",
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
    }
  }, [])

  return (
    <>
      <div className="home7-blog-section">
        <div className="container-one">
          <div
            className="row mb-60 wow animate fadeInDown"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title2 two">
                <span>
                  <i className="bi bi-arrow-right" />
                  READ OUR
                </span>
                <h2>
                  Exclusive <span>Content</span>
                </h2>
              </div>
              <div className="slider-btn-grp four">
                <div className="slider-btn home7-blog-slider-prev">
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.77219 7.97481L9.74706 -6.10352e-05L11 1.25288L3.02513 9.22775H9.74706V10.9999H0V1.25288L1.77219 1.25288V7.97481Z" />
                  </svg>
                </div>
                <div className="slider-btn home7-blog-slider-next">
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.22781 7.97481L1.25294 -6.10352e-05L0 1.25288L7.97487 9.22775H1.25294L1.25294 10.9999H11V1.25288L9.22781 1.25288V7.97481Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-12 wow animate fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <Swiper {...settings} className="swiper home7-blog-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Digital Art</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (20)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          Collectibles, collectibles art, and uncover
                          fascinating.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img1.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            03 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Computer</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (25)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          Exploring the hrils tales and trends in the world.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img2.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            28 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Abstract</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (18)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          Bidding Chronicles Unveiling Behind Stories.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img3.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            15 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Rococo</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (12)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          Bid Better Tips a Successful Auctions with grow.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img4.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            15 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Baroque</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (18)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          Page Turners &amp; Price Bider Inside the World of
                          Book.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img5.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            18 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card2 two">
                      <div className="blog-meta">
                        <ul className="category">
                          <li>
                            <Link href="/multipurpose2/blog-grid">Abstract</Link>
                          </li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment (18)</span>
                        </div>
                      </div>
                      <h4>
                        <Link href="/multipurpose2/blog-details">
                          From Shelf Gavels Stories Behind Rare Book Auctions.
                        </Link>
                      </h4>
                      <div className="blog-card-img-wrap">
                        <Link href="/multipurpose2/blog-details" className="card-img">
                          <img src="../assets/img/home7/blog-img6.jpg" alt="" />
                        </Link>
                        <div className="batch">
                          <Link href="/multipurpose2/blog-grid" className="date">
                            05 January, 2024
                          </Link>
                        </div>
                      </div>
                      <Link className="view-button" href="/multipurpose2/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home7Blog;
