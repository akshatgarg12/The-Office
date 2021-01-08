// import axios from 'axios';
export const ACTIONS = {
  LOGIN:"login",
  LOGOUT:"logout",
  LOADING:"loading"
}


export const AuthReducer = (state, action) => {
    switch(action.type){
      case ACTIONS.LOGIN:
        return {...action.payload, loading:false}
      case ACTIONS.LOGOUT:
        return {user:null,error:null,loading:false};
      case ACTIONS.LOADING:
        return {user:null,error:null,loading:true};
      default:
        return state;
    }
}
