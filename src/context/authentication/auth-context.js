import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../../reducers/auth-reducer";

const AuthContext = createContext(null);

const defaultState = {
  user: "",
  token: "",
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, defaultState);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
