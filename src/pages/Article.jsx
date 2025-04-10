import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Article = () => {
  const data = useLocation();
  const article = data?.state?.item;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    async function getComments() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/articles/comments/getcomments/${slug}`
        );

        // Flatten comments to ensure username is on the top level
        const formattedComments = response.data.map((c) => ({
          ...c,
          username: c.author?.username || "Anonymous",
        }));

        setComments(formattedComments);
      } catch (err) {
        console.error("Error fetching comments", err);
      } finally {
        setLoading(false);
      }
    }

    getComments();
  }, [slug]);

  async function handleComment() {
    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/articles/comments/addcomment/${slug}`,
        { body: comment }
      );

      const newComment = {
        ...response.data.comment,
        username: response.data.comment.author?.username || "Anonymous",
      };

      setComment("");
      setComments([...comments, newComment]);
    } catch (err) {
      console.error("Error adding comment", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Article Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article?.title}
        </h1>
        <p className="text-3xl text-gray-600 mb-8 italic leading-relaxed">
          {article?.description}
        </p>
        <div className="prose max-w-none text-xl text-gray-800 leading-8">
          <p>{article?.body}</p>
        </div>
      </div>

      {/* Comment Section */}
      <div className="border-t pt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="mb-10">
          <textarea
            placeholder="Share your thoughts..."
            className="w-full text-xl border-2 border-gray-300 rounded-lg p-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="5"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-end mt-4">
            <button
              className={`px-8 py-3 text-xl rounded-lg transition-all ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleComment}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Post Comment"}
            </button>
          </div>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 text-2xl text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((item, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg">
                <div className="flex items-start">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.username}&background=random`}
                    className="rounded-full h-12 w-12 mr-4"
                    alt={item.username}
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="font-medium text-xl text-gray-800">
                        {item.username}
                      </div>
                      <div className="ml-4 text-lg text-gray-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : "Invalid Date"}
                      </div>
                    </div>
                    <p className="mt-2 text-xl text-gray-700">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
