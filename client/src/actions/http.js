import axios from "axios";
import { URL } from "../constants";
export const REQUEST = async ({ path, data, method, setLoading }) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axios(`${URL.use + path}`, {
      method,
      data,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response);
    throw new Error(e.response.data);
  } finally {
    if (setLoading) setLoading(false);
  }
};
