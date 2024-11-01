import React, { useEffect, useState } from "react";
import moment from "moment";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      if (!fetchData.ok) {
        throw new Error("Failed to fetch data");
      }

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="pb-4, bg-gray-100">
      <table className="w-full userTable">
        <thead className="bg-gray-600 text-gray-200">
          <tr>
            <th>Дугаар</th>
            <th>Хэрэглэгчийн нэр</th>
            <th>Имэйл хаяг</th>
            <th>Үүрэг</th>
            <th>Нэгдсэн хугацаа</th>
            <th>Тохиргоо</th>
          </tr>
        </thead>
        <tbody className="">
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("ll")}</td>
              <td>
                <button
                  className="bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-gray-200"
                  onClick={() => {
                    setUpdateUserDetails(user);
                    setOpenUpdateRole(true);
                  }}
                >
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
