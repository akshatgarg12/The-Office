import { createContext, useReducer } from "react";
import { AuthReducer } from "../reducers/auth";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
    loading: false,
  });
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
