import { OfficeBuildingIcon } from '@heroicons/react/outline'
import React from 'react'
import MsgInputs from './MsgInputs'

export default function Feeds() {
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
    </div>
  )
}
