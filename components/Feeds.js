import { OfficeBuildingIcon } from '@heroicons/react/outline'
import React from 'react'
import MsgInputs from './MsgInputs'
import Posts from './Posts'

export default function Feeds() {

  const posts=[
    {
      id:1,
      name:"Manidekshith",
      username:"mani@143",
      userimg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      img:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      text:"Picture loks great",
      timestamp:"3 hours ago",
    },
    {
      id:2,
      name:"manidekshith",
      username:"mani@143",
      userimg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      img:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      text:"Picture loks great",
      timestamp:"3 hours ago",
    },
    {
      id:3,
      name:"manidekshith",
      username:"mani@143",
      userimg:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      img:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
      text:"Picture loks great",
      timestamp:"3 hours ago",
    }
  ]
  return (
    <div className='xl:ml-[350px] border-l border-r xl:min-w-[576px]'>
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
