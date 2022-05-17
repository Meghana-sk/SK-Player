import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { createPlaylist } from "../../services/playlist/createPlaylist.service";
import { usePlaylist } from "../../context/playlist/playlist-context";
import "./playlist-modal.css";
import { useAuth } from "../../context/authentication/auth-context";
import { ADD_TO_PLAYLISTS } from "../../shared/types";

export const PlaylistModal = ({ video, setModalOpen }) => {
  const [playlistName, setPlaylistName] = useState("");
  const {
    playlistState: { playlists },
    playlistDispatch,
  } = usePlaylist();
  const { authState } = useAuth();
  const { token } = authState;
  const createNewPlaylist = () => {
    // setPlaylists(() => {
    if (
      playlists.filter((e) => e.title === playlistName).length === 0 &&
      playlistName.length > 0
    ) {
      //   return playlists.concat({ title: playlistName });
      // } else {
      //   return playlists;
      const requestBody = {
        playlist: {
          title: playlistName,
          description: `Playlist name ${playlistName}`,
        },
      };
      createPlaylist({ requestBody, token, playlistDispatch });
    }
    // }
    // );
  };
  const playlistNameHandler = (e) => {
    setPlaylistName(() => e.target.value);
  };

  const playlistCheckBoxHandler = async (e) => {
    console.log("playlist id", e.target.id, { video });
    try {
      if (e.target.checked) {
        console.log("in playlist add");
        const response = await axios.post(
          `/api/user/playlists/${e.target.id}`,
          { video },
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 201) {
          playlistDispatch({
            type: ADD_TO_PLAYLISTS,
            payload: response.data.playlist,
          });
          toast.success(`${video.title.slice(0, 15)}... added successfully`);
        }
      } else {
        const response = await axios.delete(
          `/api/user/playlists/${e.target.id}/${video._id}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          toast.info(`${video.title.slice(0, 15)}... removed successfully`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const IsVideoInCurrentPlaylist = (playlists, videoId, playlistId) => {
    const findPlaylist = playlists.find((item) => item._id === playlistId);
    if (findPlaylist) {
      return findPlaylist.videos.findIndex((item) => item._id === videoId) ===
        -1
        ? false
        : true;
    } else {
      return false;
    }
  };

  return (
    <article className="playlist-modal">
      <header className="heading">
        <h3>Save to</h3>
        <button onClick={() => setModalOpen(false)}>
          <AiOutlineClose />
        </button>
      </header>
      <div className="divider"></div>
      <section className="modal-body">
        {playlists.length > 0
          ? playlists.map((el) => (
              <div>
                <input
                  type="checkbox"
                  id={el._id}
                  onChange={playlistCheckBoxHandler}
                  checked={IsVideoInCurrentPlaylist(
                    playlists,
                    video._id,
                    el._id
                  )}
                />
                <label htmlFor={el._id}>{el.title}</label>
              </div>
            ))
          : null}
      </section>
      <div className="divider"></div>
      <footer className="playlist-footer">
        <input
          placeholder="playlist-name"
          onChange={playlistNameHandler}
          className="input-text"
          type="text"
        />
        <div className="create-playlist-wrapper" onClick={createNewPlaylist}>
          <AiOutlinePlus />
          Create playlist
        </div>
      </footer>
    </article>
  );
};
