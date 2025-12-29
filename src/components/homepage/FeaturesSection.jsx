const features = [
  {
    title: "Explore Top Properties",
    description: "Explore bidder-ready homes across top cities. Mauris urna purus, accumsan.",
    icon: "images/icons/Container.png",
  },
  {
    title: "Verified Listings",
    description: "Every listing is screened for quality and accuracy. Mauris urna purus, accumsan.",
    icon: "images/icons/Container (1).png",
  },
  {
    title: "Market Trends",
    description: "Get insights to bid smart with live trends. Mauris urna purus, accumsan.",
    icon: "images/icons/Container (2).png",
  },
  {
    title: "Community Support",
    description: "Our experts are ready to assist you at every step. Mauris urna purus, accumsan.",
    icon: "images/icons/Container (3).png",
  },
];

const FeaturesSection = () => {
  return (
    <section className="homepage-features">
      <div className="container">
        <div className="homepage-features__inner">
          <button className="homepage-features__list-btn">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967L10.7574 0.696699C10.4645 0.403806 9.98959 0.403806 9.6967 0.696699C9.40381 0.989593 9.40381 1.46447 9.6967 1.75736L13.9393 6L9.6967 10.2426C9.40381 10.5355 9.40381 11.0104 9.6967 11.3033C9.98959 11.5962 10.4645 11.5962 10.7574 11.3033L15.5303 6.53033ZM0 6.75H15V5.25H0V6.75Z" fill="currentColor"/>
            </svg>
            FEATURES LIST
           
          </button>
          <h2>Highlighted <span>Features</span></h2>
          <div className="homepage-features__grid">
            {features.map((feature) => (
              <div key={feature.title} className="homepage-features__item">
                <div className="homepage-features__icon">
                  <img src={feature.icon} alt="" />
                </div>
                <div className="homepage-features__content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

