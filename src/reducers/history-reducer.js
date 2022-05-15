import { UPDATE_HISTORY, CLEAR_HISTORY } from "../shared/types";

const historyReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_HISTORY:
      return { ...state, history: action.payload };
    case CLEAR_HISTORY:
      return { ...state, history: [] };
    default:
      return state;
  }
};

export { historyReducer };
