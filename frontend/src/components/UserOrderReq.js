import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import workCategory from "../helpers/workCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UserOrderReq = ({ onClose }) => {
  const [data, setData] = useState({
    phoneNumber: "",
  });

  // const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  // const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  {
    /**work order req */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.orderRequest.url, {
      method: SummaryApi.orderRequest.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      // fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[50%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">
            Бидэнтэй холбогдсонд баярлалаа. Утас: 99118999
          </h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="workName" className="p-4">
              Холбогдох утасны дугаараа оруулна уу? Бид таньтай холбогдох болно.
            </label>
            <div className=" flex gap-2">
              <input
                type="text"
                id="phoneNumber"
                placeholder="утасны дугаар"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleOnChange}
                className="p-2 bg-slate-100 border rounded h-10 justify-between items-center"
                required
              />

              <button className="px-3 py-2 bg-red-500 text-white mb-10 hover:bg-red-700 w-80 h-10 uppercase rounded-md">
                Ажил хийх хүсэлт илгээх
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserOrderReq;
