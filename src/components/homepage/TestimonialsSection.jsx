'use client';

import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Brooks Abelam",
    role: "CEO At Auction.com",
    quote:
      "Working with Nub has been a game-changer for our business. Their SEO services have helped us rank higher on search engines and attract more organic traffic to our website.",
    avatar: "assets/img/brands/Container.png",
    rating: "Great Auction Property!",
  },
  {
    name: "Weston Bennett",
    role: "CEO At Auction.com",
    quote:
      "Please feel free to alter the main features in a way that best explains to prospective customers the precise benefits they will receive at each price point.",
    avatar: "assets/img/brands/Container (1).png",
    rating: "Fantastic Bidding Item!",
  },
];

const TestimonialsSection = () => {
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
        left: -500,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right handler
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500,
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
    <section className="homepage-testimonials">
      <div className="container">
        <div className="homepage-testimonials__header">
          <div className="homepage-testimonials__title">
            <button className="homepage-features__list-btn">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967L10.7574 0.696699C10.4645 0.403806 9.98959 0.403806 9.6967 0.696699C9.40381 0.989593 9.40381 1.46447 9.6967 1.75736L13.9393 6L9.6967 10.2426C9.40381 10.5355 9.40381 11.0104 9.6967 11.3033C9.98959 11.5962 10.4645 11.5962 10.7574 11.3033L15.5303 6.53033ZM0 6.75H15V5.25H0V6.75Z" fill="currentColor" />
              </svg>
              TESTIMONIAL
            </button>
            <h2 className="custom-heading">
              <span className="bold">Customer</span> <span className="light">Stories</span>
            </h2>
          </div>

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
        <div className="homepage-testimonials__grid" ref={containerRef}>
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="homepage-testimonials__card">
              <div className="homepage-testimonials__author-header">
                <div className="homepage-testimonials__author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <div className="homepage-testimonials__rating">
                  {testimonial.rating}
                </div>
              </div>
              <p className="homepage-testimonials__quote">"{testimonial.quote}"</p>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Header with Navigation */
        .homepage-testimonials__header {
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

        /* Make testimonials grid scrollable */
        .homepage-testimonials__grid {
          overflow-x: scroll;
          scroll-behavior: smooth;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .homepage-testimonials__grid::-webkit-scrollbar {
          display: none;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
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
          .homepage-testimonials__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .carousel-navigation-buttons {
            align-self: flex-end;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;

