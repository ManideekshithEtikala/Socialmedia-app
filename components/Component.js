import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { modelState, postidState } from "../atom/atomModel";
import {
  XIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { onSnapshot, doc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Component() {
  const [open, setOpen] = useRecoilState(modelState);
  const [postid] = useRecoilState(postidState);
  const [input, setInput] = useState("");
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    onSnapshot(doc(db, "posts", postid), (snapshot) => {
      setPost(snapshot);
    });
  }, [postid, db]);
  async function sendComment() {
    await addDoc(collection(db,"posts",postid,"comment"),{
        comment:input,
        name:session.user.name,
        userImg :session.user.image,
        username:session.user.username,
        userId:session.user.uid,
        timestamp:serverTimestamp(),
    })
    setOpen(false)
    setInput("")
    router.push(`/posts/${postid}`)
  }
  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-500 rounded-lg shodow-md outline-none"
          onRequestClose={() => {
            setOpen(false);
          }}
        >
          <main>
            <div className="ml-1 mt-1">
              <XIcon
                className="w-7 h-8 text-gray-600 hover:bg-gray-100 rounded-full cursor-pointer p-1 m-1"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex items-center relative space-x-1 p-2">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
              <img
                src={post?.data()?.userImg}
                className="w-10 h-10 rounded-full mr-4 cursor-pointer ml-1"
              />
              <div className="flex flex-col justify-start ">
                <h1 className="font-bold text-md text-gray-800 font-serif hover:underline hover:cursor-pointer">
                  {post?.data()?.name}
                </h1>
                <p className="font-medium text-sm text-gray-700 px-1 hover:cursor-pointer ">
                  @{post?.data()?.username}
                </p>
                <p className="text-sm text-gray-700 text-start flex ">~~{post?.data()?.text}</p>
              </div>
              <span className="text-gray-400 text-sm px-1 ml-1 flex mb-2 justify-center items-center">
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <div>
              <main className="flex w-full border-b border-gray-200 space-x-3 mb-2 py-3">
                <img
                  src={session.user.image}
                  alt="user profile"
                  className="w-10 h-10 rounded-full  mx-2 my-2 cursor-pointer"
                />
                <div className="w-full ">
                  <div className="">
                    <textarea
                      className="w-full outline-none px-2 border-b text-lg placeholder-gray-500 min-h-[70px] text-gray-800 scroll-m-1"
                      placeholder="Write down your comment"
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex px-2">
                      <EmojiHappyIcon className="h-8 w-8 px-1 text-sky-400 hover:cursor-pointer" />
                    </div>
                    <button
                      disabled={!input.trim()}
                      className=" text-white rounded-full bg-green-500 shadow-sm hover:brightness-90 justify-center items-center hover:bg-green-600  px-3 py-1 text-sm mr-2 "
                      onClick={sendComment}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </main>
        </Modal>
      )}
    </>
  );
}
