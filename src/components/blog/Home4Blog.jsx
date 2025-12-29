import Link from 'next/link'
import React from 'react'

const Home4Blog = () => {
  return (
    <>
      <div className="home4-blog-section mb-120">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title3">
                <h2>Our Stories.</h2>
                <p>Feel free adapt this based on the specific managed services, features</p>
              </div>
              <Link className="primary-btn3 btn-hover" href="/art-auction/blog-grid">
                View All Article
                <svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <circle cx={5} cy={5} r={5} />
                </svg>
                <span style={{ top: '40.5px', left: '84.2344px' }} />
              </Link>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card four">
                <div className="blog-card-img-wrap">
                  <Link href="/art-auction/blog-details" className="card-img">
                    <img src="../assets/img/home4/blog-img1.jpg" alt="" />
                  </Link>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/art-auction/blog-grid">BAROQUE</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (20)</span>
                    </div>
                  </div>
                  <h4><Link href="/art-auction/blog-details">The auctioneer angle behind then scenes of bidding.</Link></h4>
                  <Link className="view-button" href="/art-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
                <div className="batch">
                  <Link href="/art-auction/blog-grid" className="date">
                    03 January, 2024
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card four mt-40">
                <div className="blog-card-img-wrap">
                  <Link href="/art-auction/blog-details" className="card-img">
                    <img src="../assets/img/home4/blog-img2.jpg" alt="" />
                  </Link>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/art-auction/blog-grid">ROCOCO</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (15)</span>
                    </div>
                  </div>
                  <h4><Link href="/art-auction/blog-details">Unction ascent rising new height in art bidding</Link></h4>
                  <Link className="view-button" href="/art-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
                <div className="batch">
                  <Link href="/art-auction/blog-grid" className="date">
                    24 March, 2024
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="blog-card four mt-90">
                <div className="blog-card-img-wrap">
                  <Link href="/art-auction/blog-details" className="card-img">
                    <img src="../assets/img/home4/blog-img3.jpg" alt="" />
                  </Link>
                </div>
                <div className="card-content">
                  <div className="blog-meta">
                    <ul className="category">
                      <li><Link href="/art-auction/blog-grid">ABSTRACT</Link></li>
                    </ul>
                    <div className="blog-comment">
                      <span>Comment (12)</span>
                    </div>
                  </div>
                  <h4><Link href="/art-auction/blog-details">Auction alert stay informed, Bid you confidently.</Link></h4>
                  <Link className="view-button" href="/art-auction/blog-details">
                    Read More
                    <svg viewBox="0 0 13 20">
                      <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                    </svg>
                  </Link>
                </div>
                <div className="batch">
                  <Link href="/art-auction/blog-grid" className="date">
                    07 March, 2024
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

export default Home4Blog
