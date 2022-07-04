import {
  UPDATE_PLAYLISTS,
  ADD_TO_PLAYLISTS,
  CLEAR_PLAYLISTS,
  REMOVE_FROM_PLAYLISTS,
} from "../shared/types";
const playlistReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_FROM_PLAYLISTS:
      return {
        ...state,
        playlists: state.playlists.map((item) =>
          item.title === action.payload.title ? action.payload : item
        ),
      };
    case ADD_TO_PLAYLISTS:
      return {
        ...state,
        playlists: state.playlists.map((item) =>
          item.title === action.payload.title ? action.payload : item
        ),
      };
    case UPDATE_PLAYLISTS:
      return { ...state, playlists: action.payload };
    case CLEAR_PLAYLISTS:
      return { ...state, playlists: [] };
    default:
      return state;
  }
};

export { playlistReducer };
