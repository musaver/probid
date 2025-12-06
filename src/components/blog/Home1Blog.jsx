import React from 'react'
import blogData from "../../data/blog-data.json";
import Link from 'next/link';
const Home1Blog = () => {

  return (
    <div className="home1-blog-section mb-110">
      <div className="container">
        <div className="row mb-50">
          <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="section-title text-center">
              <h2>Exploring Our <span>Article</span></h2>
              <p>Feel free adapt this based on the specific managed services, features</p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {
            blogData["home1-blog"].map((data) => {
              const { blog_id, blog_title, blog_comment, blog_category, blog_data, blog_image } = data
              return (
                <div key={blog_id} className="col-lg-4 col-md-6 wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                  <div className="blog-card">
                    <div className="blog-card-img-wrap">
                      <Link href="/blog-details" className="card-img">
                        <img src={blog_image} alt="" />
                      </Link>
                      <div className="batch">
                        <Link href="/blog-grid" className="date">
                          {blog_data}
                        </Link>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="blog-meta">
                        <ul className="category">
                          <li><Link href="/blog-grid">{blog_category}</Link></li>
                        </ul>
                        <div className="blog-comment">
                          <span>Comment ({blog_comment})</span>
                        </div>
                      </div>
                      <h4><Link href="/blog-details">{blog_title}</Link></h4>
                      <Link className="view-button" href="/blog-details">
                        Read More
                        <svg viewBox="0 0 13 20">
                          <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home1Blog
