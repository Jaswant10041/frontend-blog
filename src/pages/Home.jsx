import { useEffect, useState } from "react";
// import { useUserQuery } from "../hooks";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import useStore from "../hooks/useStore";


const Home = () => {
  const { isAuth, authUser, filteredPostsData } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();
  // console.log(isAuth);
  // const ArticlesData = useArticlesQuery();

  // const obj=snapshot(proxy(filteredPostsData));
  // console.log(obj);
  // console.log([...ArticlesData])
  // const Articles = ArticlesData?.data?.data;
  // console.log(Articles);
  const filteredPosts = useStore((state) => state.filteredPosts);
  console.log(filteredPosts)
  const [expandedArticle, setExpandedArticle] = useState(null);
  // console.log(Articles);
  const fetchFollowersAndFollowing = async () => {
    const followers = await axios.get('http://localhost:3000/api/users/followers');
    // console.log(followers);
    const following = await axios.get('http://localhost:3000/api/users/following');
    // console.log(following);
    setFollowing(following?.data);
  }
  useEffect(() => {
    if (isAuth) {
      // console.log(authUser);
      fetchFollowersAndFollowing()
    }
  }, [isAuth]);
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
      return `${years}y`;
    }
    if (months >= 1) {
      return `${months}m`;
    }
    if (days >= 1) {
      return `${days}d`;
    }
    if (hours >= 1) {
      return `${hours}h`;
    }
    if (mins >= 1) {
      return `${months}min`;
    }
    return `${secs}sec`;
  }
  const handleDelete = async (item) => {
    const response = await axios.post(
      "http://localhost:3000/api/articles/deletepost",
      { data: item }
    );
    // console.log(response);
  };
  const handleFollow = async (item) => {
    if (!isAuth) {
      navigate('/login')
      return;
    }
    console.log(item.author._id);
    console.log(following);
    const response = await axios.post('http://localhost:3000/api/users/follow', { to_follow_id: item?.author?._id });
    // console.log(response);
    const updatedFollowing=[...following,{following_id:item.author._id}];
    console.log(updatedFollowing)
    setFollowing(updatedFollowing);
    // setUpdated(!updated);
  }
  const handleUnFollow = async (item) => {
    if (!isAuth) {
      navigate('/login')
      return;
    }
    // console.log(item.author._id);
    console.log(following)
    const response = await axios.post('http://localhost:3000/api/users/unfollow', { following_id: item.author._id });
    const updatedFollowing=following?.filter((id)=>id?.following_id!==item?.author?._id);
    console.log(updatedFollowing)
    setFollowing(updatedFollowing);
    // console.log(response);
    // setUpdated(!updated);
  }
  const toggleReadMore = (index) =>
    setExpandedArticle(expandedArticle === index ? null : index);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">📚 Your Feed</h2>
        <div className="space-y-8">
          {filteredPosts?.map((item, index) => (
            <div
              key={index}
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
                    <p className="font-bold text-2xl">{item?.author?.name}</p>

                    <p>Ex Software Developer @Auro.Edu</p>
                    <p>{formatDate(item.createdAt)}</p>

                  </div>


                </div>
                {
                  following?.some((cur) => cur?.following_id === item?.author?._id) ? (<p><button className="hover:bg-green-200 p-1.5 hover:rounded-sm" onClick={() => handleUnFollow(item)}>Following</button></p>) : (<p><button className="hover:bg-green-200 p-1.5 hover:rounded-sm" onClick={() => handleFollow(item)}>Follow</button></p>)
                }
                {/* <button className="hover:bg-green-200 p-1.5 hover:rounded-sm" onClick={()=>handleFollow(item)}>Follow</button> */}
                {/* <button
                  onClick={() => handleDelete(item)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button> */}
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

              

              {expandedArticle === index && (
                <p className="text-gray-600 mt-2 leading-relaxed">{item.body}</p>
              )}

              <button
                onClick={() => toggleReadMore(index)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all"
              >
                {expandedArticle === index ? "Show Less ▲" : "Read More ▼"}
              </button> 
              <div className="flex gap-3 pt-3">
                <p>{item?.likes?.length} Likes</p>
                <p>{item?.comments?.length} Comments</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default Home;
