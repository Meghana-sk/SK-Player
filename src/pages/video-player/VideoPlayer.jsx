import ReactPlayer from "react-player/lazy";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
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

  const { likeState, likeDispatch } = useLike();

  const isVideoAlreadyLiked = likeState.likes.length
    ? likeState.likes.find((likedVideo) => likedVideo._id === videoId)
    : false;

  const likeVideoHandler = async () => {
    try {
      if (!token) {
        navigate("/login");
      } else {
        if (!isVideoAlreadyLiked) {
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
            likeDispatch({
              type: UPDATE_LIKED_VIDEOS,
              payload: response.data.likes,
            });
            toast.success("Added to liked videos");
          }
        } else {
          const response = await axios.delete(`/api/user/likes/${videoId}`, {
            headers: {
              authorization: token,
            },
          });
          if (response.status === 200) {
            likeDispatch({
              type: UPDATE_LIKED_VIDEOS,
              payload: response.data.likes,
            });
            toast.info("Removed from liked videos");
          }
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
      } catch (error) {}
    };
    fetchVideos();
  }, [videoId]);
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
          />
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <div className="video-impressions">
              <div className="like-views">
                <p>{video.views} views</p>
                <p>{video.uploadedTime}</p>
              </div>
              <AiOutlineLike
                size="1.5em"
                className={`react-icons ${
                  isVideoAlreadyLiked ? "liked-watchlater-active" : null
                } `}
                onClick={likeVideoHandler}
              />
              <BsBookmarkPlus className="react-icons" size="1.5em" />
              <RiPlayListAddLine className="react-icons" size="1.5em" />
            </div>
            <div className="channel-details">
              <img
                src={video.channelProfile}
                alt="profile"
                className="channel-img"
                loading="lazy"
              />
              <p>{video.channel}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
