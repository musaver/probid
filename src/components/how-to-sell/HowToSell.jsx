"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const HowToSell = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div className="how-to-sell-section pt-110 mb-110">
        <div className="container">
          <div className="row justify-content-center mb-70">
            <div className="col-lg-10">
              <div className="how-to-sell-wrap">
                <div className="row mb-25">
                  <div className="col-lg-5 col-md-6">
                    <div className="single-step">
                      <span>Step-01</span>
                      <h2>Registration</h2>
                      <p>
                        {" "}
                        Clearly state your pricing structure, payment terms and
                        and any additional charges. Specifying when &amp;
                        payment invoices will be issued, as well as your
                        accepted.
                      </p>
                      <div className="arrow">
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end mb-25">
                  <div className="col-lg-5 col-md-6">
                    <div className="single-step two">
                      <span>Step-02</span>
                      <h2>Select Platform</h2>
                      <p>
                        {" "}
                        Clearly state your pricing structure, payment terms and
                        and any additional charges. Specifying when &amp;
                        payment invoices will be issued, as well as your
                        accepted.
                      </p>
                      <div className="arrow">
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-25">
                  <div className="col-lg-5 col-md-6">
                    <div className="single-step">
                      <span>Step-03</span>
                      <h2>Listing the Item</h2>
                      <p>
                        {" "}
                        Clearly state your pricing structure, payment terms and
                        and any additional charges. Specifying when &amp;
                        payment invoices will be issued, as well as your
                        accepted.
                      </p>
                      <div className="arrow">
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end mb-25">
                  <div className="col-lg-5 col-md-6">
                    <div className="single-step two">
                      <span>Step-04</span>
                      <h2>Managing the Auction</h2>
                      <p>
                        {" "}
                        Clearly state your pricing structure, payment terms and
                        and any additional charges. Specifying when &amp;
                        payment invoices will be issued, as well as your
                        accepted.
                      </p>
                      <div className="arrow">
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-25">
                  <div className="col-lg-5 col-md-6">
                    <div className="single-step">
                      <span>Step-05</span>
                      <h2>Closing the Auction </h2>
                      <p>
                        {" "}
                        Clearly state your pricing structure, payment terms and
                        and any additional charges. Specifying when &amp;
                        payment invoices will be issued, as well as your
                        accepted.
                      </p>
                      <div className="arrow">
                        <svg
                          width={11}
                          height={11}
                          viewBox="0 0 11 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10.501 10.501L2.99848 10.501L2.99848 9.66931L9.07931 9.66931L0.498476 1.08897L1.08848 0.500977L9.66764 9.07965L9.66764 2.99515L10.501 2.99515L10.501 10.501Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="video-tutorial-area">
            <h2>Guidelines For Selling</h2>
            <div className="video-wrapper">
              <img
                src="assets/img/inner-pages/how-to-sell-video-img.jpg"
                alt=""
              />
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
                className="video-area video-player"
              >
                <div className="icon">
                  <svg
                    className="video-circle"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="65px"
                    viewBox="0 0 206 206"
                    style={{ enableBackground: "new 0 0 206 206" }}
                    xmlSpace="preserve"
                  >
                    <circle
                      className="circle"
                      strokeMiterlimit={10}
                      cx={103}
                      cy={103}
                      r={100}
                    />
                    <path
                      className="circle-half top-half"
                      strokeWidth={4}
                      strokeMiterlimit={10}
                      d="M16.4,53C44,5.2,105.2-11.2,153,16.4s64.2,88.8,36.6,136.6"
                    />
                    <path
                      className="circle-half bottom-half"
                      strokeWidth={4}
                      strokeMiterlimit={10}
                      d="M189.6,153C162,200.8,100.8,217.2,53,189.6S-11.2,100.8,16.4,53"
                    />
                  </svg>
                  <i className="bi bi-play" />
                </div>
              </a>
            </div>
            <React.Fragment>
              <ModalVideo
                channel="youtube"
                onClick={() => setOpen(true)}
                isOpen={isOpen}
                animationSpeed="350"
                videoId="r4KpWiK08vM"
                ratio="16:9"
                onClose={() => setOpen(false)}
              />
            </React.Fragment>
          </div>
        </div>
      </div>
        </>
    )
}

export default HowToSell
