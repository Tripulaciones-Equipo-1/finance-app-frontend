import { Navigate } from "react-router-dom";

const AuthZone = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default AuthZone;
