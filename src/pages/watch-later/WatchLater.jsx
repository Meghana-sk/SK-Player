import axios from "axios";
import { toast } from "react-toastify";
import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useAuth } from "../../context/authentication/auth-context";
import { useWatchLater } from "../../context/watch-later/watch-later-context";
import { UPDATE_WATCH_LATER_VIDEOS } from "../../shared/types";
import "./watchlater.css";

export const WatchLater = () => {
  const { watchLaterState, watchLaterDispatch } = useWatchLater();
  const {
    authState: { token },
  } = useAuth();
  const removeFromWatchLater = async (videoId) => {
    const response = await axios.delete(`/api/user/watchlater/${videoId}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      watchLaterDispatch({
        type: UPDATE_WATCH_LATER_VIDEOS,
        payload: response.data.watchlater,
      });
      toast.info("Removed from watch later videos");
    }
  };
  return (
    <>
      <SideNav />
      <div className="like-page-container">
        <h1 className="text-center">Watch later videos</h1>
        {watchLaterState.watchlater.length ? (
          watchLaterState.watchlater.map((video) => (
            <div key={video} className="watchlater-content">
              <VideoCard {...video} key={video._id} />
              <button
                className="btn btn-float delete-video"
                onClick={() => removeFromWatchLater(video._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center empty-text">No videos to watch</p>
        )}
      </div>
    </>
  );
};
