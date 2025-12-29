import Link from "next/link";
import React from "react";

const Home3Banner = () => {
  return (
    <>
      <div className="home3-banner-section mb-110">
        <div className="banner-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content">
                <h1>
                  Select <span>Our Product</span> At our Auction.
                </h1>
                <p>
                  Join us as we carve a path to success, driven by passion,
                  powered by innovation, and we're here to turn them into
                  reality.
                </p>
                <div className="button-area">
                  <Link
                    className="primary-btn2 btn-hover"
                    href="/antiques-auction/auction-grid"
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
                    className="primary-btn2 btn-hover white-bg"
                    href="/antiques-auction/auction-grid"
                  >
                    View All Auction
                    <span style={{ top: "40.5px", left: "84.2344px" }} />
                  </Link>
                </div>
                <div className="partner-area">
                  <h6>Trusted Partner:</h6>
                  <ul>
                    <li>
                      <img
                        src="../assets/img/home3/icon/partner-logo1.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="../assets/img/home3/icon/partner-logo2.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="../assets/img/home3/icon/partner-logo3.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="../assets/img/home3/icon/partner-logo4.svg"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src="../assets/img/home3/icon/partner-logo5.svg"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-img">
                <div className="row g-3 align-items-center">
                  <div className="col-lg-6">
                    <div className="banner-left-img">
                      <img
                        src="../assets/img/home3/banner-left-img.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="banner-right-img-grp">
                      <img
                        src="../assets/img/home3/banner-right-top-img.jpg"
                        alt=""
                        className="right-top-img"
                      />
                      <img
                        src="../assets/img/home3/banner-right-bottom-img.jpg"
                        alt=""
                        className="right-bottom-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="social-list">
            <li>
              <a href="https://www.facebook.com/">
                <i className="bx bxl-facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/">
                <i className="bi bi-twitter-x" />
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/">
                <i className="bx bxl-pinterest-alt" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <i className="bx bxl-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home3Banner;
