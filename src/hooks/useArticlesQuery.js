import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
// console.log(useAuth);
import useStore from "./useStore";
import { cacheService } from "./useCacheService";
import { INITIAL_POSTS } from "../data/initialPosts";

async function getPostsData() {
  try {
    const response = await axios.get(
      "https://backend-blog-28ea.onrender.com/api/articles/posts",{
        params:{
          page:2,
          limit:5,
        }
      }
    );
    console.log(response);
    // Cache the successful response
    if (response.data && Array.isArray(response.data.posts)) {
      cacheService.savePosts(response.data.posts);
    }
    return response;
  } catch (err) {
    console.log(err);
    // If request fails, try to return cached data
    const cachedPosts = cacheService.getCachedPosts();
    if (cachedPosts) {
      return { data: { posts: cachedPosts }, status: 200 };
    }
    return err;
  }
}
const useArticlesQuery = () => {
  const setPosts=useStore((state)=>state.setPosts);
  const { data } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getPostsData(),
    staleTime: 100000,
    cacheTime: 100000,
  });
  console.log("refetched");
  // console.log(data);

  const navigate=useNavigate();
  const status=data?.status;
  if(status==401){
      navigate('/register');
      return ;
      // alert("Authenticate to see Posts");
  }
  
  // Set cached posts immediately if available, fallback to initial posts
  if (!data?.data && cacheService.isCacheValid()) {
    const cachedPosts = cacheService.getCachedPosts();
    if (cachedPosts && cachedPosts.length > 0) {
      setPosts(cachedPosts);
    }
  } else if (!data?.data) {
    // Fallback to initial posts on first visit
    setPosts(INITIAL_POSTS);
  } else {
    console.log(data?.data);
    setPosts(data?.data);
  }
  
  return {
    data,
  };
};

export default useArticlesQuery;