import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const user = useSelector((store) => store.user);
  return user?.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedPage;
