import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useCreateArticle } from "../hooks";

const CreateArticle = () => {
  const { isCreating, createArticle } = useCreateArticle();
  const [tagValues, setTagValues] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = { title: "", description: "", body: "", tags: "" };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setTagValues((prev) => [...prev, value]);
        setTagValue("");
      }
    }
  };

  const handleSubmit = (values, actions) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    values.tags = tagValues;
    createArticle(values);
    setTimeout(() => {
      setIsSubmitting(false);
      actions.resetForm();
      setTagValues([]);
      setTagValue("");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full md:w-3/5 lg:w-2/5 bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">Post New Article</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className="flex flex-col gap-4">
              <Field
                type="text"
                name="title"
                placeholder="Article Title"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <Field
                type="text"
                name="description"
                placeholder="What's this article about?"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <Field
                as="textarea"
                name="body"
                placeholder="Write your article..."
                rows="6"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                required
              />
              <div>
                <Field
                  type="text"
                  name="tags"
                  onKeyDown={handleEnter}
                  value={tagValue}
                  onChange={(e) => setTagValue(e.target.value)}
                  placeholder="Enter tags (press Enter to add)"
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="flex flex-wrap mt-2 gap-2">
                  {tagValues.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Publishing..." : "Publish Article"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateArticle;