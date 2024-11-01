import React, { useEffect, useState } from "react";
import UploadWork from "../components/UploadWork";
import AdminWorkCard from "../components/AdminWorkCard";
import SummaryApi from "../common";

const AllWorks = () => {
  const [openUploadWork, setOpenUploadWork] = useState(false);
  const [allWork, setAllWork] = useState([]);

  const fetchAllWork = async () => {
    try {
      const response = await fetch(SummaryApi.getAllWorks.url);
      const dataResponse = await response.json();
      setAllWork(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllWork();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Захиалагдсан бүх ажлууд</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadWork(true)}
        >
          Ажил оруулах
        </button>
      </div>

      {/*** all works */}
      <div className="flex items-start flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allWork.map((work, index) => {
          return (
            <AdminWorkCard
              data={work}
              key={index + "allWork"}
              fetchdata={fetchAllWork}
            />
          );
        })}
      </div>

      {/*** upload work component */}
      {openUploadWork && (
        <UploadWork
          onClose={() => setOpenUploadWork(false)}
          fetchData={fetchAllWork}
        />
      )}
    </div>
  );
};

export default AllWorks;
