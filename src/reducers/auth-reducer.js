import { LOGIN, LOGOUT, SIGNUP } from "../shared/types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export { authReducer };
