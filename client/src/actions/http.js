import axios from 'axios'
import {URL} from '../constants'
export const REQUEST = async ({path, data, method}) => {
  try{
    const response = await axios(`${URL.use + path}`,{
      method,
      data,
      headers:{
          'Content-Type':'application/json',
      },
      withCredentials:true,
      // baseURL:URL.use,
    });
    return response.data
  }
  catch(e){
    console.log(e);
    console.log(e.response);
    throw new Error(e.response.data);
  }
}
