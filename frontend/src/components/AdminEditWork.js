import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import workCategory from "../helpers/workCategory";

const AdminEditWork = ({ onClose, workData, fetchdata }) => {
  const [data, setData] = useState({
    ...workData,
    workName: workData?.workName,
    category: workData?.category,
    workImage: workData?.workImage || [],
    description: workData?.description,
    price: workData?.price,
    sellingPrice: workData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadWork = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        workImage: [...prev.workImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteWorkImage = async (index) => {
    console.log("image index", index);

    const newWorkImage = [...data.workImage];
    newWorkImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        workImage: [...newWorkImage],
      };
    });
  };

  /*** upload work */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.updateWork.url, {
      method: SummaryApi.updateWork.method,
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
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product</h2>
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
          <label htmlFor="workName">Ажлын нэр :</label>
          <input
            type="text"
            id="workName"
            placeholder="ажлын нэр оруул"
            name="workName"
            value={data.workName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category" className="mt-3">
            Ажлын төрөл :
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Ажлын төрөл сонгох</option>
            {workCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="workImage" className="mt-3">
            Ажлын зураг:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Work Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadWork}
                />
              </div>
            </div>
          </label>
          <div>
            {data.workImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.workImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-blue-400 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteWorkImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="bg-blue-400 text-xs">*Ажлыг зураг оруулна уу?</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Ажлыг үнэлгээ :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Нийт үнэлгээг оруулна уу?"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Нэгжийн үнэ :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Нэгжийн үнэлгээг оруулна уу?"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Ажлын дэлгэрэнгүй тайлбар :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="ажлыг дэлгэрэнгүй тайлбарла"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Ажлыг өөрчлөх
          </button>
        </form>
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditWork;
