import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import News from "./News";

export default function Widgets({articles}) {
    const [articleNum,setarticleNum]=useState(4)
  return (
    
    <main className="ml-8 mt-5">
      <div>
        <div className="w-full border-2 flex justify-center rounded-full hover:shadow-lg outline-blue-400 hover:outline text-gray-800">
          <SearchIcon className="w-10 p-2 text-gray-600 cursor-pointer" />
          <input
            type="text"
            className="text-md outline-none p-1 m-2"
            placeholder="Search Something!!"
          />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg">
      {articles.slice(0,articleNum
      ).map((article,index)=>(
        <News key={index} article={article}/>
      ))}
      <button className="p-1 text-blue-500 text-md hover:text-blue-600" onClick={()=>{setarticleNum (articleNum+4)}}>Show more</button>
      </div>
    </main>
  );
}
