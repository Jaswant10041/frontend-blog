import React from "react";
import { useUserQuery } from "../hooks";
import axios from "axios";
import useArticlesQuery from "../hooks/useArticlesQuery";
const Home = () => {
  const { userData, isUserDataLoading, isErrorInUserData } = useUserQuery();
  const ArticlesData = useArticlesQuery();
  // const {data}=ArticlesData;
  const data = ArticlesData?.data?.data;
  const image='https://tse2.mm.bing.net/th?id=OIP.ipfGiyG7ctjSkhmjCpNfTAHaFj&pid=Api&P=0&h=180'
  console.log("userData ", userData);
  console.log(data);
  const formatDate=(createdAt)=>{
    const date=new Date(createdAt).toLocaleDateString('en-IN',{
      year:'numeric',
      month:'long',
      day:'numeric'
    })
    return date;
  }
  const formatTime=(createdAt)=>{
    const time=new Date(createdAt).toLocaleTimeString('en-IN',{
      hour:'2-digit',
      minute:'2-digit'
    })
    return time;
  }
  return (
    <div>
      <div className="text-center bg-green-500 text-white p-5 m-4">
        <h1 className="text-5xl font-bold m-3">
          Blogging
        </h1>
        <div className="text-xl">
          A place to share your knowledge.
        </div>
      </div>
      <div className="text-green-500 text-xl font-medium m-4">Your Feed</div>
      <hr className="m-4 bg-gradient-to-r from-green-500 to-gray-300 w-full h-1"/>

      <ul>
        {data?.map((item, index) => (
          <li key={index} className="m-5 my-6">
            <div className="flex">
              <img src='https://tse2.mm.bing.net/th?id=OIP.ipfGiyG7ctjSkhmjCpNfTAHaFj&pid=Api&P=0&h=180' className="rounded-full h-10 w-10"/>
              <div className="flex my-auto mx-3">
                <div className="">{formatDate(item.createdAt)}</div>
                <div className="mx-2">{formatTime(item.createdAt)}</div>
              </div>
            </div>
            <div className="text-xl font-semibold mt-2">{item.title}</div>
            <div className="mt-2">{item.description}</div>
            <hr className="mt-3"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
