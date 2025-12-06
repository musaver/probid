import Link from 'next/link'
import React from 'react'

const Home7Category = () => {
  return (
    <>
      <div className="home7-category-section mb-110">
        <div className="container-one">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title2 two">
                <span><i className="bi bi-arrow-right" />TIPS &amp; TRICKS</span>
                <h2>Browse By <span>Category</span></h2>
              </div>
              <Link className="primary-btn6 transparent btn-hover" href="/multipurpose2/category">
                View All Category
                <svg width={11} height={11} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.22781 7.97482L1.25294 -4.57764e-05L0 1.25289L7.97487 9.22776H1.25294V11H11V1.25289H9.22781V7.97482Z" />
                </svg>
                <span style={{ top: '40.5px', left: '84.2344px' }} />
              </Link>
            </div>
          </div>
          <div className="row g-xxl-4 g-xl-3 g-4">
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon1.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Automotive</Link></h4>
                    <span>45,533 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img1.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon2.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Antiques</Link></h4>
                    <span>43,856 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img2.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon3.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Digital Art</Link></h4>
                    <span>48,258 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img3.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon4.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Books &amp; Comic</Link></h4>
                    <span>46,156 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img4.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon5.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Gadget</Link></h4>
                    <span>41,546 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img5.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
              <div className="category-card7">
                <div className="category-icon">
                  <img src="../assets/img/home7/icon/home7-category-icon6.svg" alt="" />
                </div>
                <div className="category-wrap">
                  <div className="category-content">
                    <h4><Link href="/multipurpose2/auction-sidebar">Real Estate</Link></h4>
                    <span>45,489 Item</span>
                  </div>
                  <div className="category-img">
                    <img src="../assets/img/home7/home7-category-img6.jpg" alt="" />
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

export default Home7Category
