import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_WATCH_LATER_VIDEOS } from "../../shared/types";

const getVideosInWatchLater = async (token, watchLaterDispatch) => {
  try {
    const response = await axios.get("/api/user/watchlater", {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      watchLaterDispatch({
        type: UPDATE_WATCH_LATER_VIDEOS,
        payload: response.data.watchlater,
      });
    } else {
      throw new Error(" Something Went Wrong..Try Again Later");
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getVideosInWatchLater };
