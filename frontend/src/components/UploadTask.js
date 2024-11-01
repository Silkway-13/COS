import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import workCategory from "../helpers/workCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadTask = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    id: "",
    taskName: "",
    status: false,
    ognoo: "",
  });

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
    /**upload TASK */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadTask.url, {
      method: SummaryApi.uploadTask.method,
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
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
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
          <label htmlFor="workName">Даалгаврын нэр :</label>
          <input
            type="text"
            id="taskName"
            placeholder="Та өөрийн хийх ажлын нэрийг оруулна уу?"
            name="taskName"
            value={data.taskName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="price" className="mt-3">
            Даалгаврын огноо :
          </label>
          <input
            type="string"
            id="ognoo"
            placeholder="Хэзээ хийх вэ?"
            value={data.ognoo}
            name="ognoo"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="price" className="mt-3">
            Даалгаврын хийгдсэн эсэх :
          </label>
          <input
            type="boolean"
            id="status"
            placeholder="Хийгдсэн үү?"
            value={data.status}
            name="status"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            add and update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTask;
