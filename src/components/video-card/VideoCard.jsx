import { useNavigate } from "react-router-dom";
import "./video-card.css";

export const VideoCard = ({
  _id,
  title,
  videoThumbnail,
  channelProfile,
  channel,
  uploadedTime,
  views,
}) => {
  const navigate = useNavigate();
  const videoPlayHandler = () => {
    navigate(`/video/${_id}`);
  };
  return (
    <article className="video-card" key={_id}>
      <div className="thumbnail-container" onClick={videoPlayHandler}>
        <img
          src={videoThumbnail}
          alt="video-thumbnail"
          className="img img-responsive"
          loading="lazy"
        />
      </div>
      <div className="video-details">
        <div className="channel-container">
          <img
            src={channelProfile}
            alt="profile"
            className="channel-img"
            loading="lazy"
          />
        </div>
        <div className="video-all-details">
          <h4 className="video-title"> {title}</h4>
          <h6 className="channel-name">{channel}</h6>
          <div className="video-actions">
            <span className="views">
              {views} views • {uploadedTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
