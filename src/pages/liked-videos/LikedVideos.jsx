import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authentication/auth-context";
import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useLike } from "../../context/like-video/like-video-context";
import { UPDATE_LIKED_VIDEOS } from "../../shared/types";
import "./likedVideo.css";

export const LikedVideos = (videoId) => {
  const { likeState, likeDispatch } = useLike();
  const {
    authState: { token },
  } = useAuth();
  const removeFromLike = async (videoId) => {
    try {
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
    } catch (error) {
      toast.error("Something went wrong. Try again");
    }
  };
  return (
    <>
      <SideNav />
      <div className="like-page-container">
        <h1 className="text-center">Liked videos</h1>
        {likeState.likes.length ? (
          likeState.likes.map((video) => (
            <div key={video} className="like-content">
              <VideoCard {...video} key={video._id} />
              <button
                className="btn btn-float delete-video"
                onClick={() => removeFromLike(video._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center empty-text">No Liked videos</p>
        )}
      </div>
    </>
  );
};
