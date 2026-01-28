// import React from 'react';
import { proxy,useSnapshot } from 'valtio';
import axios from 'axios';

function getInitialAuthUser(){
  const jwt=window.localStorage.getItem('jwt');
  if(!jwt){
    return {};
  }
  try {
    const decodedJwt=atob(jwt);
    const parsedData= JSON.parse(decodedJwt);
    if(parsedData?.accessToken) {
      axios.defaults.headers.common['Authorization']='Token '+parsedData.accessToken;
    }
    return parsedData;
  } catch(e) {
    return {};
  }
}

async function verifyAuthUser(parsedData){
  try{
    const response=await axios.get('https://backend-blog-28ea.onrender.com/api/users/isauthenticated');
    return parsedData;
  }
  catch(err){
    const {status}=err?.response;
    if(status===401){
      actions.logout();
      return {};
    }
  }
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
    login:(user)=>{
        axios.defaults.withCredentials=true;
        state.authUser=user;
        state.isAuth=true;
        window.localStorage.setItem('jwt',btoa(JSON.stringify(user)));
        axios.defaults.headers.common['Authorization']='Token '+user.accessToken;
        window.localStorage.setItem('isAuth',true);
    },
    logout:()=>{
      state.authUser={};
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('isAuth');
      state.isAuth=false;
      delete axios.defaults.headers.common['Authorization'];
      console.log("Logged out");
    },
    initAuth: async () => {
      const initialAuthUser = getInitialAuthUser();
      state.authUser = initialAuthUser;
      if(Object.keys(initialAuthUser).length > 0) {
        const verified = await verifyAuthUser(initialAuthUser);
        state.authUser = verified;
        state.isAuth = Object.keys(verified).length > 0;
      }
    }
}

const state=proxy({
  authUser: getInitialAuthUser(),
  isAuth: getisAuth(),
})

// Initialize auth on first load

actions.initAuth();


const useAuth = () => {
  return {
    ...actions,
    ...state
  };
}

export default useAuth