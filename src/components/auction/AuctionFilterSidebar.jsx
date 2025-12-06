"use client"
import Link from "next/link";
import React, { useState } from "react";
import SingleSearchBox from "../common/SingleSearchBox";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



const AuctionFilterSidebar = ({ isMenuOpen }) => {
  const condition = ["New", "Used", "Refurbished"];
  const countries = ["Spain", "France", "Brazil", "Bangladesh"];
  const [value, setValue] = useState([20, 37]);

  function valuetext(value) {
    return `${value}`;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const period = [
    "Today  (110)",
    "Yesterday (115)",
    "Last 7 Days (515)",
    "Last 30 Days (945)",
  ];
  const sales = ["Online", "In-Store", "Phone Order", "Email Order"];
  return (
    <div className={`filter-sidebar ${isMenuOpen ? "slide" : ""}`}>
      <div className="auction-sidebar">
        <form>
          <div className="single-widget mb-30">
            <div className="search-box">
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i className="bx bx-search" />
              </button>
            </div>
          </div>
          <div className="single-widget mb-30">
            <SingleSearchBox
              placeholder="Online"
              options={sales}
              label="Sales"
              variant="two"
            />
          </div>
          <div className="single-widget mb-30">
            <h5 className="widget-title">Category</h5>
            <div className="checkbox-container">
              <ul>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Automotive</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Antiques</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Digital Art</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Books &amp; Comic</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Old Coin</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Gadget and Technology</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="single-widget mb-30">
            <SingleSearchBox
              placeholder="Country"
              options={countries}
              label="Country"
              variant="two"
            />
          </div>
          <div className="single-widget mb-30">
            <SingleSearchBox
              placeholder="Today  (110)"
              options={period}
              label="Period"
              variant="two"
            />
          </div>
          <div className="single-widget mb-30">
            <SingleSearchBox
              placeholder="New"
              options={condition}
              label="Condition"
              variant="two"
            />
          </div>
          <div className="single-widget mb-30">
            <h5 className="widget-title">Price</h5>
            <Box sx={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%', xl: '20%', }}>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                sx={{
                  color: '#222222', // Change the color here
                }}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <div className="range-wrap">
                <div className="slider-labels">
                  <div className="caption">
                    <span id="slider-range-value1" >${value[0]}</span>
                  </div>
                  <div className="caption">
                    <span id="slider-range-value2" >${value[1]}</span>
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div className="single-widget mb-30">
            <h5 className="widget-title">Type Of Sales</h5>
            <div className="checkbox-container">
              <ul>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Upcoming</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Latest</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Highest Bidding</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Live Auction</span>
                  </label>
                </li>
                <li>
                  <label className="containerss">
                    <input type="checkbox" />
                    <span className="checkmark" />
                    <span>Popular</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <div className="single-widget">
          <h5 className="widget-title">Highest Bidding</h5>
          <div className="highest-bidding-widget mb-20">
            <div className="highest-bidding-img">
              <Link href="/auction-details">
                <img
                  src="/assets/img/inner-pages/highest-bidding-img1.jpg"
                  alt=""
                />
              </Link>
            </div>
            <div className="highest-bidding-content">
              <h6>
                <Link href="/auction-details">
                  Poutsicle Hydratingani Stain offering.
                </Link>
              </h6>
              <div className="price-area">
                <span>Current Bid at:</span>
                <strong>$4,648</strong>
              </div>
            </div>
          </div>
          <div className="highest-bidding-widget mb-20">
            <div className="highest-bidding-img">
              <Link href="/auction-details">
                <img
                  src="/assets/img/inner-pages/highest-bidding-img2.jpg"
                  alt=""
                />
              </Link>
            </div>
            <div className="highest-bidding-content">
              <h6>
                <Link href="/auction-details">
                  Heritage Had Curating Watch.
                </Link>
              </h6>
              <div className="price-area">
                <span>Current Bid at:</span>
                <strong>$2,458</strong>
              </div>
            </div>
          </div>
          <div className="highest-bidding-widget">
            <div className="highest-bidding-img">
              <Link href="/auction-details">
                <img
                  src="/assets/img/inner-pages/highest-bidding-img3.jpg"
                  alt=""
                />
              </Link>
            </div>
            <div className="highest-bidding-content">
              <h6>
                <Link href="/auction-details">
                  Art decorat bronze sculpture.
                </Link>
              </h6>
              <div className="price-area">
                <span>Current Bid at:</span>
                <strong>$2,878</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionFilterSidebar;
