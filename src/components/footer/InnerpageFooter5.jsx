import Link from 'next/link'
import React from 'react'

const InnerpageFooter5 = () => {
  return (
    <>
      <footer className="style-5">
        <div className="footer-wrapper two">
          <div className="container">
            <div className="footer-menu-wrap">
              <div className="row g-lg-4 gy-5">
                <div className="col-lg-2 col-sm-6">
                  <div className="footer-widget">
                    <div className="widget-title">
                      <h4>Category</h4>
                    </div>
                    <div className="menu-container">
                      <ul className="widget-list">
                        <li><Link href="/gadget-and-technology/auction-grid">Computers</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Photography</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Virtual Reality</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Smartphones</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Smartwatches</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Audio Device</Link></li>
                        <li><Link href="/gadget-and-technology/auction-grid">Drone</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6">
                  <div className="footer-widget">
                    <div className="widget-title">
                      <h4>Company</h4>
                    </div>
                    <div className="menu-container">
                      <ul className="widget-list">
                        <li><Link href="/gadget-and-technology/how-to-buy">How to bid with us</Link></li>
                        <li><Link href="/gadget-and-technology/how-to-sell">How to sell with us</Link></li>
                        <li><Link href="/gadget-and-technology/about">About us</Link></li>
                        <li><Link href="/gadget-and-technology/faq">F.A.Q</Link></li>
                        <li><a href="#">Our Brand</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 d-flex align-items-center justify-content-lg-center justify-content-start">
                  <div className="footer-logo-area">
                    <div className="footer-logo">
                      <img src="/assets/img/footer-logo.svg" alt="" />
                    </div>
                    <div className="social-area">
                      <h5>Social Just You Connected Us!</h5>
                      <p>All of update in social</p>
                      <ul className="social-list">
                        <li>
                          <a href="https://www.linkedin.com/">
                            <i className="bi bi-linkedin" />
                            <span>LinkedIn</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/">
                            <i className="bi bi-facebook" />
                            <span>Facebook</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="bi bi-twitter-x" />
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">
                            <i className="bi bi-instagram" />
                            <span>Instagram</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 d-flex justify-content-sm-end justify-content-start">
                  <div className="newletter-and-payment-wrap">
                    <div className="newletter-area">
                      <h4>Join Our Newsletter &amp; More information.</h4>
                      <form>
                        <div className="form-inner">
                          <input type="email" placeholder="Email Address" />
                          <button type="submit"><i className="bi bi-arrow-right" /></button>
                        </div>
                      </form>
                    </div>
                    <div className="payment-area">
                      <h6>Secured Payment Gateways</h6>
                      <ul className="payment-options">
                        <li><img src="/assets/img/home1/icon/visa.svg" alt="" /></li>
                        <li><img src="/assets/img/home1/icon/master-card.svg" alt="" /></li>
                        <li><img src="/assets/img/home1/icon/american-express.svg" alt="" /></li>
                        <li><img src="/assets/img/home1/icon/maestro.svg" alt="" /></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="copyright-area">
                <p>©Copyright 2024 <Link href="/gadget-and-technology">Probid</Link> | Design By <a href="https://www.egenslab.com/">Egens Lab</a></p>
              </div>
              <div className="footer-bottom-right">
                <ul>
                  <li><Link href="/gadget-and-technology/support-center">Support Center</Link></li>
                  <li><Link href="/gadget-and-technology/terms-condition">Terms &amp; Conditions</Link></li>
                  <li><Link href="/gadget-and-technology/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default InnerpageFooter5
