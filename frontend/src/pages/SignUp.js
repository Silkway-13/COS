import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePicture: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      // toast alert
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4 ">
        <div className="bg-gray-200 p-5 w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 justify-center mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePicture || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-gray-300 bg-opacity-80 pt-1 pb-6 text-center absolute bottom-0 left-0 w-full cursor-pointer">
                  зураг оруулах
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPicture}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Хэрэглэгчийн нэр : </label>
              <div className="bg-gray-200 p-2 shadow-md rounded-2xl pl-4">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="нэрээ оруулна уу?"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Имэйл : </label>
              <div className="bg-gray-200 p-2 shadow-md rounded-2xl pl-4">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="имэйл хаягаа оруулна уу?"
                  onChange={handleOnChange}
                  required
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
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Нууц үгээ дахин оруулах:</label>
              <div className="bg-gray-200 p-2 shadow-md rounded-2xl pl-4 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="нууц үгээ оруулна уу?"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-gray-200 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Бүртгүүлэх
            </button>
          </form>
          <p className="my-5">
            Та аль хэдийн бүртгэлтэй байсан уу?
            <Link
              to={"/login"}
              className="text-red-400 hover:text-red-700 hover:underline"
            >
              Нэвтрэх
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
