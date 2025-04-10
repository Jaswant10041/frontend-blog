import React, { useState } from "react";
// import { useUserQuery } from "../hooks";
import axios from "axios";
import useArticlesQuery from "../hooks/useArticlesQuery";
import { Link } from "react-router-dom";

const Home = () => {
  const ArticlesData = useArticlesQuery();
  const data = ArticlesData?.data?.data;
  const [expandedArticle, setExpandedArticle] = useState(null);

  const formatDate = (createdAt) =>
    new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (createdAt) =>
    new Date(createdAt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDelete = async (item) => {
    const response = await axios.post(
      "http://localhost:3001/api/articles/deletepost",
      { data: item }
    );
    console.log(response);
  };

  const toggleReadMore = (index) =>
    setExpandedArticle(expandedArticle === index ? null : index);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-10 shadow-md mb-8">
        <h1 className="text-5xl font-extrabold mb-2">Blogging 📝</h1>
        <p className="text-2xl font-light">A place to share your knowledge.</p>
      </header>

      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">📚 Your Feed</h2>
        <div className="space-y-8">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <div className="flex items-center">
                  <img
                    src="https://ui-avatars.com/api/?name=Author&background=green&color=fff"
                    alt="Author"
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <div>{formatDate(item.createdAt)}</div>
                    <div className="text-xs">{formatTime(item.createdAt)}</div>
                  </div>
                </div>
                
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

              <p className="text-gray-700 text-lg mb-2">{item.description}</p>

              {expandedArticle === index && (
                <p className="text-gray-600 mt-2 leading-relaxed">{item.body}</p>
              )}

              <button
                onClick={() => toggleReadMore(index)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all"
              >
                {expandedArticle === index ? "Show Less ▲" : "Read More ▼"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
