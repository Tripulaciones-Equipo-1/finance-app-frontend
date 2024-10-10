import { Navigate } from "react-router-dom";

const AuthZone = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default AuthZone;
