import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { usePlaylist } from "../../context/playlist/playlist-context";
import { VideoCard } from "../../components/video-card/VideoCard";
import { REMOVE_FROM_PLAYLISTS } from "../../shared/types";
import { useAuth } from "../../context/authentication/auth-context";
import { toast } from "react-toastify";

export const PlaylistVideo = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const {
    playlistState: { playlists },
    playlistDispatch,
  } = usePlaylist();

  const {
    authState: { token },
  } = useAuth();

  const activePlaylist = playlists.find((item) => item._id === playlistId);

  const deleteVideoFromPlaylistHandler = async (e) => {
    try {
      const response = await axios.delete(
        `/api/user/playlists/${activePlaylist._id}/${e.target.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 200) {
        playlistDispatch({
          type: REMOVE_FROM_PLAYLISTS,
          payload: response.data.playlist,
        });
        toast.info(`removed successfully`);
      }
    } catch (error) {}
  };

  return (
    <div>
      <Fragment key={activePlaylist._id}>
        <h2>{activePlaylist.title}</h2>
        <div>
          {activePlaylist.videos.length ? (
            activePlaylist.videos.map((video) => (
              <div className="playlist-container">
                <VideoCard {...video} />
                <button
                  onClick={deleteVideoFromPlaylistHandler}
                  id={video._id}
                  className="btn btn-float delete-video"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-box">
              <h3>No video in playlists found</h3>
              <button onClick={() => navigate("/")} className="btn btn-primary">
                Explore videos
              </button>
            </div>
          )}
        </div>
      </Fragment>
    </div>
  );
};
