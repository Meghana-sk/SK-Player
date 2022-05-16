import axios from "axios";
import { UPDATE_PLAYLISTS } from "../../shared/types";

const createPlaylist = async ({ requestBody, token, playlistDispatch }) => {
  try {
    const response = await axios.post("/api/user/playlists", requestBody, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 201) {
      playlistDispatch({
        type: UPDATE_PLAYLISTS,
        payload: response.data.playlists,
      });
    }
    console.log("--", response);
  } catch (error) {}
};

export { createPlaylist };
