import Link from 'next/link'
import React from 'react'

const Home6Category = () => {
  return (
    <>
      <div className="home6-category-section mb-110">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title4 two">
                <span>Creative Choice</span>
                <h2>Our <span>Category</span></h2>
              </div>
              <Link className="view-button2 three" href="/book-and-comic/category">
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
          <div className="row g-4">
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img1.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">Comics</Link></h5>
                  <span>533 Item</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img2.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">History</Link></h5>
                  <span>6,178 Item</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img3.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">Biography</Link></h5>
                  <span>5,533 Item</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="500ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img4.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">Philosophy</Link></h5>
                  <span>876 Item</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img5.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">Antiquarian</Link></h5>
                  <span>298 Item</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-3 col-sm-4 col-6 wow animate fadeInUp" data-wow-delay="700ms" data-wow-duration="1500ms">
              <div className="category-card6">
                <div className="category-img">
                  <img src="../assets/img/home6/category-img6.jpg" alt="" />
                </div>
                <div className="category-content">
                  <h5><Link href="/book-and-comic/auction-sidebar">Horror</Link></h5>
                  <span>1345 Item</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home6Category
