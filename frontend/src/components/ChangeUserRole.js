import React, { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-70">
      <div className="mx-auto bg-gray-100 shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Нэр : {name}</p>
        <p>Имэйл : {email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Үүрэг : </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-gray-200 hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
