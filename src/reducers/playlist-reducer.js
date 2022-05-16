import { UPDATE_PLAYLISTS } from "../shared/types";
const playlistReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_FROM_PLAYLISTS":
      return {
        playlists: state.playlists.map((item) =>
          item.title === action.payload.title ? action.payload : item
        ),
      };
    case "ADD_TO_PLAYLISTS":
      return {
        playlists: state.playlists.map((item) =>
          item.title === action.payload.title ? action.payload : item
        ),
      };
    case UPDATE_PLAYLISTS:
      return { playlists: action.payload };
    case "RESET":
      return { playlists: [] };
    default:
      return state;
  }
};

export { playlistReducer };
