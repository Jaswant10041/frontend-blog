import { Field, Form, Formik } from "formik";
import React from "react";
import Logout from "./Logout";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Settings = () => {
    const {logout}=useAuth();
    const navigate=useNavigate();
    const handleButton=()=>{
        logout();
        navigate('/login');
    }
    const {authUser}=useAuth();
    // console.log(authUser);
    const [errors,setErrors]=useState('');
    const handleSubmit=async(values,actions)=>{
      console.log(values)
      try{
        const responce=await axios.put('http://localhost:3001/api/users/update',values);
        console.log('settings responce '+responce);
        setErrors('');
        logout();
        navigate('/login');
      }
      catch(err){
        const {status,data}=err.response;
        if(status==401){
          setErrors('Incorrect Password');
        }
      }
      
    }
    const InitialValues={image:'',name:authUser?.name,about:'',email:authUser?.email,oldPassword:'',newPassword:''};
  return (
    <div>
      <div className="font-medium text-4xl text-center m-5">Your Settings</div>
      <h2 className="font-bold text-center">
              {errors=== "" ? "" : errors}
            </h2>
      <div className="">
        <Formik initialValues={InitialValues} onSubmit={handleSubmit} enableReinitialize>
          {() => (
            <>
              {/*For Errors*/}
              <Form className="bg-white flex justify-center">
                <fieldset className="flex flex-col">
                  <Field
                    type="text"
                    name="image"
                    placeholder="URL of profile pic"
                    className="border-2 sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                  <Field
                    type="text"
                    name="name"
                    placeholder="John"
                    className="border-2 sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                
                  <Field
                    as="textarea"
                    rows='5'
                    type="text"
                    name="about"
                    placeholder="Short Bio about you"
                    className="border-2 sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="John@gmail.com"
                    className="border-2  sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    className="border-2 sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="border-2 sm:w-96 w-64 m-3 p-2 rounded-sm px-3"
                  />
                  <button className="bg-green-500 border-1 w-48 rounded-md m-3 p-2 text-white" type="submit">Update Settings</button>
                  <hr className="mt-4"/>
                  <button onClick={()=>{handleButton()}}className="border-2 border-red-300 w-48 rounded-md m-3 mt-4 p-2 text-red-300">Or click here to Logout</button>
                </fieldset>
                
              </Form>
              
            </>
          )}
        </Formik>
        
      </div>
    </div>
  );
};

export default Settings;
