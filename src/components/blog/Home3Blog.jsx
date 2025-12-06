import Link from 'next/link'
import React from 'react'

const Home3Blog = () => {
  return (
    <>
      <div className="home3-blog-section mb-110">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title2">
                <span><i className="bi bi-arrow-right" />READ OUR</span>
                <h2>Insights From The <span>Auctions.</span></h2>
              </div>
              <Link className="view-button2" href="//antiques-auction/blog-grid">
                View All Article
                <div className="arrow">
                  <svg width={13} height={13} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0261 10.3381L1.68853 1L0.999512 1.68902L10.3376 11.0266L3.88123 11.0266L3.88123 12.0005L12 12.0005L12 3.88172L11.0261 3.88172L11.0261 10.3381Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.15 3.73194L12.15 12.1507L3.73126 12.1507L3.73126 10.8768L9.97546 10.8768L0.787402 1.68924L1.68856 0.788085L10.8761 9.97615L10.8761 3.73194L12.15 3.73194ZM11.85 4.03194L11.1761 4.03194L11.1761 10.7004L1.68856 1.21236L1.21167 1.68924L10.6998 11.1768L4.03125 11.1768L4.03125 11.8507L11.85 11.8507L11.85 4.03194Z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          <div className="row g-lg-4 gy-5">
            <div className="col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card three">
                <div className="blog-card-img-wrap">
                  <Link href="/antiques-auction/blog-details" className="card-img">
                    <img src="../assets/img/home3/blog-img1.jpg" alt="" />
                  </Link>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/antiques-auction/blog-grid">DIGITAL ART</Link></li>
                      <li />
                    </ul>
                    <div className="blog-date">
                      <Link href="/antiques-auction/blog-grid">23 January, 2024</Link>
                    </div>
                  </div>
                  <h4><Link href="/antiques-auction/blog-details">Vintage Vibes Stories Behind Antique Auction Finds.</Link></h4>
                  <Link className="view-button2" href="/antiques-auction/blog-details">
                    Read More
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
            <div className="col-md-6 d-flex justify-content-md-end wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card three mt-50">
                <div className="blog-card-img-wrap">
                  <Link href="/antiques-auction/blog-details" className="card-img">
                    <img src="../assets/img/home3/blog-img2.jpg" alt="" />
                  </Link>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/antiques-auction/blog-grid">Antiques</Link></li>
                      <li />
                    </ul>
                    <div className="blog-date">
                      <Link href="/antiques-auction/blog-grid">14 March, 2024</Link>
                    </div>
                  </div>
                  <h4><Link href="/antiques-auction/blog-details">Heritage Hamer Where History Meets the Auction Gavel.</Link></h4>
                  <Link className="view-button2" href="/antiques-auction/blog-details">
                    Read More
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
        </div>
      </div>

    </>
  )
}

export default Home3Blog
