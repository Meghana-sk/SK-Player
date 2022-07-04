import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_LIKED_VIDEOS } from "../../shared/types";
const getLikesHandler = async (token, likeDispatch) => {
  try {
    const response = await axios.get("/api/user/likes/", {
      headers: { authorization: token },
    });
    if (response.status === 200) {
      likeDispatch({ type: UPDATE_LIKED_VIDEOS, payload: response.data.likes });
    } else {
      throw new Error(" Something Went Wrong....Try Again Later");
    }
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
};

export { getLikesHandler };
