import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassowrd";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllWorks from "../pages/AllWorks";
import CategoryWork from "../pages/CategoryWork";
import WorkDetails from "../pages/WorkDetails";
import Favourite from "../pages/Favourite";
import SearchWork from "../pages/SearchWork";
import About from "../pages/About";
import AllOrders from "../pages/AllOrders";
import AllTasks from "../pages/AllTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/work-category",
        element: <CategoryWork />,
      },
      {
        path: "/work/:id",
        element: <WorkDetails />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
      {
        path: "/search",
        element: <SearchWork />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllWorks />,
          },
          {
            path: "all-orders",
            element: <AllOrders />,
          },
          {
            path: "all-tasks",
            element: <AllTasks />,
          },
        ],
      },
    ],
  },
]);

export default router;
