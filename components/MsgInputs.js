import { EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { db, storage } from "../firebase";
import { uploadString, ref, getDownloadURL } from "firebase/storage";

export default function MsgInputs() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [loading,setLoading]=useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);

  const sendPosts = async () => {
    if(loading) return 
    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      username: session.user.username,
      name: session.user.name,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const ImageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(ImageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(ImageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null)
    setLoading(false)
  };

  const addImageToPosts = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };


  return (
    <>
      {session && (
        <main className="flex w-full border-b border-gray-200 space-x-3 mb-2 py-3">
          <img
            src={session.user.image}
            alt="user profile"
            className="w-10 h-10 rounded-full  mx-2 my-2 cursor-pointer"
            onClick={() => signOut()}
          />
          <div className="w-full ">
            <div className="">
              <textarea
                className="w-full outline-none px-2 border-b text-lg placeholder-gray-500 min-h-[70px] text-gray-800 scroll-m-1"
                placeholder="What are todays topics??"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
            {selectedFile && (
              <div className="relative rounded-xl pr-2 mb-3">
                <XIcon className="absolute h-6 text-gray-600 cursor-pointer" onClick={()=>setSelectedFile(null)}/>
                <img src={selectedFile} alt="imagefile" className={`${loading && "animate-pulse rounded-xl mb-3 pr-2"}`}/>
              </div>
            )}
            <div className="flex justify-between">
              {!loading && (
                <>
                
              <div className="flex px-2">
                <div onClick={() => filePickerRef.current.click()}>
                  <PhotographIcon className="h-8 w-8 px-1 text-sky-400 hover:cursor-pointer" />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPosts}
                  />
                </div>
                <EmojiHappyIcon className="h-8 w-8 px-1 text-sky-400 hover:cursor-pointer" />
              </div>
              <button
                disabled={!input.trim()}
                className=" text-white rounded-full bg-green-500 shadow-sm hover:brightness-90 justify-center items-center hover:bg-green-600  px-3 py-1 text-sm mr-2 "
                onClick={sendPosts}
              >
                Hello me
              </button>
                </>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}