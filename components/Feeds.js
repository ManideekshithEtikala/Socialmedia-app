import { OfficeBuildingIcon } from '@heroicons/react/outline'
import React, { useState,useEffect } from 'react'
import MsgInputs from './MsgInputs'
import Posts from './Posts'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'


export default function Feeds() {
const [posts,setPosts] = useState([])
useEffect(()=>onSnapshot(
  query(collection(db,"posts"),orderBy("timestamp","desc")),
  (snapshot)=>{
    setPosts(snapshot.docs)
  }
),[])
  return (
    <div className='xl:ml-[350px] border-l border-r xl:min-w-[550px]'>
        <div className='flex justify-between px-2 my-3 border-b pb-2 font-extrabold sticky'>
            <h1>Home</h1>
            <OfficeBuildingIcon className='hoverEffect w-7 h-7 '/>
        </div>
        {/* message input */}
        <div>
            <MsgInputs/>
        </div>
        {/* posts */}
        <div>
          {posts.map((post)=>(
            <Posts post={post} key={post.id}/>
          ))}
        </div>
    </div>
  )
}
