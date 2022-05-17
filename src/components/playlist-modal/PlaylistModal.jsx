import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { createPlaylist } from "../../services/playlist/createPlaylist.service";
import { usePlaylist } from "../../context/playlist/playlist-context";
import "./playlist-modal.css";
import { useAuth } from "../../context/authentication/auth-context";

export const PlaylistModal = ({ setModalOpen }) => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const { playlistDispatch } = usePlaylist();
  const { authState } = useAuth();
  const { token } = authState;
  const createNewPlaylist = () => {
    setPlaylists(() => {
      if (
        playlists.filter((e) => e.title === playlistName).length === 0 &&
        playlistName.length > 0
      ) {
        return playlists.concat({ title: playlistName });
      } else {
        return playlists;
      }
    });
    const requestBody = {
      playlist: {
        title: playlistName,
        description: `Playlist name ${playlistName}`,
      },
    };
    createPlaylist({ requestBody, token, playlistDispatch });
  };
  const playlistNameHandler = (e) => {
    setPlaylistName(() => e.target.value);
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
                <input type="checkbox" id="playlist-checkbox" />
                <label htmlFor="playlist-checkbox">{el.title}</label>
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
