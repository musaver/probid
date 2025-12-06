import Link from "next/link";
import React from "react";

const Banner6 = () => {
  return (
    <>
      <div className="home6-banner-section mb-110">
        <div className="row">
          <div className="col-lg-5">
            <div className="banner-content">
              <span className="sub-title">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                </svg>
                PROBID YOU CAN TRUST
              </span>
              <h1>
                Select <span>Our Product</span> At our Auction.
              </h1>
              <p>
                Join us as we carve a path to success, driven by passion,
                powered by innovation, and we're here to turn them into reality.
              </p>
              <div className="button-area">
                <Link
                  className="primary-btn5 btn-hover"
                  href="/book-and-comic/auction-grid"
                >
                  Start A Bid
                  <svg
                    width={11}
                    height={11}
                    viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0266 9.33856L0.689022 0.000487831L-3.01181e-08 0.68951L9.33807 10.0271L2.88172 10.0271L2.88172 11.001L11.0005 11.001L11.0005 2.88221L10.0266 2.88221L10.0266 9.33856Z"
                    />
                  </svg>
                  <span style={{ top: "40.5px", left: "84.2344px" }} />
                </Link>
                <Link
                  className="primary-btn5 btn-hover white-bg"
                  href="/book-and-comic/auction-grid"
                >
                  View All Auction
                  <span style={{ top: "40.5px", left: "84.2344px" }} />
                </Link>
              </div>
              <div className="top-search-area">
                <h6>Top Searched:</h6>
                <ul>
                  <li>
                    <Link href="/book-and-comic/auction-grid">Rare Books</Link>
                  </li>
                  <li>
                    <Link href="/book-and-comic/auction-grid">Non-Fiction</Link>
                  </li>
                  <li>
                    <Link href="/book-and-comic/auction-grid">Biography</Link>
                  </li>
                  <li>
                    <Link href="/book-and-comic/auction-grid">Philosophy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="banner-img">
              <img src="../assets/img/home6/home6-banner-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner6;
