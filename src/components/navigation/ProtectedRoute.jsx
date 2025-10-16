import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, loading }) => {
  const { user } = useSelector((state) => state.user);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-opacity-75"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
