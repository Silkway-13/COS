import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import SummaryApi from "../common";
import moment from "moment";

const AllOrders = () => {
  const [openUploadWork, setOpenUploadWork] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: "include",
      });

      if (!fetchData.ok) {
        throw new Error("Failed to fetch data");
      }

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllOrders(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="pb-4, bg-gray-100">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Захиалгын хүсэлтүүд</h2>
      </div>
      <table className="w-full userTable">
        <thead className="bg-gray-600 text-gray-200">
          <tr>
            <th>Дугаар</th>
            <th>Утас</th>
            <th>Он сар өдөр</th>
          </tr>
        </thead>
        <tbody className="">
          {allOrders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order?.phoneNumber}</td>

              <td>{moment(order?.createdAt).format("ll")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
