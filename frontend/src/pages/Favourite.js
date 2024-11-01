import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayMNTCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";

const Favourite = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingFavourite = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.favouriteViewWork.url, {
      method: SummaryApi.favouriteViewWork.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log("responseData => ", responseData.data);

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateInterestedWork.url, {
      method: SummaryApi.updateInterestedWork.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateInterestedWork.url, {
        method: SummaryApi.updateInterestedWork.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteFavouriteWork = async (id) => {
    const response = await fetch(SummaryApi.deleteInterestedWork.url, {
      method: SummaryApi.deleteInterestedWork.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToInterestedWork();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.workId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view work */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingFavourite?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Favourite Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((work, index) => (
                <div
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px]
                  md:max-w-[320px] bg-white rounded-sm shadow"
                  onClick={scrollTop}
                  key={index}
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    {work?.workImage && work.workImage[0] && (
                      <img
                        src={work.workImage[0]}
                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      />
                    )}
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {work?.workName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {work?.category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayMNTCurrency(work?.sellingPrice)}
                      </p>
                    </div>
                    <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">
                      Сонирхох
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Тоо хэмжээ</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Нийт үнэ</p>
                <p>{displayMNTCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 text-white w-full mt-2">
                Гэрээ хийх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourite;

{
  /* 
data.map((work, index) => {
                console.log("work --> ", work);
                return (
                  <div
                    key={work?._id + "Add To Favourite Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={work?.workId?.workImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete work */
}
//         <div
//           className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
//           onClick={() => deleteFavouriteWork(work?._id)}
//         >
//           <MdDelete />
//         </div>

//         <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
//           {work?.workId?.workName}
//         </h2>
//         <p className="capitalize text-slate-500">
//           {work?.workId?.category}
//         </p>
//         <div className="flex items-center justify-between">
//           <p className="text-red-600 font-medium text-lg">
//             {displayMNTCurrency(work?.workId?.sellingPrice)}
//           </p>
//           <p className="text-slate-600 font-semibold text-lg">
//             {displayMNTCurrency(
//               work?.workId?.sellingPrice * work?.quantity
//             )}
//           </p>
//         </div>
//         <div className="flex items-center gap-3 mt-1">
//           <button
//             className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
//             onClick={() => decraseQty(work?._id, work?.quantity)}
//           >
//             -
//           </button>
//           <span>{work?.quantity}</span>
//           <button
//             className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
//             onClick={() => increaseQty(work?._id, work?.quantity)}
//           >
//             +
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// })} */}
