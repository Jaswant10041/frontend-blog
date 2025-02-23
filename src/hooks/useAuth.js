import React from 'react';
import { proxy,useSnapshot } from 'valtio';

import axios from 'axios';
function getAuthUser(){
  const jwt=window.localStorage.getItem('jwt');
  
  if(!jwt){
    return {};
  }
  const decodedJwt=atob(jwt);
  const parsedData= JSON.parse(decodedJwt);
  console.log('localStorage Data',parsedData);
  axios.defaults.headers.common['Authorization']='Token '+parsedData.accessToken;
  return parsedData;
}
function getisAuth(){
  const isAuth=window.localStorage.getItem('jwt');
  if(!isAuth){
    return false;
  }
  return true;
}

const actions={
    login:({user})=>{
        state.authUser=user;
        state.isAuth=true;
        window.localStorage.setItem('jwt',btoa(JSON.stringify(user)));
        axios.defaults.headers.common['Authorization']='Token '+user.accessToken;
        window.localStorage.setItem('isAuth',true);
    },
    logout:()=>{
      state.authUser="";
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('isAuth');
      state.isAuth=false;
      // axios.default.headers.common['Authorization']='';
      delete axios.defaults.headers.common['Authorization'];
      console.log("Logout");
    }
}
const state=proxy({
  authUser:getAuthUser(),
  isAuth:getisAuth(),
})

const useAuth = () => {
  const snap=useSnapshot(state);
  console.log(snap);
  return {
    ...actions,
    ...state
  };
}

export default useAuth