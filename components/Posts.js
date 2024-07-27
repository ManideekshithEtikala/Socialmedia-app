import { ChatIcon, HeartIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { DotsCircleHorizontalIcon, SaveAsIcon } from "@heroicons/react/solid";
import React from "react";

export default function Posts({ post }) {
  return (
    <main className="w-full flex px-3 py-5 border-b">
      <div className="w-fit ">
        <img src={post.userimg} className="w-12 h-12 rounded-full mr-4 cursor-pointer" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center py-2">
            <h1 className="font-bold text-xl text-gray-800 font-serif hover:underline hover:cursor-pointer">{post.name}</h1>
            <p className="font-medium text-gray-700 px-1 hover:cursor-pointer">{post.username}</p>
            <span className="text-gray-400 text-sm px-1">{post.timestamp}</span>
          </div>
          <div>
            <DotsCircleHorizontalIcon className="w-7 h-7 cursor-pointer text-gray-700  hover:text-gray-900" />
          </div>
        </div>
        <div className="text-gray-800 pb-2">{post.text}</div>
        <div className="w-full h-52">
            <img src={post.img} alt="posting image" className="w-fit h-full rounded-lg"/>
        </div>
        <div className="flex justify-between w-full mt-3 pt-2 text-gray-600">
            <HeartIcon className="w-8 cursor-pointer hover:text-gray-900"/>
            <ChatIcon className="w-8 cursor-pointer hover:text-gray-900"/>
            <ShareIcon className="w-8 cursor-pointer hover:text-gray-900"/>
            <SaveAsIcon className="w-8 cursor-pointer hover:text-gray-900"/>
        </div>
      </div>
    </main>
  );
}
