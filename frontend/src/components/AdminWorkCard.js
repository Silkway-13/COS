import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import displayMNTCurrency from "../helpers/displayCurrency";
import AdminEditWork from "./AdminEditWork";

const AdminWorkCard = ({ data, fetchdata }) => {
  const [editWork, setEditWork] = useState(false);

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.workImage[0]}
            alt={data?.workImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.workName}</h1>

        <div>
          <p className="font-semibold">
            {displayMNTCurrency(data.sellingPrice)}
          </p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditWork(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editWork && (
        <AdminEditWork
          workData={data} // Corrected prop name from productData to workData
          onClose={() => setEditWork(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminWorkCard;
