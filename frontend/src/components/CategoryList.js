import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryWork, setCategoryWork] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(9).fill(null);

  const fetchCategoryWork = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryWork.url);
    const dataResponse = await response.json();
    setLoading(false);

    setCategoryWork(dataResponse.data);
  };
  useEffect(() => {
    fetchCategoryWork();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 md:gap-5 justify-around overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-20 md:w-32 md:h-20 overflow-hidden bg-slate-200 animate-pulse p-2"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryWork.map((work, index) => {
              return (
                <Link
                  to={"/work-category?category=" + work?.category}
                  className="cursor-pointer my-4"
                  key={work?.category}
                >
                  <div className="border-[2px] border-gray-600 w-20 h-16 md:w-36 md:h-20 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex items-center justify-center shadow-md shadow-gray-500">
                    <img
                      src={work?.workImage[0]}
                      alt={work.category}
                      className="w-full h-full rounded-lg object-scale-down mix-blend-multiply hover:scale-150 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {work?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
