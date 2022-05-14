import { UPDATE_LIKED_VIDEOS, CLEAR_LIKED_VIDEOS } from "../shared/types";

const likeReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LIKED_VIDEOS:
      return {
        ...state,
        likes: action.payload,
      };
    case CLEAR_LIKED_VIDEOS:
      return {
        ...state,
        likes: [],
      };
    default:
      return state;
  }
};

export { likeReducer };
