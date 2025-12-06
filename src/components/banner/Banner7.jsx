import Link from "next/link";
import React from "react";

const Banner7 = () => {
  return (
    <>
      <div className="home7-banner-section">
        <div className="container-one">
          <div className="banner-wrapper">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="banner-content">
                      <h1>
                        Select Your <span>Best Bid Product</span> At Our
                        Auction.
                      </h1>
                      <p>
                        Join us as we carve a path to success, driven by
                        passion, powered by innovation, and we're here to turn
                        them into reality.
                      </p>
                      <div className="button-area">
                        <Link
                          className="primary-btn6 btn-hover"
                          href="/multipurpose2/auction-grid"
                        >
                          Start A Bid
                          <svg
                            width={11}
                            height={11}
                            viewBox="0 0 11 11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.22781 7.97482L1.25294 -4.57764e-05L0 1.25289L7.97487 9.22776H1.25294V11H11V1.25289H9.22781V7.97482Z" />
                          </svg>
                          <span style={{ top: "40.5px", left: "84.2344px" }} />
                        </Link>
                        <Link
                          className="primary-btn6 btn-hover white-bg"
                          href="/multipurpose2/auction-grid"
                        >
                          View All Auction
                          <span style={{ top: "40.5px", left: "84.2344px" }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="banner-img d-lg-block d-none">
                      <img
                        src="../assets/img/home7/home7-banner-img.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Banner7;
