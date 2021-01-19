import axios from "axios";
import { ACTIONS } from "../reducers/auth";

export const logout = async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.LOADING });
    await axios.post("/api/logout");
    dispatch({ type: ACTIONS.LOGOUT });
    return true;
  } catch (e) {
    console.log(e);
    dispatch({
      type: ACTIONS.LOGOUT,
      payload: { user: null, error: e.response.data },
    });
    return false;
  }
};
