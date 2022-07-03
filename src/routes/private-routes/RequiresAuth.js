import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authentication/auth-context";

export const RequiresAuth = ({ children }) => {
  const {
    authState: { token },
  } = useAuth();
  return (
    <>
      {token || localStorage.getItem("token") ? (
        children
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
};
