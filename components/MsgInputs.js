import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

export default function MsgInputs() {
  return (
    <main className="flex w-full border-b border-gray-200 space-x-3 mb-2 py-3">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user profile" className="w-10 h-10 rounded-full  mx-2 my-2" />
      <div className="w-full ">
        <div className="">
            <textarea className="w-full outline-none px-2 border-b text-lg placeholder-gray-500 min-h-[70px] text-gray-800 scroll-m-1" placeholder="What are todays topics??"/>
        </div>
        <div className="flex justify-between">
          <div className="flex px-2">
            <PhotographIcon className="h-8 w-8 px-1 text-sky-400 hover:cursor-pointer" />
            <EmojiHappyIcon className="h-8 w-8 px-1 text-sky-400 hover:cursor-pointer" />
          </div>
          <button className=" text-white rounded-full bg-green-500 shadow-sm justify-center items-center  px-3 py-1 text-sm mr-2">Hello me</button>
        </div>
      </div>
    </main>
  );
}
