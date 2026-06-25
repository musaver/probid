'use client';

import Image from "next/image";
import Link from 'next/link'
import React from 'react'


const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-wrapper">
          <div className="container">
            <div className="footer-menu-wrap simple">
              <div className="row g-lg-4 gy-5 align-items-start">
                <div className="col-lg-3 col-md-6">
                  <div className="footer-logo-area simple">
                    <div className="footer-logo">
                      <Image src="/images/logo.png" alt="Bid Bridge logo" width={120} height={120} style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="footer-widget">
                    <div className="widget-title">
                      <h4>Company</h4>
                    </div>
                    <ul className="widget-list">
                      <li><Link href="/about">About us</Link></li>
                      <li><Link href="/faq">F.A.Q</Link></li>
                      {/* Hidden for now — re-enable when "Our Brand" page is ready:
                      <li><a href="#">Our Brand</a></li>
                      */}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-widget">
                    <div className="widget-title">
                      <h4>Support</h4>
                    </div>
                    <ul className="widget-list">
                      <li><Link href="/support-center">Help &amp; Support</Link></li>
                      <li><Link href="/contact">Contact Us</Link></li>
                      <li><Link href="/terms-condition">Terms of Service</Link></li>
                      <li><Link href="/privacy-policy">Our Policy</Link></li>
                    </ul>
                  </div>
                </div>
                {/* Hidden for now — re-enable & wire to a mailing list when ready:
                <div className="col-lg-3 col-md-6">
                  <div className="newletter-and-payment-wrap">
                    <div className="newletter-area">
                      <h4>Join Our Newsletter</h4>
                      <form>
                        <div className="form-inner">
                          <input type="email" placeholder="Email Address" />
                          <button type="submit"><i className="bi bi-arrow-right" /></button>
                        </div>
                      </form>
                    </div>

                  </div>
                </div>
                */}
              </div>
            </div>
            <div className="footer-bottom">

              <div className="footer-bottom-right">
                <ul>
                  <li><Link href="/support-center">Support Center</Link></li>
                  <li><Link href="/terms-condition">Terms &amp; Conditions</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* First Column Left Alignment and Container */
        :global(.footer-logo-area.simple) {
          display: flex;
          flex-direction: column;
          align-items: flex-start !important;
          text-align: left !important;
          max-width: 100%;
          overflow: hidden;
        }

        :global(.footer-logo-area.simple .footer-logo) {
          text-align: left !important;
          margin-bottom: 20px;
        }

        /* Ensure Footer Bottom Layout */
        :global(.footer-bottom) {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          flex-wrap: wrap;
        }

        :global(.footer-bottom .copyright-area) {
          flex: 0 0 auto;
        }

        :global(.footer-bottom .footer-bottom-right) {
          flex: 0 0 auto;
          margin-left: auto;
        }

        :global(.footer-bottom .footer-bottom-right ul) {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          :global(.footer-bottom) {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          :global(.footer-bottom .footer-bottom-right) {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Footer
