import { Inter } from "next/font/google";
import Sidebar from "../../components/Sidebar";
import Feeds from "../../components/Feeds";
import Widgets from "../../components/Widgets";
import React from 'react';
import Component from "../../components/Component";
const inter = Inter({ subsets: ["latin"] });

export default function Home({newsResult,RandomUsers}) {
  return (
    <div className='flex min-h-screen max-w-7xl mx-auto '>
      {/* Sidebar */}
      <Sidebar />
      {/* Feeds */}
      <Feeds />
        {/* widgets */}
      <Widgets articles={newsResult.articles} RandomUsers = {RandomUsers.results}/>

      <Component />
    </div>

  );
}
export async function getServerSideProps() {
  //Fetching data for news api
  const newsResult = await fetch(
    "https://saurav.tech/NewsAPI/everything/cnn.json"
  ).then((res) => res.json());
  //fetching data for random users
  const RandomUsers = await fetch("https://randomuser.me/api/?results=200&in=name,login,picture").then((res)=>res.json())
  return {
    props: {
      newsResult,
      RandomUsers
    },
  };
}

