import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_HISTORY, CLEAR_HISTORY } from "../../shared/types";

const deleteVideoFromHistory = async (videoId, token, historyDispatch) => {
  try {
    const response = await axios.delete(`api/user/history/${videoId}`, {
      headers: {
        authorization: token,
      },
    });
    historyDispatch({
      type: UPDATE_HISTORY,
      payload: response.data.history,
    });
  } catch (error) {}
};

const deleteAllVideoFromHistory = async (
  historyState,
  token,
  historyDispatch
) => {
  try {
    if (historyState.history.length) {
      const response = await axios.delete(`api/user/history/all`, {
        headers: {
          authorization: token,
        },
      });
      historyDispatch({
        type: CLEAR_HISTORY,
        payload: response.data.history,
      });
      toast.info("History is cleared");
    }
  } catch (error) {}
};

export { deleteVideoFromHistory, deleteAllVideoFromHistory };
