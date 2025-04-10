import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
async function getPostsData() {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/articles/posts"
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
const useArticlesQuery = () => {
  const { data } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getPostsData(),
    staleTime: 100000,
    cacheTime: 100000,
  });
  // console.log(data);
  const navigate=useNavigate();
  const status=data?.status;
  if(status==401){
      navigate('/register');
      return ;
      // alert("Authenticate to see Posts");
  }
  return {
    data,
  };
};

export default useArticlesQuery;