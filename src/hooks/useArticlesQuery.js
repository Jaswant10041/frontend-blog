import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
async function getPostsData(){
    try{
        const response=await axios.get('http://localhost:3001/api/articles/posts');
        console.log(response);
        return response;
    }
    catch(err){
        console.log(err);
    }
}
const useArticlesQuery = () => {
    
    const {data}=useQuery({
        queryKey:['getPosts'],
        queryFn:()=>getPostsData(),
        staleTime:100000,
        cacheTime:100000
    });
    
  return {
    data
  }
}

export default useArticlesQuery