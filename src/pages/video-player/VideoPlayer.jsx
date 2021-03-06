import ReactPlayer from "react-player/lazy";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsBookmarkPlus, BsFillBookmarkFill } from "react-icons/bs";
import { RiPlayListAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { SideNav } from "../../components/side-nav/SideNav";
import { PlaylistModal } from "../../components/playlist-modal/PlaylistModal";
import "./videoplayer.css";
import { useAuth } from "../../context/authentication/auth-context";
import { useLike } from "../../context/like-video/like-video-context";
import {
  UPDATE_LIKED_VIDEOS,
  UPDATE_WATCH_LATER_VIDEOS,
} from "../../shared/types";
import { useWatchLater } from "../../context/watch-later/watch-later-context";
import { useHistory } from "../../context/history/history-context";
import { addVideoToHistory } from "../../services/history/history.service";

export const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const {
    authState: { token },
  } = useAuth();
  const navigate = useNavigate();

  const { likeState, likeDispatch } = useLike();
  const { watchLaterState, watchLaterDispatch } = useWatchLater();
  const { historyState, historyDispatch } = useHistory();

  const isVideoAlreadyLiked = likeState.likes.length
    ? likeState.likes.find((likedVideo) => likedVideo._id === videoId)
    : false;

  const isVideoAlreadyInWatchLater = watchLaterState.watchlater.length
    ? watchLaterState.watchlater.find(
        (watchLaterVideo) => watchLaterVideo._id === videoId
      )
    : false;

  const videoAlreadyInHistory = historyState.history.length
    ? historyState.history.find((historyVideo) => historyVideo._id === videoId)
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
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };
  const watchVideoLaterHandler = async () => {
    try {
      if (!token) {
        navigate("/login");
      } else {
        if (!isVideoAlreadyInWatchLater) {
          const response = await axios.post(
            "/api/user/watchlater",
            { video },
            {
              headers: {
                authorization: token,
              },
            }
          );
          if (response.status === 201) {
            watchLaterDispatch({
              type: UPDATE_WATCH_LATER_VIDEOS,
              payload: response.data.watchlater,
            });
            toast.success("Added to watch later videos");
          }
        } else {
          const response = await axios.delete(
            `/api/user/watchlater/${videoId}`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          if (response.status === 200) {
            watchLaterDispatch({
              type: UPDATE_WATCH_LATER_VIDEOS,
              payload: response.data.watchlater,
            });
            toast.info("Removed from watch later videos");
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
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
        toast.error(error.response.data.errors[0]);
      }
    };
    fetchVideos();
  }, [videoId]);

  return (
    <div className="video-player-container">
      <SideNav />
      <section className="video-plus-notes-container">
        <div className="video-container">
          <div className="react-player-container">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls={true}
              playing={true}
              muted={true}
              width="100%"
              height="100%"
              onStart={() =>
                !videoAlreadyInHistory
                  ? addVideoToHistory(token, video, historyDispatch)
                  : {}
              }
              className="video-player"
            />
          </div>
          <div className="video-info">
            <h3 className="video-title">{video.title}</h3>
            <div className="video-impressions">
              <div className="like-views">
                <p>{video.views} views</p>
                <p>{video.uploadedTime}</p>
              </div>
              {token ? (
                !isVideoAlreadyLiked ? (
                  <AiOutlineLike
                    size="1.5em"
                    className="react-icons"
                    onClick={likeVideoHandler}
                  />
                ) : (
                  <AiFillLike
                    size="1.5em"
                    onClick={likeVideoHandler}
                    className="react-icons"
                  />
                )
              ) : (
                <AiOutlineLike
                  size="1.5em"
                  onClick={likeVideoHandler}
                  className="react-icons"
                />
              )}
              {token ? (
                !isVideoAlreadyInWatchLater ? (
                  <BsBookmarkPlus
                    className="react-icons"
                    onClick={watchVideoLaterHandler}
                    size="1.5em"
                  />
                ) : (
                  <BsFillBookmarkFill
                    className="react-icons"
                    onClick={watchVideoLaterHandler}
                    size="1.5em"
                  />
                )
              ) : (
                <BsBookmarkPlus
                  className="react-icons"
                  onClick={watchVideoLaterHandler}
                  size="1.5em"
                />
              )}
              <RiPlayListAddLine
                className="react-icons"
                size="1.5em"
                onClick={() => {
                  token ? setModalOpen(true) : navigate("/login");
                }}
              />
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
        {modalOpen && (
          <PlaylistModal setModalOpen={setModalOpen} video={video} />
        )}
      </section>
    </div>
  );
};
