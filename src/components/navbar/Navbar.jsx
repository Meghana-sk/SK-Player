import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authentication/auth-context";
import { useWatchLater } from "../../context/watch-later/watch-later-context";
import { useLike } from "../../context/like-video/like-video-context";
import { usePlaylist } from "../../context/playlist/playlist-context";
import { useHistory } from "../../context/history/history-context";
import {
  LOGOUT,
  CLEAR_HISTORY,
  CLEAR_LIKED_VIDEOS,
  CLEAR_WATCH_LATER_VIDEOS,
  CLEAR_PLAYLISTS,
} from "../../shared/types";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const { watchLaterDispatch } = useWatchLater();
  const { likeDispatch } = useLike();
  const { historyDispatch } = useHistory();
  const { playlistDispatch } = usePlaylist();
  const userObj = authState?.user || JSON.parse(localStorage.getItem("user"));
  const isUser = authState.token || authState.user || userObj ? true : false;

  const logoutHandler = () => {
    if (authState.token) {
      toast.info("Log out successful");
      navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      authDispatch({ type: LOGOUT });
      historyDispatch({ type: CLEAR_HISTORY });
      likeDispatch({ type: CLEAR_LIKED_VIDEOS });
      watchLaterDispatch({ type: CLEAR_WATCH_LATER_VIDEOS });
      playlistDispatch({ type: CLEAR_PLAYLISTS });
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="nav bg-dark">
      <Link to="/" className="brand-name text-l fw-900">
        SK Player
      </Link>
      <div className="user-section">
        {isUser && (
          <span className="user-name">
            {authState.token ? `Hi, ${userObj?.firstName}` : null}
          </span>
        )}
        <button
          className="btn btn-primary login-btn"
          onClick={() => logoutHandler()}
        >
          <i className="fas fa-user"></i>
          {isUser ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};
