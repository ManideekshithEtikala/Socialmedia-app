import React from "react";

export default function User({ user }) {
  return (
    <main className="flex bg-gray-50 hover:bg-gray-200 items-center justify-between rounded-full mb-1 border-b transition duration-300 ease-out">
      <div className="w-fit">
        <img src={user.picture.thumbnail} alt="user image" className="w-14 h-14 rounded-full m-2 ml-3" />
      </div>
      <div>
        <p className="font-semibold text-lg text-gray-600 hover:cursor-pointer hover:underline">{user.login.username}</p>
        <div className="text-sm flex text-gray-500">
          <p>{user.name.first}</p>
          <p>{user.name.last}</p>
        </div>
      </div>
      <button className="flex justify-center items-center p-2 m-2 shadow-md bg-black text-white hover:brightness-80 rounded-full font-bold hover:shadow-lg">Follow</button>
    </main>
  );
}
