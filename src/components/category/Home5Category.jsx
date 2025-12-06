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

const Home5Category = () => {
    const settings = useMemo(() => {
        return {
            slidesPerView: "auto",
            speed: 1500,
            spaceBetween: 15,
            // autoplay: {
            //   delay: 2500, // Autoplay duration in milliseconds
            //   disableOnInteraction: false,
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
                    slidesPerView: 6,
                },
            },
        }
    }, [])
    return (
        <>
            <div className="home5-category-section mb-110">
                <div className="container">
                    <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="section-title4">
                                <span>Choose Your</span>
                                <h2>Find Your <span>Favorites</span></h2>
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
                <div className="container-fluid">
                    <div className="row mb-40 wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-lg-12">
                            <Swiper {...settings} className="swiper home5-category-slider">
                                <div className="swiper-wrapper">
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img1.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Smartphones</Link></h5>
                                                    <span>45,533 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img2.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Computers</Link></h5>
                                                    <span>42,453 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img3.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Photography</Link></h5>
                                                    <span>48,453 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img4.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Photography</Link></h5>
                                                    <span>46,358 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img5.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Drone &amp; VR</Link></h5>
                                                    <span>42,152 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img6.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Smart Watches</Link></h5>
                                                    <span>49,859 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img7.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Office Gadgets</Link></h5>
                                                    <span>42,248 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img8.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Personal Care</Link></h5>
                                                    <span>49,655 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="category-card5">
                                            <div className="category-card-wrapper">
                                                <div className="category-img">
                                                    <img src="../assets/img/home5/category-img9.png" alt="" />
                                                </div>
                                                <div className="category-content">
                                                    <h5><Link href="/gadget-and-technology/auction-sidebar">Gaming</Link></h5>
                                                    <span>46,489 Item</span>
                                                </div>
                                            </div>
                                            <div className="details-btn">
                                                <Link href="/gadget-and-technology/auction-sidebar">
                                                    <svg width={17} height={13} viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5 6.50015L10.1229 12.8773L9.41596 12.1704L14.5847 7.00165L-0.00236218 7.00207L-0.00065452 6.00078L14.5836 6.00036L9.41172 0.828517L10.1201 0.120181L16.5 6.50015Z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>
                        </div>
                    </div>
                    <div className="row wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <Link className="view-button2 two" href="/category">
                                View All Category
                                <div className="arrow">
                                    <svg width={13} height={13} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0261 10.3381L1.68853 1L0.999512 1.68902L10.3376 11.0266L3.88123 11.0266L3.88123 12.0005L12 12.0005L12 3.88172L11.0261 3.88172L11.0261 10.3381Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.15 3.73194L12.15 12.1507L3.73126 12.1507L3.73126 10.8768L9.97546 10.8768L0.787402 1.68924L1.68856 0.788085L10.8761 9.97615L10.8761 3.73194L12.15 3.73194ZM11.85 4.03194L11.1761 4.03194L11.1761 10.7004L1.68856 1.21236L1.21167 1.68924L10.6998 11.1768L4.03125 11.1768L4.03125 11.8507L11.85 11.8507L11.85 4.03194Z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home5Category
