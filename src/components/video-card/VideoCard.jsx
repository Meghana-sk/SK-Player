import "./video-card.css";

export const VideoCard = () => {
  return (
    <article class="video-card">
      <div className="thumbnail-container">
        {/* <img src="" alt="thumbnail" className="thumbnail" /> */}
      </div>
      <div className="video-details">
        <div className="channel-container">
          {/* <img src="" alt="channel-name" /> */}
        </div>
        <div className="video-all-details">
          <h4 className="video-title">Video title</h4>
          <h6 className="channel-name">Channel name</h6>
          <span className="views">12k views</span>
          <span className="time-stamp">, 2 yr ago</span>
        </div>
      </div>
    </article>
  );
};
