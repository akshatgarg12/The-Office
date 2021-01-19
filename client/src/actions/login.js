import { ACTIONS } from "../reducers/auth";
import { REQUEST } from "./http";

export const login = async (dispatch, details) => {
  try {
    dispatch({ type: ACTIONS.LOADING });
    const loginData = await REQUEST({
      path: "/api/login",
      method: "POST",
      data: details,
    });
    dispatch({ type: ACTIONS.LOGIN, payload: loginData });
    return true;
  } catch (e) {
    console.log(e);
    dispatch({
      type: ACTIONS.LOGIN,
      payload: { user: null, error: e.message },
    });
    return false;
  }
};
