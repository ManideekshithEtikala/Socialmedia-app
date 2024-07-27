import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Widgets() {
  return (
    <main className='ml-8 mt-5'>
        <div>
            <div className='w-full border-2 flex justify-center rounded-full hover:shadow-lg outline-blue-400 hover:outline text-gray-800'>
                <SearchIcon className='w-10 p-2 text-gray-600 cursor-pointer'/>
                <input type='text' className="text-md outline-none p-1 m-2" placeholder='Search Something!!'/>
            </div>
        </div>
    </main>
  )
}
