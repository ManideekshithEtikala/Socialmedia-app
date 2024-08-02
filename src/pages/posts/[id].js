import { Inter } from "next/font/google";
import Sidebar from "../../../components/Sidebar";
import Posts from "../../../components/Posts";
import Widgets from "../../../components/Widgets";
import Component from "../../../components/Component";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../../../firebase";
// Initialize font
const inter = Inter({ subsets: ["latin"] });

// Define the main component
export default function Post({ newsResult, randomUsers }) {
    const router=useRouter()
    const {id}=router.query
    const [post,setPost]=useState()
    useEffect(()=>{
        onSnapshot(doc(db,"posts",id),(snapshot)=>setPost(snapshot))
    },[db,id])
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto ">
      {/* Sidebar */}
      <Sidebar />
      {/* Feeds */}
      <div className="xl:ml-[350px] border-l border-r xl:min-w-[550px]">
        <div className="flex px-3 my-3 border-b pb-2 font-extrabold sticky items-center">
          <div>
            <ArrowLeftIcon onClick={()=>router.push("/")} className="h-10 p-2 hover:bg-gray-100 rounded-full text-black flex items-center justify-center" />
          </div>
          <h1>Home</h1>
        </div>
      <Posts id={id} post={post}/>
      </div>
      {/* widgets */}
      <Widgets
        articles={newsResult.articles}
        RandomUsers={randomUsers.results}
      />

      <Component />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetching data for news api
  const newsResult = await fetch(
    "https://saurav.tech/NewsAPI/everything/cnn.json"
  ).then((res) => res.json());

  // Fetching data for random users
  const randomUsers = await fetch(
    "https://randomuser.me/api/?results=200&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResult,
      randomUsers,
    },
  };
}
