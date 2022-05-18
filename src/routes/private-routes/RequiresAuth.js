import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authentication/auth-context";

export const RequiresAuth = ({ children }) => {
  const {
    authState: { token },
  } = useAuth();
  return <>{token ? children : <Navigate to={"/login"} replace={true} />}</>;
};
