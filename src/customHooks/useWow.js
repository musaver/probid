"use client";
import { useEffect } from "react";

const useWow = () => {
  useEffect(() => {
    const initWow = () => {
      try {
        const wowjs = require("wowjs");
        const WOW = wowjs.WOW || wowjs.default || wowjs;
        if (typeof WOW === 'function') {
          new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 80,
            mobile: true,
            live: true,
          }).init();
        } else {
          // WOW.js not properly loaded, silently skip initialization
          // This is not critical for functionality
        }
      } catch (error) {
        // WOW.js failed to load, silently skip initialization
      }
    };

    if (typeof window !== "undefined") {
      initWow();

      const handleRouteChange = () => {
        if (typeof window.WOW !== "undefined") {
          window.WOW.sync();
        }
      };

      // Listen for route changes
      if (typeof document !== "undefined") {
        document.addEventListener("routeChangeComplete", handleRouteChange);

        return () => {
          document.removeEventListener("routeChangeComplete", handleRouteChange);
        };
      }
    }
  }, []);
};

export default useWow;
