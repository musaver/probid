import Link from 'next/link'
import React from 'react'

const Home5blog = () => {
  return (
    <>
      <div className="home5-blog-section">
        <div className="container">
          <div className="row mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="section-title4">
                <span>Article &amp; Blog</span>
                <h2>Inspirational <span>Insights</span></h2>
              </div>
              <Link className="view-button2 two" href="/blog-grid">
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
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="blog-card2">
                <div className="blog-meta">
                  <ul className="category">
                    <li><Link href="/gadget-and-technology/blog-grid">Smartwatch</Link></li>
                  </ul>
                  <div className="blog-comment">
                    <span>Comment (20)</span>
                  </div>
                </div>
                <h4><Link href="/gadget-and-technology/blog-details">Tech Talk Exploring our th Latest Heavy Gadgets.</Link></h4>
                <div className="blog-card-img-wrap">
                  <Link href="/gadget-and-technology/blog-details" className="card-img">
                    <img src="../assets/img/home5/blog-img1.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/gadget-and-technology/blog-grid" className="date">
                      03 January, 2024
                    </Link>
                  </div>
                </div>
                <p>Cras cursus faucibus enim porta. Curabitur an refuge tortor. Duis ut egestas libero. Aenean id lacin est.</p>
                <Link className="view-button" href="/blog-details">
                  Read More
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="blog-card2">
                <div className="blog-meta">
                  <ul className="category">
                    <li><Link href="/gadget-and-technology/blog-grid">Computer</Link></li>
                  </ul>
                  <div className="blog-comment">
                    <span>Comment (25)</span>
                  </div>
                </div>
                <h4><Link href="/gadget-and-technology/blog-details">Gadget Guide Source for Tech Reviews and News.</Link></h4>
                <div className="blog-card-img-wrap">
                  <Link href="/gadget-and-technology/blog-details" className="card-img">
                    <img src="../assets/img/home5/blog-img2.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/gadget-and-technology/blog-grid" className="date">
                      28 January, 2024
                    </Link>
                  </div>
                </div>
                <p>Cras cursus faucibus enim porta. Curabitur an refuge tortor. Duis ut egestas libero. Aenean id lacin est.</p>
                <Link className="view-button" href="/blog-details">
                  Read More
                  <svg viewBox="0 0 13 20">
                    <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="blog-card2">
                <div className="blog-meta">
                  <ul className="category">
                    <li><Link href="/gadget-and-technology/blog-grid">Drone</Link></li>
                  </ul>
                  <div className="blog-comment">
                    <span>Comment (18)</span>
                  </div>
                </div>
                <h4><Link href="/gadget-and-technology/blog-details">Digital Delights Explor the World of All Gadgets.</Link></h4>
                <div className="blog-card-img-wrap">
                  <Link href="/gadget-and-technology/blog-details" className="card-img">
                    <img src="../assets/img/home5/blog-img3.jpg" alt="" />
                  </Link>
                  <div className="batch">
                    <Link href="/gadget-and-technology/blog-grid" className="date">
                      31 January, 2024
                    </Link>
                  </div>
                </div>
                <p>Cras cursus faucibus enim porta. Curabitur an refuge tortor. Duis ut egestas libero. Aenean id lacin est.</p>
                <Link className="view-button" href="/blog-details">
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

    </>
  )
}

export default Home5blog
