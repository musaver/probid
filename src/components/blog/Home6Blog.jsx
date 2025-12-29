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

const Home6Blog = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "autp",
      speed: 1500,
      spaceBetween: 15,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      pagination: {
        el: ".paginations1",
        clickable: true,
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
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
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
      <div className="home6-blog-section mb-110">
        <div className="container">
          <div className="row mb-60">
            <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title4 two text-center">
                <span>Learn Our</span>
                <h2>Reader's <span>Corner</span></h2>
              </div>
            </div>
          </div>
          <div className="row wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12">
              <Swiper {...settings} className="swiper home6-blog-slider">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card five">
                      <div className="blog-card-img-wrap">
                        <Link href="/book-and-comic/blog-details" className="card-img">
                          <img src="../assets/img/home6/blog-img1.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li><Link href="/book-and-comic/blog-grid">BAROQUE</Link></li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment (20)</span>
                          </div>
                        </div>
                        <h4><Link href="/book-and-comic/blog-details">Page Turners &amp; Price Bider Inside the World of Book.</Link></h4>
                        <Link className="view-button" href="/book-and-comic/blog-details">
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                      <div className="batch">
                        <Link href="/book-and-comic/blog-grid" className="date">
                          03 January, 2024
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card five">
                      <div className="blog-card-img-wrap">
                        <Link href="/book-and-comic/blog-details" className="card-img">
                          <img src="../assets/img/home6/blog-img2.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li><Link href="/book-and-comic/blog-grid">Rococo</Link></li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment (15)</span>
                          </div>
                        </div>
                        <h4><Link href="/book-and-comic/blog-details">Literary Treasures Unveiled Then Book Auction Chronicle.</Link></h4>
                        <Link className="view-button" href="/book-and-comic/blog-details">
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                      <div className="batch">
                        <Link href="/book-and-comic/blog-grid" className="date">
                          03 January, 2024
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card five">
                      <div className="blog-card-img-wrap">
                        <Link href="/book-and-comic/blog-details" className="card-img">
                          <img src="../assets/img/home6/blog-img3.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li><Link href="/book-and-comic/blog-grid">Abstract</Link></li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment (22)</span>
                          </div>
                        </div>
                        <h4><Link href="/book-and-comic/blog-details">From Shelf Gavels Stories Behind Rare Book Auctions.</Link></h4>
                        <Link className="view-button" href="/book-and-comic/blog-details">
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                      <div className="batch">
                        <Link href="/book-and-comic/blog-grid" className="date">
                          15 January, 2024
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card five">
                      <div className="blog-card-img-wrap">
                        <Link href="/book-and-comic/blog-details" className="card-img">
                          <img src="../assets/img/home6/blog-img4.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li><Link href="/book-and-comic/blog-grid">BAROQUE</Link></li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment (20)</span>
                          </div>
                        </div>
                        <h4><Link href="/book-and-comic/blog-details">Within The Book World Page Turns &amp; Cost Bider.</Link></h4>
                        <Link className="view-button" href="/book-and-comic/blog-details">
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                      <div className="batch">
                        <Link href="/book-and-comic/blog-grid" className="date">
                          03 January, 2024
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="blog-card five">
                      <div className="blog-card-img-wrap">
                        <Link href="/book-and-comic/blog-details" className="card-img">
                          <img src="../assets/img/home6/blog-img5.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li><Link href="/book-and-comic/blog-grid">Rococo</Link></li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment (12)</span>
                          </div>
                        </div>
                        <h4><Link href="/book-and-comic/blog-details">Book Auction Chronicle Literary Treasures Revealed.</Link></h4>
                        <Link className="view-button" href="/book-and-comic/blog-details">
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                      <div className="batch">
                        <Link href="/book-and-comic/blog-grid" className="date">
                          03 January, 2024
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </Swiper>
            </div>
          </div>
          <div className="paginations1" />
        </div>
      </div>

    </>
  )
}

export default Home6Blog
