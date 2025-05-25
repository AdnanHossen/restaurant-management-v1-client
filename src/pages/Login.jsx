import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { getAuthErrorSeverity, getAuthToastMessage } from "../hooks/useError";
import getToast from "../hooks/useToast";

const Login = () => {
  // context value
  const { loginUser } = useAuth();

  // navigation
  const navigate = useNavigate();

  // location state
  const location = useLocation();
  const from = location?.state || "/";

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    //   get all the input value
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { email, password } = values;
    console.log(values);

    //   handle login implementation
    try {
      const userCredentials = await loginUser(email, password);
      console.log(userCredentials?.user);

      // reset form
      e.target.reset();

      // show toast
      getToast("success", "Successfully logged in into your account");

      // success and redirect
      navigate(from);
    } catch (error) {
      const message = getAuthToastMessage(error);
      const severity = getAuthErrorSeverity(error);

      //   show toast
      getToast(severity, message);
    }
  };

  // return
  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold">Login To Your Account</h1>

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
              required
              name="password"
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
            <input type="submit" value="Login" />
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

        {/* if no account then re-direct */}
        <div className="text-center">
          <p className="text-sm">
            Don't Have an Account?{" "}
            <span className="link link-hover">
              <Link to={"/register"}>Register</Link>
            </span>{" "}
          </p>
        </div>
        {/* if no account then re-direct */}
      </form>
    </div>
  );
};

export default Login;
