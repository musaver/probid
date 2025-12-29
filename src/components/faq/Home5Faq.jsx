import React from 'react'

const Home5Faq = () => {
  return (
    <>
      <div className="home5-faq-section mb-110">
        <div className="container">
          <div className="row mb-70 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="col-lg-12">
              <div className="section-title4 text-center">
                <span>Support Us</span>
                <h2>Frequently Asked <span>Questions</span></h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="faq-wrappper two">
                <div className="faq-content">
                  <div className="accordion" id="accordionGeneral">
                    <div className="accordion-item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                      <h2 className="accordion-header" id="faqheadingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseOne" aria-expanded="true" aria-controls="faqcollapseOne">
                          What is An Auction?
                        </button>
                      </h2>
                      <div id="faqcollapseOne" className="accordion-collapse collapse show" aria-labelledby="faqheadingOne" data-bs-parent="#accordionGeneral">
                        <div className="accordion-body">
                          An auction is a public sale where goods or services are sold to the highest bidder. Bidders compete to offer the highest price, and the item is awarded to the bidder with the highest bid when the auction ends.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                      <h2 className="accordion-header" id="faqheadingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseTwo" aria-expanded="false" aria-controls="faqcollapseTwo">
                          How Do Auctions Work?
                        </button>
                      </h2>
                      <div id="faqcollapseTwo" className="accordion-collapse collapse" aria-labelledby="faqheadingTwo" data-bs-parent="#accordionGeneral">
                        <div className="accordion-body">
                          Auctions allow items to be sold to the highest bidder. Participants bid on the item until the highest bid is reached within a set timeframe. The highest bidder wins and pays the bid amount.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                      <h2 className="accordion-header" id="faqheadingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseThree" aria-expanded="false" aria-controls="faqcollapseThree">
                          What Types Of Auctions Are There?
                        </button>
                      </h2>
                      <div id="faqcollapseThree" className="accordion-collapse collapse" aria-labelledby="faqheadingThree" data-bs-parent="#accordionGeneral">
                        <div className="accordion-body">
                          Types of auctions include English (ascending bid), Dutch (descending bid), sealed-bid (highest bid wins), and Vickrey (sealed-bid, second-highest bid wins). Additionally, there are reverse (lowest bid wins) and silent (secret bids) auctions, catering to various selling dynamics and bidder preferences.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                      <h2 className="accordion-header" id="faqheadingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseFour" aria-expanded="false" aria-controls="faqcollapseFour">
                          Who Can Participate In Auctions?
                        </button>
                      </h2>
                      <div id="faqcollapseFour" className="accordion-collapse collapse" aria-labelledby="faqheadingFour" data-bs-parent="#accordionGeneral">
                        <div className="accordion-body">
                          Anyone meeting auction requirements, typically 18 years or older, can participate. Registration may be necessary, depending on the auction platform. Ensure compliance with specific auction rules and regulations.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                      <h2 className="accordion-header" id="faqheadingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseFive" aria-expanded="false" aria-controls="faqcollapseFive">
                          What Happens If I Win An Auction?
                        </button>
                      </h2>
                      <div id="faqcollapseFive" className="accordion-collapse collapse" aria-labelledby="faqheadingFive" data-bs-parent="#accordionGeneral">
                        <div className="accordion-body">
                          If you win an auction, you're obligated to purchase the item at the winning bid price. Follow payment instructions provided by the auction platform. Non-compliance may lead to penalties or account suspension.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home5Faq
