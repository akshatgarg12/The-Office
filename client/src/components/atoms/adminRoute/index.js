import { Route, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContextProvider";

const AdminRoute = ({ path, component }) => {
  const router = useHistory();
  const { state } = useContext(UserContext);
  console.log(state);
  const { user, error } = state;
  if (!user || error) {
    router.replace("/login");
    return null;
  }
  if (!user.isAdmin) {
    alert("You cannot access admin routes!");
    router.replace("/dashboard");
    return null;
  }
  return <Route path={path} component={component} />;
};

export default AdminRoute;
