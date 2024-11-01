import React, { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow ">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                className="w-20 h-20 rounded-full mt-3"
                alt={user?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm mb-3">{user?.role}</p>
        </div>
        {/*** navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-300">
              Бүх хэрэглэгчид
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-300">
              Бүх ажил
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-300">
              Ажил хийх хүсэлтүүд
            </Link>
            <Link to={"all-tasks"} className="px-2 py-1 hover:bg-slate-300">
              To do List
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
