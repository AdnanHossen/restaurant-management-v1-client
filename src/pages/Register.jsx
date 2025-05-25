import React from "react";
import { Link, useNavigate } from "react-router";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { GoLink } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "./../hooks/useAuth";
import { getAuthErrorSeverity, getAuthToastMessage } from "../hooks/useError";
import getToast from "../hooks/useToast";

const Register = () => {
  // values from context
  const { registerUser } = useAuth();

  // navigation
  const navigate = useNavigate();

  // handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //   get all the form data
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { name, profileImg, email, password } = values;
    console.log(name, profileImg, email, password);

    //   handle register user
    try {
      const userCredentials = await registerUser(email, password);
      console.log(userCredentials?.user);

      // reset form
      e.target.reset();

      // success toast
      //   toast.success("successfully registered your account", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });

      // show toast
      getToast("success", "Successfully registered into your account");

      // redirect to home
      navigate("/");
    } catch (error) {
      const message = getAuthToastMessage(error);
      const severity = getAuthErrorSeverity(error);

      //   toast[severity](message, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });

      // show toast
      getToast(severity, message);
    }
  };

  // return the code
  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        {/* title */}
        <h1 className="text-center font-bold">Register To Your Account</h1>

        {/* user name */}
        <div className="">
          <legend className="fieldset-legend">User Name</legend>
          <label className="input validator">
            <FaRegUser className="h-[1em] opacity-50" />
            <input
              type="text"
              required
              name="name"
              placeholder="Username"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
            />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br />
            containing only letters, numbers or dash
          </p>
        </div>
        {/* user name */}

        {/* profile url */}
        <div className="">
          <legend className="fieldset-legend">Profile Pic</legend>
          <label className="input validator">
            <GoLink className="h-[1em] opacity-50" />
            <input
              type="url"
              required
              name="profileImg"
              placeholder="enter img url"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              title="Must be valid URL"
            />
          </label>
          <p className="validator-hint hidden">Must be valid URL</p>
        </div>
        {/* profile url end */}

        {/* email */}
        <div className="">
          <legend className="fieldset-legend">Email</legend>
          <label className="input validator">
            <MdOutlineMail className="h-[1em] opacity-50" />
            <input
              type="email"
              name="email"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
        </div>
        {/* email end */}

        {/* password  */}
        <div className="">
          <legend className="fieldset-legend">Password</legend>
          <label className="input validator">
            <IoKeyOutline className="h-[1em] opacity-50" />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              minlength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 6 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
        </div>
        {/* password end */}

        {/* submit button */}
        <div className="">
          <button className="btn btn-outline w-full">
            <input type="submit" value="Register" />
          </button>
        </div>
        {/* submit button */}

        {/* Google */}
        <div className="text-center mb-4">
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <FcGoogle className=" w-[16px] h-[16px] " />
            Login with Google
          </button>
        </div>
        {/* google login */}

        {/* already have an account then re-direct */}
        <div className="text-center">
          <p className="text-sm">
            Already Have an Account?{" "}
            <span className="link link-hover">
              <Link to={"/login"}>Login</Link>
            </span>{" "}
          </p>
        </div>
        {/* re-direct */}
      </form>
    </div>
  );
};

export default Register;
