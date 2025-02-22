import Lottie from "lottie-react";
import login from "../../public/login.json";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
  const { signInUser, googleLogin, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const userData = { email, password };
    console.log(userData);

    //signIn User
    signInUser(email, password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error.message));
  };
  //google login
  const handleGoogleSignUP = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          userId: result?.user?.uid,
        };
        axios.post(`${import.meta.env.VITE_API_URL}/user-info`, userInfo);
        // console.log(data);
        navigate(location?.state ? location.state : "/");
        toast.success("sign up successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="flex h-[800px]">
      {/* Left Side - Login Form */}
      <div className="w-1/2 bg-purple-50 flex items-center justify-center">
        <div className="relative w-96">
          <Lottie animationData={login} loop={true} />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome back
          </h1>
          <p className="text-gray-500 mb-6 text-center">
            Please enter your details
          </p>

          {/* ✅ Form Starts Here */}
          <form
          //onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                //value={formData.email}
                //onChange={handleChange}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                //value={formData.password}
                //onChange={handleChange}
                className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  //checked={formData.rememberMe}
                  //onChange={handleChange}
                  className="mr-2"
                />
                Remember for 30 days
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold text-base"
            >
              Sign in
            </button>
          </form>
          {/* ✅ Form Ends Here */}

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            onClick={handleGoogleSignUP}
            className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
          >
            <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
          </button>

          <p className="mt-4 text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
