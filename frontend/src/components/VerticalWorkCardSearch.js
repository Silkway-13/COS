import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayMNTCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToFavourite from "../helpers/addToFavourite";
import { Link } from "react-router-dom";

const VerticalWorkSearch = ({ data = [], loading }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToInterestedWork } = useContext(Context);

  const handleAddToInterested = async (e, id) => {
    await addToFavourite(e, id);
    fetchUserAddToInterestedWork();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-2 md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? // Display loading placeholders if data is loading
          loadingList.map((_, index) => (
            <div
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              key={index}
            >
              {/* Loading state content */}
            </div>
          ))
        : // Render work items if data has been loaded
          data.map((work, index) => (
            <Link
              to={"/work/" + work?._id}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              onClick={scrollTop}
              key={index}
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={work?.workImage[0]}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {work?.workName}
                </h2>
                <p className="capitalize text-slate-500">{work?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {displayMNTCurrency(work?.sellingPrice)}
                  </p>
                </div>
                <button
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToInterested(e, work?._id)}
                >
                  Сонирхох
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalWorkSearch;
