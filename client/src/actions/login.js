import axios from 'axios'
import {ACTIONS} from '../reducers/auth';

export const login = async (dispatch, details) => {
    try{
      dispatch({type:ACTIONS.LOADING})
      const loginData = await axios('/api/login',{
        method:"POST",
        data:details,
        headers:{
          'Content-type':'application/json'
        }
       })
       dispatch({type:ACTIONS.LOGIN, payload:loginData.data});
       return true;
    }catch(e){
      console.log(e);
      dispatch({type:ACTIONS.LOGIN, payload:{user:null, error:e.response.data}});
      return false;
    }
}

