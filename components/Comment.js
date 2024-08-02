import {
    ChatIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
  } from "@heroicons/react/outline";
  import { DotsCircleHorizontalIcon, SaveAsIcon } from "@heroicons/react/solid";
  import { HeartIcon as Heartfilled } from "@heroicons/react/solid";
  import React, { useEffect, useState } from "react";
  import Moment from "react-moment";
  import { signIn, useSession } from "next-auth/react";
  import {
    setDoc,
    doc,
    onSnapshot,
    collection,
    deleteDoc,
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
  import { deleteObject, ref } from "firebase/storage";
  import { useRecoilState } from "recoil";
  import { modelState, postidState } from "../atom/atomModel";
  import { useRouter } from "next/router";
  export default function Comment({ comment,commentId,originalPostId }) {
    const router =useRouter()
    const { data: session } = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, sethasLiked] = useState(false);
    const [open, setOpen] = useRecoilState(modelState);
    const [postid, setPostid] = useRecoilState(postidState);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "posts", originalPostId,"comment",commentId, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
    }, [db,originalPostId]);
  
    useEffect(() => {
      sethasLiked(
        likes.findIndex((likes) => likes.id == session?.user.uid) !== -1
      );
    }, [likes]);
    async function LikeComment() {
      if (session) {
        if (hasLiked) {
          await deleteDoc(doc(db, "posts", originalPostId,"comment",commentId, "likes", session?.user.uid));
        } else {
          await setDoc(doc(db, "posts", originalPostId,"comment",commentId, "likes", session?.user.uid), {
            username: session.user.username,
          });
        }
      } else {
        signIn();
      }
    }
  
    async function deleteComment() {
      if (window.confirm("Are you sure you want to delete the post?")) {
        deleteDoc(doc(db, "posts", originalPostId,"comment",commentId));
      }
    }
    return (
      <main className="w-full flex px-3 py-3 border-b mb-2 pl-20">
      <div className="w-fit ">
        <img
          src={comment?.userImg}
          className="w-8 h-8 rounded-full mr-3 cursor-pointer flex justify-center items-center mt-3"
        />
      </div>
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center py-2">
              <h1 className="font-bold text-md mr-3 text-gray-800 font-serif hover:underline hover:cursor-pointer">
                {comment?.name}
              </h1>
              <p className="font-medium text-sm text-gray-700 px-1 hover:cursor-pointer hover:underline">
                {comment?.username}
              </p>
              <span className="text-gray-400 text-sm px-1">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <div>
              <DotsCircleHorizontalIcon className="w-7 h-7 cursor-pointer text-gray-700  hover:text-gray-900" />
            </div>
          </div>
          <div className="text-gray-800 pb-2">{comment?.comment}</div>
          <div className="flex justify-between w-full mt-3 pt-2 text-gray-600">
            <div className="flex ">
              {hasLiked ? (
                <Heartfilled
                  onClick={LikeComment}
                  className="w-8 cursor-pointer text-red-500"
                />
              ) : (
                <HeartIcon
                  onClick={LikeComment}
                  className="w-8 cursor-pointer text-red-700 hover:text-red-900"
                />
              )}
              {likes.length > 0 && (
                <div className="flex justify-center items-center text-sm text-gray-400">
                  {likes.length}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <ChatIcon
                onClick={() => {
                  if (!session) {
                    signIn();
                  } else {
                    setOpen(!open);
                    setPostid(originalPostId);
                  }
                }}
                className="w-8 cursor-pointer hover:text-gray-900"
              />
  
            </div>
            {session?.user.uid == comment?.userId && (
              <TrashIcon
                onClick={deleteComment}
                className="w-8 cursor-pointer hover:text-gray-900"
              />
            )}
            <ShareIcon className="w-8 cursor-pointer hover:text-gray-900" />
          </div>
        </div>
      </main>
    );
  }
  