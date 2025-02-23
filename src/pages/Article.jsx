import axios from "axios";
import { Field, Formik, Form } from "formik";
import React from "react";
import { useState } from "react";
import useArticleQuery from "../hooks/useArticleQuery";
const Article = () => {
  const [tagValues, setTagValues] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const initialValues = { title: "", description: "", body: "", tags: "" };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData,setFormData]=useState(null);
  const {articleData}=useArticleQuery(formData);
  const [bodyValidate,setBodyValidate]=useState('');
  const [descriptionValidate,setDescriptionValidate]=useState('');
  const [titleValidate,setTitleValidate]=useState('');
  console.log(articleData);
  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      console.log(e);
      e.preventDefault();
      const value = e.target.value;
      setTagValue("");
      setTagValues((prev) => [...prev, value]);
    }
  };
  
  const handleSubmit = async (values, actions) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    values.tags = tagValues;
    if(values.title===''){
        setTitleValidate('required');
        setIsSubmitting(false);
        return ;
    }
    if(values.description===''){
        setDescriptionValidate('required');
        setIsSubmitting(false);
        return ;
    }
    if(values.body===''){
        setBodyValidate('required');
        setIsSubmitting(false);
        return ;
    }
    
    setFormData(values);
    console.log(articleData);
    setTimeout(() => {
      //after a delay we are ready to take another submission
      setIsSubmitting(false);
      actions.resetForm();
      setTagValues([]);
      setTagValue("");
      setFormData(null);
    }, 2000);
  };
  const handleOnchange = async (e) => {
    setTagValue(e.target.value);
  };
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="w-full md:w-3/5 lg:w-3/5">
            <fieldset className="flex flex-col">
              <Field
                type="text"
                name="title"
                placeholder="Article Title"
                className="border-2 m-2 p-2 w-full"
              />
              {
                titleValidate!='' && <h3>{titleValidate}</h3>
              }
              <Field
                type="text"
                name="description"
                placeholder="What's this article about"
                className="border-2 m-2 p-2 w-full"
              />
              {
                descriptionValidate!='' && <h3>{descriptionValidate}</h3>
              }
              <Field
                as="textarea"
                rows="5"
                type="text"
                name="body"
                placeholder="Write your article......"
                className="border-2 m-2 p-2 w-full"
              />
              {
                bodyValidate!='' && <h3>{bodyValidate}</h3>
              }
              <Field
                type="text"
                name="tags"
                onKeyDown={handleEnter}
                value={tagValue}
                onChange={handleOnchange}
                placeholder="Enter tags"
                className="border-2 m-2 p-2 w-full"
              />
              <ul className="flex">
                {tagValues.map((item, index) => (
                  <li key={index} className="mx-2">
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                disabled={isSubmitting}
                className="border-2 w-20 m-2 p-1"
              >
                {isSubmitting === true ? "Publishing" : "Publish Article"}
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Article;
