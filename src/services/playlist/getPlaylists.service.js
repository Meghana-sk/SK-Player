import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_PLAYLISTS } from "../../shared/types";

const getVideosInPlaylists = async (token, playlistDispatch) => {
  try {
    const response = await axios.get("/api/user/playlists", {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      playlistDispatch({
        type: UPDATE_PLAYLISTS,
        payload: response.data.playlists,
      });
    } else {
      throw new Error(" Something Went Wrong..Try Again Later");
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getVideosInPlaylists };
