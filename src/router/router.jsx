import { createBrowserRouter } from "react-router";
import Layouts from "./../layouts/Layouts";
import Home from "./../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Chef from "./../pages/Chef";
import Contact from "./../pages/Contact";
import Gallery from "./../pages/Gallery";
import Shop from "./../pages/Shop";
import Blog from "./../pages/Blog";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Category from "./../pages/Category";
import { Navigate } from "react-router";
import CategoryItems from "./../components/CategoryItems";
import MenuContent from "../components/MenuContent";
import ShopDetails from "../components/ShopDetails";
import Carts from "../pages/Carts";
import AddMenu from "../pages/AddMenu";
import UpdateMenu from "./../pages/UpdateMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts></Layouts>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
        children: [
          {
            index: true,
            element: <Navigate to={"Breakfast"}></Navigate>,
          },
          {
            path: ":menuType",
            element: <MenuContent></MenuContent>,
          },
        ],
      },
      {
        path: "chefs",
        element: <Chef></Chef>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "shop",
        element: <Shop></Shop>,
      },
      {
        path: "shop/:id",
        element: <ShopDetails></ShopDetails>,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu></UpdateMenu>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menus?id=${params.id}`),
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "category",
        element: <Category></Category>,
        children: [
          {
            index: true,
            element: <Navigate to={"Sea Food"}></Navigate>,
          },
          {
            path: ":category",
            element: <CategoryItems></CategoryItems>, // Example of nested route
          },
        ],
      },
      {
        path: "cart",
        element: <Carts></Carts>,
      },
      {
        path: "add-menu",
        element: <AddMenu></AddMenu>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
