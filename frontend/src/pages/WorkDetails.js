import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import addToFavourite from "../helpers/addToFavourite";
import displayMNTCurrency from "../helpers/displayCurrency";
import CategoryRecommendedWorkDisplay from "../components/CategoryRecommendedWorkDisplay";
import Context from "../context";
import UserOrderReq from "../components/UserOrderReq";

const WorkDetails = () => {
  const [openOrderRequest, setOpenOrderRequest] = useState(false);
  const [data, setData] = useState({
    workName: "",
    category: "",
    workImage: [],
    niitHemjee: "",
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const workImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToInterestedWork } = useContext(Context);

  const navigate = useNavigate();

  const fetchWorkDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.workDetails.url}?workId=${params?.id}`,
        {
          method: SummaryApi.workDetails.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workId: params?.id }),
        }
      );
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.workImage[0]);
    } catch (error) {
      console.error("Error fetching work details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkDetails();
  }, [params]);

  const handleMouseEnterWork = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToFavourite = async (e, id) => {
    await addToFavourite(e, id);
    fetchUserAddToInterestedWork();
  };

  const handleBuyProduct = async (e, id) => {
    // await addToFavourite(e, id);
    // fetchUserAddToInterestedWork();
    // navigate("/favourite");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/***WORK Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/**WORK zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {workImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.workImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterWork(imgURL)}
                        onClick={() => handleMouseEnterWork(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/***work details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
              <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.workName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayMNTCurrency(data.sellingPrice)}
              </p>
              {/* <p className="text-slate-400 line-through">
                {displayMNTCurrency(data.price)}
              </p> */}
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={() => setOpenOrderRequest(true)}
              >
                Ажил хийх
              </button>

              {/* <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                onClick={(e) => handleAddToFavourite(e, data?._id)}
              >
                Сонирхох
              </button> */}
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {openOrderRequest && (
        <UserOrderReq onClose={() => setOpenOrderRequest(false)} />
      )}

      {data.category && (
        <CategoryRecommendedWorkDisplay
          category={data?.category}
          heading={"Санал болгож буй ажлууд"}
        />
      )}
    </div>
  );
};

export default WorkDetails;
