import Image from "next/image";


const VideoSection = () => {
  return (
    <section className="homepage-video">
      <div className="container">
        <div className="homepage-video__wrapper">
          <Image src="/images/Container (2).png" alt="Auction highlight" width={1200} height={600} />
          <button type="button" className="homepage-video__play" aria-label="Play intro video">
            <svg width="65" height="81" viewBox="0 0 65 81" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.4987 64.0521C49.9252 64.0521 64.0521 49.9252 64.0521 32.4987C64.0521 15.0722 49.9252 0.945312 32.4987 0.945312C15.0722 0.945312 0.945312 15.0722 0.945312 32.4987C0.945312 49.9252 15.0722 64.0521 32.4987 64.0521Z" stroke="white" strokeWidth="0.315534" strokeMiterlimit="10" />
              <path d="M5.17578 16.7227C13.8845 1.64015 33.1952 -3.53461 48.2777 5.17413C63.3602 13.8829 68.535 33.1935 59.8263 48.2761" stroke="white" strokeWidth="1.26214" strokeMiterlimit="10" />
              <path d="M59.8246 48.2761C51.1159 63.3586 31.8052 68.5333 16.7227 59.8246C1.64015 51.1159 -3.53461 31.8052 5.17413 16.7227" stroke="white" strokeWidth="1.26214" strokeMiterlimit="10" />
              <path d="M39.5589 30.5009L25.0255 22.1009V38.9009L39.5589 30.5009ZM41.4255 28.7676C42.1366 29.1232 42.4922 29.7009 42.4922 30.5009C42.4922 31.3009 42.1366 31.8787 41.4255 32.2343L25.5589 41.4343C24.9366 41.8787 24.27 41.9009 23.5589 41.5009C22.8477 41.1009 22.4922 40.5009 22.4922 39.7009V21.3009C22.4922 20.5009 22.8477 19.9009 23.5589 19.5009C24.27 19.1009 24.9366 19.1232 25.5589 19.5676L41.4255 28.7676Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

