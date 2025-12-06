import React from 'react'
import Marquee from 'react-fast-marquee'

const Home1LogoSection = () => {
  return (
    <div className="logo-section mb-110">
      <div className="logo-wrap">
        <div className="container">
          <div className="logo-title wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <h6>We Worked With Global Largest Brand</h6>
          </div>
          <div className="logo-area">
            <div className="marquee_text">
              <Marquee loop={0}>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-01.png" alt="" /></a>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-02.png" alt="" /></a>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-03.png" alt="" /></a>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-04.png" alt="" /></a>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-05.png" alt="" /></a>
                <a href="#" style={{ marginRight: "70px" }}><img src="assets/img/home1/company-logo-06.png" alt="" /></a>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home1LogoSection
