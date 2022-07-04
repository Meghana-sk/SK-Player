import {
  UPDATE_WATCH_LATER_VIDEOS,
  CLEAR_WATCH_LATER_VIDEOS,
} from "../shared/types";

const watchLaterReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_WATCH_LATER_VIDEOS:
      return {
        ...state,
        watchlater: action.payload,
      };
    case CLEAR_WATCH_LATER_VIDEOS:
      return { ...state, watchlater: [] };
    default:
      return state;
  }
};

export { watchLaterReducer };
