import { Navigate } from "react-router-dom";

const AdminZone = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  return token && user && user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminZone;
