import React from 'react'

export default function News({article}) {
  return (
    <a rel='noreferrer' href={article.url} target='_blank' className='flex justify-center items-center hover:bg-gray-200 m-2 border-b p-2 transition duration-300
        ease-out'>
        <div> 
            <p className='font-semibold text-sm text-gray-700'>{article.title}</p>
            <p className='text-xs text-gray-500'><span className='text-xs'>~</span>{article.author}</p>
        </div>
        <div className='w-full flex justify-end items-center'>
            <img src={article.urlToImage} alt='article image' className='w-[75px] h-[70px] rounded-lg'/>
        </div>
    </a>
  )
}
