import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./playlist.css";
import { useAuth } from "../../context/authentication/auth-context";
import { SideNav } from "../../components/side-nav/SideNav";
import { usePlaylist } from "../../context/playlist/playlist-context";
import { UPDATE_PLAYLISTS } from "../../shared/types";
export const Playlist = () => {
  const navigate = useNavigate();
  const { playlistState, playlistDispatch } = usePlaylist();
  const {
    authState: { token },
  } = useAuth();
  const deletePlaylistHandler = async (e) => {
    try {
      const response = await axios.delete(
        `/api/user/playlists/${e.target.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        playlistDispatch({
          type: UPDATE_PLAYLISTS,
          payload: response.data.playlists,
        });
      }
      toast.info(`${e.target.title} deleted successfully`);
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };
  return (
    <div>
      <SideNav />
      <h2>Playlist name</h2>
      {playlistState.playlists.length > 0 ? (
        playlistState.playlists.map((list) => (
          <div key={list._id} className="playlist-container">
            <div onClick={() => navigate(`/playlist/${list._id}`)}>
              <div className="playlist text-left">{list.title}</div>
            </div>
            <button
              onClick={deletePlaylistHandler}
              id={list._id}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="empty-box">
          <h3>No playlists found</h3>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Explore videos
          </button>
        </div>
      )}
    </div>
  );
};
