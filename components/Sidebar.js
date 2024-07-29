import React from "react";
import SidebarItem from "./SidebarItem.js";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, useSession } from "next-auth/react";
export default function Sidebar() {
  const { data: session } = useSession();
  
  return (
    <main className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full ">
      <div>
        <img
          src="./logo.png"
          alt="logo image"
          className="rounded-lg cursor-pointer w-12 h-12 flex justify-start my-4"
        />
      </div>

      <div>
        <SidebarItem text="Home" Icon={HomeIcon} active />
        <SidebarItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarItem text="Notifications" Icon={BellIcon} />
            <SidebarItem text="Messages" Icon={InboxIcon} />
            <SidebarItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarItem text="Lists" Icon={ClipboardIcon} />
            <SidebarItem text="Profile" Icon={UserIcon} />
            <SidebarItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
{console.log(session)}
      {session ? (
        <>
          <div className="hoverEffect justify-center items-center p-2 m-2 text-lg shadow-md bg-green-500 text-white hover:brightness-80 hidden xl:flex font-bold">
            <button>Hello me</button>
          </div>
          <div className="hoverEffect flex items-center my-1 p-2 w-full">
            <div>
              <img
                src={session.user.image}
                alt="profileimg"
                className="h-9 rounded-full mx-1 flex justify-start"
              />
            </div>
            <div className=" flex-col items-center justify-center mx-1 hidden xl:flex">
              <sapn className="font-bold text-md">@{session.user.username}</sapn>
              <span className="text-sm">{session.user.uid}</span>
            </div>
            <div>
              <DotsCircleHorizontalIcon className="h-6 w-6 xl:h-8 mx-1 justify-end hidden xl:flex" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => signIn()}
            className="rounded-full w-full  hover:bg-green-600 justify-center items-center p-2 m-2 text-lg shadow-md bg-green-500 text-white hover:brightness-80 hidden xl:flex font-bold"
          >
            <button>SingUp</button>
          </div>
        </>
      )}
    </main>
  );
}
