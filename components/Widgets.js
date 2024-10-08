import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import News from "./News";
import User from "./User";
import { AnimatePresence, motion } from "framer-motion";
export default function Widgets({ articles, RandomUsers }) {
  const [articleNum, setarticleNum] = useState(4);
  const [noofusers, setnoofusers] = useState(3);
  return (
    <main className="ml-8 mt-5 ">
      <div className=" sticky top-3 bg-white pb-2">
        <div className="w-full border-2 flex justify-center rounded-full hover:shadow-lg outline-blue-400 hover:outline text-gray-800">
          <SearchIcon className="w-10 p-2 text-gray-600 cursor-pointer" />
          <input
            type="text"
            className="text-md outline-none p-1 m-2"
            placeholder="Search Something!!"
          />
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg mt-3">
        <h1 className="font-bold text-xl text-center font-sans text-gray-700">
          Well!..Todays Hot News
        </h1>
        <AnimatePresence>
          {articles?.slice(0, articleNum).map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News key={index} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="p-1 text-blue-500 text-md hover:text-blue-600"
          onClick={() => {
            setarticleNum(articleNum + 4);
          }}
        >
          Show more
        </button>
      </div>

      <div className="bg-gray-100 rounded-lg mt-3 sticky top-20">
        <h1 className="font-bold text-xl text-center font-sans text-gray-700">
          Explore and Follow!!
        </h1>

        <AnimatePresence>
          {RandomUsers?.slice(0, noofusers).map((user, id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <User key={id} user={user} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="p-1 text-blue-500 text-md hover:text-blue-600"
          onClick={() => {
            setnoofusers(noofusers + 3);
          }}
        >
          Show more
        </button>
      </div>
    </main>
  );
}
