import { useEffect, useState } from "react";
// import { useUserQuery } from "../hooks";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonPost from "../components/SkeletonPost";


const Posts = () => {
  const [posts,setPosts]=useState([]);
  const fetchPosts=async()=>{
      try{
        const {data}=await axios.get('https://backend-blog-28ea.onrender.com/api/articles/myposts');
        console.log(data);
        setPosts(data)
      }
      catch(err){
        console.log(err)
      }
  }
  useEffect(()=>{
    fetchPosts();
  },[]);
  const formatDate = (createdAt) => {

    const created = new Date(createdAt);

    const now = new Date();

    const time = now - created;
    const secs = Math.floor(time / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years >= 1) {
      return `${years} year`;
    }
    if (months >= 1) {
      return `${months} mon`;
    }
    if (days >= 1) {
      return `${days} day`;
    }
    if (hours >= 1) {
      return `${hours} hour`;
    }
    if (mins >= 1) {
      return `${months} min`;
    }
    return `${secs} sec`;
  }
  // const handleDelete = async (item) => {
  //   const response = await axios.post(
  //     "https://backend-blog-28ea.onrender.com/api/articles/deletepost",
  //     { data: item }
  //   );
  //   // console.log(response);
  // };
  
  
  
  
  // useEffect(()=>{
  // })NewPostsDataIncluded
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="sm:text-xl md:text-2xl font-semibold text-green-600 mb-6">📚 My Posts</h2>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonPost key={i} />
              ))}
            </div>
          ) : (
            Array.isArray(posts) && posts?.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
              >
                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://ui-avatars.com/api/?name=Author&background=green&color=fff"
                      alt="Author"
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <Link to={`/user/${item?.author?._id}`}><p className="font-bold text-2xl">{item?.author?.name}</p></Link>
                      <p>Ex Software Developer @Auro.Edu</p>
                      <p>{formatDate(item.createdAt)}</p>
                    </div>
                  </div>
                  {/* {
                    following?.some((cur) => cur?.following_id === item?.author?._id) ? (<p><button className="hover:bg-green-200 p-1.5 hover:rounded-sm" onClick={() => handleUnFollow(item)}>Following</button></p>) : (<p><button className="hover:bg-green-200 p-1.5 hover:rounded-sm" onClick={() => handleFollow(item)}>Follow</button></p>)
                  } */}
                </div>

                <Link
                  to={`/article/${item.slug}`}
                  state={{ item }}
                  className="hover:underline"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-2 line-clamp-2">{item.body}</p>
                <div className="flex gap-3 pt-3">
                  <p>{item?.likes?.length} Likes</p>
                  <p>{item?.comments?.length} Comments</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Posts;
