import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();

  // No need to check loading state here as it's handled in AuthContext
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
