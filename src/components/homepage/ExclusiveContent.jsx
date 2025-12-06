'use client';

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const articles = [
  {
    title: {
      line1: "Collectibles, collectibles art, and",
      line2: "uncover fascinating.",
    },
    date: "03 January, 2024",
    category: "Townhouses",
    comments: "20",
    image: "assets/img/home6/component-19.png",
  },
  {
    title: {
      line1: "Collectibles, collectibles art, and",
      line2: "uncover fascinating.",
    },
    date: "03 January, 2024",
    category: "Townhouses",
    comments: "20",
    image: "assets/img/home6/component-19.png",
  },
  {
    title: {
      line1: "Collectibles, collectibles art, and",
      line2: "uncover fascinating.",
    },
    date: "03 January, 2024",
    category: "Townhouses",
    comments: "20",
    image: "assets/img/home6/component-19.png",
  },
  {
    title: {
      line1: "Collectibles, collectibles art, and",
      line2: "uncover fascinating.",
    },
    date: "03 January, 2024",
    category: "Townhouses",
    comments: "20",
    image: "assets/img/home6/component-19.png",
  },
];

const ExclusiveContent = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll left handler
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -404, // card width (394px) + gap (10px)
        behavior: 'smooth'
      });
    }
  };

  // Scroll right handler
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 404, // card width (394px) + gap (10px)
        behavior: 'smooth'
      });
    }
  };

  // Update scroll position on mount and scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    checkScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <section className="homepage-exclusive">
      <div className="container">
        <div className="homepage-exclusive__header">
          <div>
            <button className="homepage-features__list-btn1">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967L10.7574 0.696699C10.4645 0.403806 9.98959 0.403806 9.6967 0.696699C9.40381 0.989593 9.40381 1.46447 9.6967 1.75736L13.9393 6L9.6967 10.2426C9.40381 10.5355 9.40381 11.0104 9.6967 11.3033C9.98959 11.5962 10.4645 11.5962 10.7574 11.3033L15.5303 6.53033ZM0 6.75H15V5.25H0V6.75Z"
                  fill="currentColor"
                />
              </svg>
              READ OUR
            </button>
            <h2 className="custom-heading">
              <span className="bold">Exclusive</span>
              <span className="light">Content</span>
            </h2>          </div>

          <div className="carousel-navigation-buttons">
            <button
              type="button"
              className={`carousel-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`carousel-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="modern-cards-container" ref={containerRef}>
          {articles.map((article, index) => (
            <article key={`article-${index}`} className="modern-blog-card">
              {/* Category & Tags Section */}
              <div className="card-meta">
                <span className="card-category">{article.category}</span>
                <span className="meta-separator">•</span>
                <span className="card-comments">Comment ({article.comments})</span>
              </div>

              {/* Heading Section */}
              <div className="card-heading">
                <h3>
                  {article.title.line1}
                  <br />
                  {article.title.line2}
                </h3>
              </div>

              {/* Image Section with Date Overlay */}
              <div className="card-image-wrapper">
                <img
                  src={article.image}
                  alt={`${article.title.line1} ${article.title.line2}`}
                  className="card-image"
                />
                <div className="card-date-badge">{article.date}</div>
              </div>

              {/* Read More Button */}
              <Link href="/blog-details" className="card-read-more">
                Read More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="read-more-arrow"
                >
                  <path
                    d="M15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967L10.7574 0.696699C10.4645 0.403806 9.98959 0.403806 9.6967 0.696699C9.40381 0.989593 9.40381 1.46447 9.6967 1.75736L13.9393 6L9.6967 10.2426C9.40381 10.5355 9.40381 11.0104 9.6967 11.3033C9.98959 11.5962 10.4645 11.5962 10.7574 11.3033L15.5303 6.53033ZM0 6.75H15V5.25H0V6.75Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Header with Navigation */
        .homepage-exclusive__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        /* Carousel Navigation Buttons Container */
        .carousel-navigation-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* Circular Navigation Button */
        .carousel-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid #0b0c0c;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #0b0c0c;
          padding: 0;
        }

        .carousel-nav-btn:hover:not(.disabled) {
          background: #0b0c0c;
          color: #ffffff;
        }

        .carousel-nav-btn.disabled {
          border-color: rgba(232, 232, 232, 0.6);
          color: rgba(11, 12, 12, 0.3);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .carousel-nav-btn svg {
          width: 16px;
          height: 16px;
        }

        .carousel-nav-btn:first-child svg {
          transform: rotate(300deg);
        }

        .carousel-nav-btn:last-child svg {
          transform: rotate(45deg);
        }

        /* Container for Cards */
        .modern-cards-container {
          display: flex;
          gap: 10px;
          width: 100%;
          overflow-x: scroll;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .modern-cards-container::-webkit-scrollbar {
          display: none;
        }

        /* Individual Card Container */
        .modern-blog-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
          width: 100%;
          max-width: 394px;
          height: 450px;
          background: #ffffff;
          border: 1px solid rgba(232, 232, 232, 0.6);
          border-radius: 30px;
          padding: 25px 16px 29.53px 16px;
          flex-shrink: 0;
        }

        /* Category & Tags Section */
        .card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1;
        }

        .card-category {
          color: #0b0c0c;
        }

        .meta-separator {
          width: 3px;
          height: 3px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          display: inline-block;
        }

        .card-comments {
          color: rgba(11, 12, 12, 0.5);
        }

        /* Heading Section */
        .card-heading {
          width: 100%;
        }

        .card-heading h3 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 21px;
          line-height: 27.3px;
          color: #0b0c0c;
          margin: 0;
          letter-spacing: 0.88px;
        }

        /* Image Section */
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 249.84px;
          border-radius: 15px;
        }

        .card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Date Badge Overlay */
        .card-date-badge {
          position: absolute;
          top: -6px;
          left: 0;
          background: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: rgba(35, 41, 31, 0.73);
          padding: 9px 24px 9px 16px;
          border-radius: 0 15px 15px 0;
          z-index: 2;
        }

        /* Read More Button */
        .card-read-more {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #000000;
          text-decoration: none;
          width: 89.3px;
          transition: opacity 0.3s ease;
        }

        .card-read-more:hover {
          opacity: 0.7;
        }

        .read-more-arrow {
          transform: rotate(45deg);
          width: 14px;
          height: 14px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .modern-cards-container {
            gap: 15px;
          }

          .modern-blog-card {
            max-width: calc(50% - 7.5px);
          }

          .carousel-nav-btn {
            width: 40px;
            height: 40px;
          }

          .carousel-nav-btn svg {
            width: 14px;
            height: 14px;
          }

          .carousel-nav-btn:first-child svg {
            transform: rotate(300deg);
          }

          .carousel-nav-btn:last-child svg {
            transform: rotate(45deg);
          }
        }

        @media (max-width: 768px) {
          .homepage-exclusive__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .carousel-navigation-buttons {
            align-self: flex-end;
          }

          .modern-cards-container {
            overflow-x: auto;
            -ms-overflow-style: auto;
            scrollbar-width: auto;
          }

          .modern-cards-container::-webkit-scrollbar {
            display: block;
            height: 4px;
          }

          .modern-cards-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .modern-cards-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }

          .modern-blog-card {
            max-width: 300px;
          }

          .carousel-navigation-buttons {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ExclusiveContent;

