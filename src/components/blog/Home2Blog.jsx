import Link from 'next/link'
import React from 'react'

const Home2Blog = () => {
  return (
    <>
      <div className="home2-blog-section mb-110">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Unveiling <span>Article</span></h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card two">
                <div className="blog-card-img-wrap">
                  <Link href="/car-auction/blog-details" className="card-img">
                    <img src="../assets/img/home2/blog-img1.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/car-auction/blog-grid" className="date">
                      03 January, 2024
                    </Link>
                  </div>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/car-auction/blog-grid">ANTIQUES</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (20)</span>
                    </div>
                  </div>
                  <h4><Link href="/car-auction/blog-details">Bidding Insights Unveiling the Art of Auctions.</Link></h4>
                  <Link className="view-button" href="/car-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card two">
                <div className="blog-card-img-wrap">
                  <Link href="/car-auction/blog-details" className="card-img">
                    <img src="../assets/img/home2/blog-img2.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/car-auction/blog-grid" className="date">
                      23 January, 2024
                    </Link>
                  </div>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/car-auction/blog-grid">ANTIQUES</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (20)</span>
                    </div>
                  </div>
                  <h4><Link href="/car-auction/blog-details">Bid Better Tips a Trick Successful Auctions with grow</Link></h4>
                  <p>Cras cursus faucibus enim porta. Curabitur an refuge tortor. Duis ut egestas libero. Aenean id lacin est.</p>
                  <Link className="view-button" href="/car-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInUp" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="blog-card two">
                <div className="blog-card-img-wrap">
                  <Link href="/car-auction/blog-details" className="card-img">
                    <img src="../assets/img/home2/blog-img3.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/car-auction/blog-grid" className="date">
                      05 March, 2024
                    </Link>
                  </div>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/car-auction/blog-grid">ANTIQUES</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (20)</span>
                    </div>
                  </div>
                  <h4><Link href="/car-auction/blog-details">Winning Wagers Strategies forest Successful Bidding</Link></h4>
                  <Link className="view-button" href="/car-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
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

export default Home2Blog
