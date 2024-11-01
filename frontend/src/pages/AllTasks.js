import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SummaryApi from "../common";
import moment from "moment";
import UploadTask from "../components/UploadTask";

const AllTasks = () => {
  const [openUploadTask, setOpenUploadTask] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allTasks.url, {
        method: SummaryApi.allTasks.method,
        credentials: "include",
      });

      if (!fetchData.ok) {
        throw new Error("Failed to fetch data");
      }

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllTasks(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="pb-4, bg-gray-100">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Миний хийх ажлууд</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadTask(true)}
        >
          add task
        </button>
      </div>
      <table className="w-full userTable">
        <thead className="bg-gray-600 text-gray-200">
          <tr>
            <th>ID</th>
            <th>TaskName</th>
            <th>Status</th>
            <th>Hezee</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="">
          {allTasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task?.taskName}</td>
              <td>{task?.status}</td>
              <td>{task?.ognoo}</td>
              <td>{moment(task?.createdAt).format("ll")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*** upload work component */}
      {openUploadTask && (
        <UploadTask
          onClose={() => setOpenUploadTask(false)}
          fetchData={fetchAllTasks}
        />
      )}
    </div>
  );
};

export default AllTasks;
