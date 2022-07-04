import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_HISTORY, CLEAR_HISTORY } from "../../shared/types";

const addVideoToHistory = async (token, video, historyDispatch) => {
  try {
    if (token) {
      const response = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response.status === 201) {
        historyDispatch({
          type: UPDATE_HISTORY,
          payload: response.data.history,
        });
      }
    }
  } catch (error) {}
};

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
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
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
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { addVideoToHistory, deleteVideoFromHistory, deleteAllVideoFromHistory };
