import React from 'react'
import { useUserQuery } from '../hooks'
import axios from 'axios';
import useArticlesQuery from '../hooks/useArticlesQuery';
const Home =() => {
  const {userData,isUserDataLoading,isErrorInUserData}=useUserQuery();
  const ArticlesData=useArticlesQuery();
  // const {data}=ArticlesData;
  const data=ArticlesData?.data?.data;
  console.log('userData ',userData);
  console.log(data);
  return (
    <div>
      <ul>
        {
          data?.map((item,index)=>
             <li key={index}>{item.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Home