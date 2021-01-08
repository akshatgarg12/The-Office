// import axios from 'axios';
export const ACTIONS = {
  LOGIN:"login",
  LOGOUT:"logout",
  LOADING:"loading",
  CURRENT_USER:"current_user"
}


export const AuthReducer = (state, action) => {
    switch(action.type){
      case ACTIONS.LOGIN:
        localStorage.setItem('user', action.payload);
        return {...action.payload, loading:false}
      case ACTIONS.LOGOUT:
        localStorage.removeItem('user');
        return {user:null,error:null,loading:false};
      case ACTIONS.LOADING:
        return {user:null,error:null,loading:true};
      case ACTIONS.CURRENT_USER:
        const userData = localStorage.getItem('user');
        return {user:userData,error:null,loading:true}  
      default:
        return state;
    }
}
