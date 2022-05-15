import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useLike } from "../../context/like-video/like-video-context";
import "./likedVideo.css";

export const LikedVideos = () => {
  const { likeState } = useLike();
  return (
    <>
      <SideNav />
      <div className="like-page-container">
        <h1 className="text-center">Liked videos</h1>
        {likeState.likes.length ? (
          likeState.likes.map((video) => <VideoCard {...video} />)
        ) : (
          <p className="text-center empty-text">No Liked videos</p>
        )}
      </div>
    </>
  );
};
