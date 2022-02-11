import React from "react";
import {
  PlusSmIcon,
  DownloadIcon,
  TrashIcon,
  CheckCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import axios from "axios";
const FileDownload = require("js-file-download");

const VideoCard = ({ data }) => {
  console.log(data);

  const { _id, title, thumbnail } = data;
  // const { video } = data;
  // const { _id, title, thumbnail } = video;

  const downloadVideo = async (e) => {
    const videoId = e.target.id;
    const filename = e.target.title;

    axios
      .get(`http://localhost:3000/api/downloads/${videoId}/downloadfile`, {
        responseType: "blob",
      })
      .then((res) => {
        FileDownload(res.data, `${filename}.mp4`);
      });
  };

  const deleteVideo = async (e) => {
    const videoId = e.target.title;

    axios
      .delete(`http://localhost:3000/api/downloads/${videoId}`)
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <>
      <div key={data._id} className="relative shadow-xl rounded-lg">
        <div className="group block w-full aspect-w-10 aspect-h-7 items-center rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="object-contain w-full h-full pointer-events-none group-hover:opacity-75"
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {data.title}</span>
          </button>
        </div>
        <p className="mt-2 px-2 block text-sm font-medium text-gray-900 text-center pointer-events-none">
          {title}
        </p>
        {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          {data.size}
        </p> */}
        <div className="sm:items-center justify-center text-center">
          <button
            id={_id}
            type="button"
            className="mx-2 mr-5 justify-center"
            onClick={downloadVideo}
          >
            <DownloadIcon
              className="-ml-1 h-5 w-5 justify-center"
              aria-hidden="false"
            />
          </button>
          <button type="button" title={_id} className="mt-2 justify-center"onClick={deleteVideo}>
            <TrashIcon
              className="-ml-1 h-5 w-5 justify-center"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
