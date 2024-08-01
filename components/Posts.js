import { ChatIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { DotsCircleHorizontalIcon, SaveAsIcon } from "@heroicons/react/solid";
import { HeartIcon as Heartfilled } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import { setDoc, doc, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject ,ref} from "firebase/storage";
export default function Posts({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, sethasLiked] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    sethasLiked(likes.findIndex((likes) => likes.id == session?.user.uid) !== -1);
  }, [likes]);
  async function Likes() {
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db,"posts",post.id,"likes",session?.user.uid ))
      }else{
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    }else{
      signIn()
    }
  }

  async function deletePost(){
    if(window.confirm("Are you sure you want to delete the post?")){
      deleteDoc(doc(db,"posts",post.id ))
      if(post.data().image){
        deleteObject(ref(storage,`posts/${post.id}/image`))
      }
    }
  }
  return (
    <main className="w-full flex px-3 py-5 border-b mb-2">
      <div className="w-fit ">
        <img
          src={post.data().userImg}
          className="w-12 h-12 rounded-full mr-4 cursor-pointer"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center py-2">
            <h1 className="font-bold text-xl text-gray-800 font-serif hover:underline hover:cursor-pointer">
              {post.name}
            </h1>
            <p className="font-medium text-gray-700 px-1 hover:cursor-pointer hover:underline">
              {post.data().username}
            </p>
            <span className="text-gray-400 text-sm px-1">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          <div>
            <DotsCircleHorizontalIcon className="w-7 h-7 cursor-pointer text-gray-700  hover:text-gray-900" />
          </div>
        </div>
        <div className="text-gray-800 pb-2">{post.data().text}</div>
        <div className="w-full h-52">
          <img
            src={post.data().image}
            alt="posting image"
            className="w-fit h-full rounded-lg"
          />
        </div>
        <div className="flex justify-between w-full mt-3 pt-2 text-gray-600">
          <div className="flex ">
          {hasLiked ?(
            <Heartfilled 
            onClick={Likes}
            className="w-8 cursor-pointer text-red-500"/>
          ):
          <HeartIcon
            onClick={Likes}
            className="w-8 cursor-pointer text-red-700 hover:text-red-900"
          />}
          {likes.length>0&&(
            <div className="flex justify-center items-center text-sm text-gray-400">{likes.length}</div>
          )}
          </div>
          <ChatIcon className="w-8 cursor-pointer hover:text-gray-900" />
          {session?.user.uid == post.data().id && (
            <TrashIcon onClick={deletePost} className="w-8 cursor-pointer hover:text-gray-900" />
          )}
          <ShareIcon className="w-8 cursor-pointer hover:text-gray-900" />
        </div>
      </div>
    </main>
  );
}
