import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { PlusSmIcon, DownloadIcon, TrashIcon, CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import { io } from "socket.io-client";
import VideoCard from "../Components/Card";
import Modal from "../Components/Modal";

const notify = (msg, { success }) => {
  if (success) {
    return toast.success(msg);
  }
  return toast.error(msg);
};

const socket = io("http://localhost:3000/");

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // console.log(videos);

  useEffect(() => {
    socket.on("VIDEO_DOWNLOADED", (data) => {
      notify(`${data} Downloaded`, { success: true });
      window.location.reload();
    });

    socket.on("VIDEO_STARTED", (data) => {
      notify(`Download Started ${data}`, { success: true });
    });

    axios
      .get("http://localhost:3000/api/downloads")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const files = [
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    // More files...
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
    {
      title: "IMG_4985.HEIC",
      size: "3.9 MB",
      source:
        "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    },
  ];

  const clickModal = () => {
    setOpenModal(true)
  }

  return (
    <>
    <Toaster />
      <div className="flex flex-col items-center w-screen h-screen">
        <h1 className="text-5xl text-center sm:text-lg font-bold pt-4">
          Download Your favorite Video!
        </h1>
        <div className="flex-shrink-0 pt-5">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 focus:outline-none"
            onClick={clickModal}
          >
            <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>New Video</span>
          </button>
        </div>

        {/* My Videos goes below this */}
        <div className="pb-5 pt-5 border-b border-gray-400 items-center justify-center text-center shadow-md w-screen">
          <h2 className="text-3xl leading-6 font-medium text-gray-900">
            Downloaded Videos
          </h2>
          <Modal open={openModal} setOpen={setOpenModal} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid items-center grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-5">
          {videos.map((data) => (
            <VideoCard data={data} />
            // <li key={data._id}>
            //   <VideoCard data={data} />
            // </li>
          ))}
        </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
