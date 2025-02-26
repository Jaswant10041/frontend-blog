import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
const getCurrentUser = async () => {
  try {
    const response = await axios.get("https://blogging-backend-1-e161.onrender.com/api/users/user");
    const { data } = response;
    // console.log(axios.defaults.headers.common['Authorization']);
    console.log("user Data extracted through tanQuery", data);
    return data;
  } catch (err) {
      return err;
  }
};
const useUserQuery = () => {
  const {
    data: userData,
    error: isErrorInUserData,
    isLoading: isUserDataLoading,
    isStale,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0,
  });
  return { userData, isUserDataLoading, isErrorInUserData };
};

export default useUserQuery;
