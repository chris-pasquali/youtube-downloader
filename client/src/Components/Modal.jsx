/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import axios from "axios";

const notify = (msg, { success }) => {
  if (success) {
    return toast.success(msg);
  }
  return toast.error(msg);
};

export default function Modal({ open, setOpen }) {
  // const [open, setOpen] = useState(false);

  const downloadVideo = (e) => {
    e.preventDefault();

    const youtubeUrl = e.target.elements.youtubeUrl.value;
    console.log(youtubeUrl);

    axios
      .post("http://localhost:3000/api/downloads", { youtubeUrl })
      .then((res) => {
        notify("Fetching video details...", { success: true });
      })
      .catch((err) => {
        notify("Something went wrong downloading Video", { success: false });
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 sm:text-sm">
                  Download Your Favorite Youtube Videos!
                </h2>
                {/* <Toaster /> */}
                <div>
                  <form onSubmit={downloadVideo} className="flex flex-col rounded shadow-lg p-12 mt-5">
                    <div className="mt-1">
                      <label
                        htmlFor="youtubeUrl"
                        className="block text-sm font-medium text-gray-700 pb-2"
                      >
                        Enter Link
                      </label>
                      <input
                        type="url"
                        id="youtubeUrl"
                        placeholder="E.g. https://www.youtube.com/watch?v=PCicKydX5GE"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="w-full sm:w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Download
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
