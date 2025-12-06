import React from 'react'

const Home3Faq = () => {
  return (
    <>
      <div className="home3-faq-section mb-110">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title2 text-center">
                <span><i className="bi bi-arrow-right" />QUESTION NOW</span>
                <h2>Frequently Asked <span>Questions.</span></h2>
              </div>
            </div>
          </div>
          <div className="faq-wrap wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <div className="faq-content">
              <div className="accordion" id="accordionTravel">
                <div className="row g-lg-5 g-4">
                  <div className="col-lg-6">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseOne" aria-expanded="true" aria-controls="faqcollapseOne">
                          01. What is an auction?
                        </button>
                      </h2>
                      <div id="faqcollapseOne" className="accordion-collapse collapse show" aria-labelledby="faqheadingOne" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          An auction is a public sale where goods or services are sold to the highest bidder. Bidders compete to offer the highest price, and the item is awarded to the bidder with the highest bid when the auction ends.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseTwo" aria-expanded="false" aria-controls="faqcollapseTwo">
                          02. How do auctions work?
                        </button>
                      </h2>
                      <div id="faqcollapseTwo" className="accordion-collapse collapse" aria-labelledby="faqheadingTwo" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          Auctions allow items to be sold to the highest bidder. Participants bid on the item until the highest bid is reached within a set timeframe. The highest bidder wins and pays the bid amount.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseThree" aria-expanded="false" aria-controls="faqcollapseThree">
                          03. What types of auctions are there?
                        </button>
                      </h2>
                      <div id="faqcollapseThree" className="accordion-collapse collapse" aria-labelledby="faqheadingThree" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          Types of auctions include English (ascending bid), Dutch (descending bid), sealed-bid (highest bid wins), and Vickrey (sealed-bid, second-highest bid wins). Additionally, there are reverse (lowest bid wins) and silent (secret bids) auctions, catering to various selling dynamics and bidder preferences.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseFour" aria-expanded="false" aria-controls="faqcollapseFour">
                          04. Who can participate in auctions?
                        </button>
                      </h2>
                      <div id="faqcollapseFour" className="accordion-collapse collapse" aria-labelledby="faqheadingFour" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          Anyone meeting auction requirements, typically 18 years or older, can participate. Registration may be necessary, depending on the auction platform. Ensure compliance with specific auction rules and regulations.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingFive">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseFive" aria-expanded="true" aria-controls="faqcollapseFive">
                          05. What happens if I win an auction?
                        </button>
                      </h2>
                      <div id="faqcollapseFive" className="accordion-collapse collapse" aria-labelledby="faqheadingFive" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          If you win an auction, you're obligated to purchase the item at the winning bid price. Follow payment instructions provided by the auction platform. Non-compliance may lead to penalties or account suspension.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseSix" aria-expanded="false" aria-controls="faqcollapseSix">
                          06. Can I sell items at auctions?
                        </button>
                      </h2>
                      <div id="faqcollapseSix" className="accordion-collapse collapse" aria-labelledby="faqheadingSix" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          Yes, you can sell items at auctions. Simply register as a seller, list your items, set starting bids, and let buyers bid. Ensure to follow auction guidelines and provide accurate descriptions for successful transactions.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingSeven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseSeven" aria-expanded="false" aria-controls="faqcollapseSeven">
                          07. What are some tips for successful auction?
                        </button>
                      </h2>
                      <div id="faqcollapseSeven" className="accordion-collapse collapse" aria-labelledby="faqheadingSeven" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          For a successful auction, ensure clear item descriptions, set reasonable starting prices, promote the event widely, and engage bidders with interactive platforms.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="faqheadingEight">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqcollapseEight" aria-expanded="false" aria-controls="faqcollapseEight">
                          08. Are there risks associated buying at auctions?
                        </button>
                      </h2>
                      <div id="faqcollapseEight" className="accordion-collapse collapse" aria-labelledby="faqheadingEight" data-bs-parent="#accordionTravel">
                        <div className="accordion-body">
                          Yes, buying at auctions carries risks such as overbidding, hidden defects, and lack of warranties. It's crucial to research items beforehand, set budget limits, and inspect thoroughly to mitigate potential pitfalls.
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

export default Home3Faq
