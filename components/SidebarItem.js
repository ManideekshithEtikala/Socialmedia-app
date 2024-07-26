import React from 'react'

export default function SidebarItem({text,Icon,active}) {
  return (
    <div className='hoverEffect flex items-center my-2 p-2'>
    <Icon className="w-7"/>
    <div className={`${active && "font-bold"} hidden xl:inline`}>{text}</div>
    </div>
  )
}
