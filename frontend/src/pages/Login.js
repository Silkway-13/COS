import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToInterestedWork } =
    useContext(Context);
  // console.log("generalContext => ", generalContext.fetchUserDetails());

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!dataResponse.ok) {
        // If the response is not OK (status code other than 2xx), throw an error
        throw new Error("Failed to sign in");
      }

      const dataApi = await dataResponse.json();
      console.log(dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToInterestedWork();
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error, e.g., display an error message to the user
      toast.error("An error occurred while signing in");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 ">
        <div className="bg-gray-200 p-5 w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 justify-center mx-auto ">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Имэйл : </label>
              <div className="bg-gray-200 p-2 shadow-md rounded-2xl pl-4">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="имэйл хаягаа оруулна уу?"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Нууц үг : </label>
              <div className="bg-gray-200 p-2 shadow-md rounded-2xl pl-4 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="нууц үгээ оруулна уу?"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600 m-1"
              >
                Нууц үгээ мартсан уу?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-gray-200 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Нэвтрэх
            </button>
          </form>
          <p className="my-5">
            Та өмнө нь бүртгэлтэй байсан уу?
            <Link
              to={"/sign-up"}
              className="text-red-400 hover:text-red-700 hover:underline"
            >
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
