
import React from "react";
import blogData from "../../../data/blog-data.json";
import Link from "next/link";

const CarAucitonBlog = () => {
    const blogGridData = blogData["blog_grid"];
  return (
    <>
      <div className="blog-grid-section pt-110 mb-110">
        <div className="container">
          <div className="row g-4 mb-60">
            {blogGridData.map((data) => {
              const {
                blog_id,
                blog_title,
                blog_image,
                blog_url,
                blog_date,
                blog_author,
                blog_comment,
                blog_category,
              } = data;
              return (
                <>
                  <div
                    key={blog_id}
                    className="col-lg-4 col-md-6 wow animate fadeInDown"
                    data-wow-delay="200ms"
                    data-wow-duration="1500ms"
                  >
                    <div className="blog-card">
                      <div className="blog-card-img-wrap">
                        <Link href={blog_url} className="card-img">
                          <img src={blog_image} alt="" />
                        </Link>
                        <div className="batch">
                          <Link href={blog_url} className="date">
                            {blog_date}
                          </Link>
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="blog-meta">
                          <ul className="category">
                            <li>
                              <Link href={blog_url}>{blog_category}</Link>
                            </li>
                          </ul>
                          <div className="blog-comment">
                            <span>Comment ({blog_comment})</span>
                          </div>
                        </div>
                        <h4>
                          <Link href={blog_url}>{blog_title}</Link>
                        </h4>
                        <Link className="view-button" href={blog_url}>
                          Read More
                          <svg viewBox="0 0 13 20">
                            <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="row">
            <div
              className="col-lg-12 d-flex justify-content-center wow animate fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-pagination-area">
                <ul className="paginations">
                  <li className="page-item active">
                    <a href="#">01</a>
                  </li>
                  <li className="page-item">
                    <a href="#">02</a>
                  </li>
                  <li className="page-item">
                    <a href="#">03</a>
                  </li>
                  <li className="page-item paginations-button">
                    <a href="#">
                      <svg
                        width={16}
                        height={13}
                        viewBox="0 0 16 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.557 10.1026L1.34284 1.89603M15.557 10.1026C12.9386 8.59083 10.8853 3.68154 12.7282 0.489511M15.557 10.1026C12.9386 8.59083 7.66029 9.2674 5.81744 12.4593"
                          strokeWidth="0.96"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarAucitonBlog