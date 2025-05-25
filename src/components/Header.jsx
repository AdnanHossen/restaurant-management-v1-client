import React from "react";
import { Link, NavLink } from "react-router";
import { GrRestaurant } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import { getAuthErrorSeverity, getAuthToastMessage } from "../hooks/useError";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";
import Loading from "./Loading";

const Header = () => {
  // context
  const { user, logOutUser } = useAuth();
  const { cart, isLoading } = useCart();
  const { menuItems } = cart;
  console.log(menuItems);

  // routes
  const links = (
    <>
      <li>
        <NavLink to={"/menu"} className="text-base md:text-lg lg:text-xl">
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink to={"/shop"} className="text-base md:text-lg lg:text-xl">
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink to={"/chefs"} className="text-base md:text-lg lg:text-xl">
          Chef
        </NavLink>
      </li>
      <li>
        <NavLink to={"/gallery"} className="text-base md:text-lg lg:text-xl">
          Gallery
        </NavLink>
      </li>
      <li>
        <NavLink to={"/blog"} className="text-base md:text-lg lg:text-xl">
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to={"/contact"} className="text-base md:text-lg lg:text-xl">
          Contact
        </NavLink>
      </li>{" "}
      <li>
        <NavLink to={"/category"} className="text-base md:text-lg lg:text-xl">
          Category
        </NavLink>
      </li>
    </>
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  // handleLogout
  const handleLogOut = async () => {
    try {
      await logOutUser();
    } catch (error) {
      const message = getAuthToastMessage(error);
      const severity = getAuthErrorSeverity(error);

      // if it exists
      toast[severity](message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // return
  return (
    <div className="navbar px-2 sm:px-4 md:px-8 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-7 md:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-44 sm:w-52 p-2 shadow text-base"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-lg sm:text-xl md:text-2xl flex items-center gap-2">
          <GrRestaurant className="text-xl md:text-2xl" />
          <span className="hidden sm:inline">Restaurant</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item text-xs md:text-sm">
                  {menuItems?.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-44 sm:w-52 shadow"
            >
              <div className="card-body">
                <span className="text-base font-bold">
                  {menuItems?.length} Items
                </span>
                <span className="text-info text-sm">
                  Subtotal:{" "}
                  {menuItems?.reduce((acc, item) => acc + item.price, 0)}{" "}
                </span>
                <div className="card-actions">
                  <Link
                    className="btn btn-primary btn-block text-base"
                    to={"/cart"}
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-44 sm:w-52 p-2 shadow text-base space-y-2"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to={"/add-menu"} className="btn btn-outline">
                    Add Menu
                  </Link>
                </li>
                <li>
                  <button className="btn btn-outline" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <div className="">
                <button className="btn btn-outline">
                  <Link to={"/login"}>Login</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
