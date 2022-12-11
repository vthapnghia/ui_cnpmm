import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../contants/path";
import { useAuth } from "../../until/hook";

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.userAuth) {
    return (
      <>
        <Navigate to={PATH.LOGIN} state={{ from: location }} />;
      </>
    );
  }
  return children;
}

export default PrivateRoute;
