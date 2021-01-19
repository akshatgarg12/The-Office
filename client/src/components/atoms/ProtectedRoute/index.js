import { Route, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContextProvider";

const ProtectedRoute = ({ path, component }) => {
  const router = useHistory();
  const { state } = useContext(UserContext);
  if (!state.user || state.error) {
    router.replace("/login");
    return null;
  }
  return <Route path={path} component={component} />;
};

export default ProtectedRoute;
