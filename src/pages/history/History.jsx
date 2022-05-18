import "./history.css";
import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useAuth } from "../../context/authentication/auth-context";
import { useHistory } from "../../context/history/history-context";
import {
  deleteVideoFromHistory,
  deleteAllVideoFromHistory,
} from "../../services/history/history.service";

export const History = () => {
  const { historyState, historyDispatch } = useHistory();
  const {
    authState: { token },
  } = useAuth();
  return (
    <>
      <SideNav />
      <div className="like-page-container">
        <h1 className="text-center">History</h1>
        <button
          className="btn btn-primary-outline"
          onClick={() =>
            deleteAllVideoFromHistory(historyState, token, historyDispatch)
          }
        >
          Clear history
        </button>
        {historyState.history.length ? (
          historyState.history.map((video) => (
            <div key={video} className="history-content">
              <VideoCard {...video} />
              <button
                className="btn btn-float delete-video"
                onClick={() =>
                  deleteVideoFromHistory(video._id, token, historyDispatch)
                }
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center empty-text">No videos in history</p>
        )}
      </div>
    </>
  );
};
