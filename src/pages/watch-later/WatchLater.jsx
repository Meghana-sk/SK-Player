import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useWatchLater } from "../../context/watch-later/watch-later-context";

export const WatchLater = () => {
  const { watchLaterState } = useWatchLater();
  return (
    <>
      <SideNav />
      <div className="like-page-container">
        <h1 className="text-center">Watch later videos</h1>
        {watchLaterState.watchlater.length ? (
          watchLaterState.watchlater.map((video) => <VideoCard {...video} />)
        ) : (
          <p className="text-center empty-text">No videos to watch</p>
        )}
      </div>
    </>
  );
};
