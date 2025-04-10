import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks";
const Auth = () => {
  const isRegistered = useMatch("/register");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [error,setErrors]=useState('');
  const initialLoginDetails = { email: "", password: "" };

  async function submit(values, actions) {
    console.log(values);
    const { password } = values;
    try {
      const path = isRegistered ? "register" : "login";
      if (path == "register" && password.length < 8) {
        const error=new Error();
        error.response={
          status:422,
          data:{
              errors:{
                body: "Password should be atleast 8 characters"}
              }
          }
        throw error;
      }
      const response = await axios.post(
        `http://localhost:3001/api/users/${path}`,
        values
      );
      console.log(response);
      const { data } = response;
      navigate('/');
      login(data);
      setErrors('');
      
    } catch (err) {
      console.log("this is in auth",err);
      const { status, data } = err?.response;
      if(status===409){
        // alert("You are already registered please login");
        setErrors("You are already registered with this email");
      }
      else if(status===401){
        setErrors("Incorrect Password");
      }
      actions.setErrors(data.msg);
      // console.log(data);
      
    }
  }
  return (
    <div>
      <div className="mx-auto pt-14 w-full mt-14">
        <div className="flex justify-center">
          <div>
            <h1 className="text-2xl font-bold text-center">
              {" "}
              Sign {isRegistered != null ? "Up" : "in"}
            </h1>
            <Link to={isRegistered != null ? "/login" : "/register"}>
              <p className="text-md text-center font-medium text-green-500">
                {isRegistered != null ? "Already have an" : "Not created"}{" "}
                account click here
              </p>
            </Link>
            {/* <h2 className="font-bold text-center">
              {credentials ? "" : "Incorrect Credentials"}
            </h2> */}
            
            <h2 className="font-bold text-center">
              {error=== "" ? "" : error}
            </h2>

            <Formik
              initialValues={
                isRegistered
                  ? { ...initialLoginDetails, name: "" }
                  : initialLoginDetails
              }
              onSubmit={submit}
              enableReinitialize
            >
              {() => (
                <>
                  {/* <FormErrors/> */}
                  <Form>
                    <fieldset className="flex flex-col">
                      {isRegistered != null && (
                        <Field
                          type="text"
                          autoFocus
                          name="name"
                          placeholder="Your name"
                          className="border border-zinc-700 w-96 m-2 p-4 rounded-full"
                        />
                      )}

                      <Field
                        type="email"
                        name="email"
                        autoFocus={isRegistered===null}
                        placeholder="Your email"
                        className="border border-zinc-700 w-96 m-3 p-4 rounded-full"
                      />
                      <Field
                        type="password"
                        name="password"
                        placeholder="Your password"
                        className="border border-zinc-700 w-96 m-3 p-4 rounded-full"
                      />
                      <button
                        type="submit"
                        className="rounded-lg ml-auto bg-green-500 p-4 mt-3 mr-3"
                      >
                        Sign {isRegistered != null ? "up" : "in"}
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
