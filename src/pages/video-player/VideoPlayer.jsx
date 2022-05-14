import ReactPlayer from "react-player/lazy";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";
import { SideNav } from "../../components/side-nav/SideNav";
import "./videoplayer.css";
import { useAuth } from "../../context/authentication/auth-context";
import { useLike } from "../../context/like-video/like-video-context";
import { UPDATE_LIKED_VIDEOS } from "../../shared/types";

export const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const {
    authState: { token },
  } = useAuth();
  const navigate = useNavigate();

  const {
    likeState: { likeData },
    likeDispatch,
  } = useLike();

  const likeVideoHandler = async () => {
    try {
      if (!token) {
        navigate("/login");
      } else {
        console.log("videoin player", video);
        const response = await axios.post(
          "/api/user/likes",
          { video },
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 201) {
          console.log(response);
          likeDispatch({
            type: UPDATE_LIKED_VIDEOS,
            payload: response.data.likes,
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/videos/`);
        if (response.status === 200) {
          const videoData = response.data.videos.find(
            (video) => video._id === videoId
          );
          setVideo(videoData);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchVideos();
  }, [video]);
  return (
    <div className="video-player-container">
      <SideNav />
      <section className="video-plus-notes-container">
        <div className="video-container">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls={true}
            playing={true}
            muted={true}
            className="video-player"
            width="100%"
            height="100%"
          />
          <div className="video-info">
            <h3>KGF</h3>
            <div className="video-impressions">
              <div className="like-views">
                <p>100M views</p>
                <p>1245677 likes</p>
              </div>
              <AiOutlineLike
                className="react-icons"
                onClick={likeVideoHandler}
              />
              <BsBookmarkPlus className="react-icons" />
              <RiPlayListAddLine className="react-icons" />
            </div>
            <div className="channel-details">
              <img
                src=""
                alt="profile"
                className="channel-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="notes-container">
          <h5>Notes</h5>
          <textarea></textarea>
          <button className="btn btn-primary">Add note</button>
        </div>
      </section>
    </div>
  );
};
