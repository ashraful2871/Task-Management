import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import login from "../../public/login.json";
import { FcGoogle } from "react-icons/fc";
const SignUpPAge = () => {
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mb-6">Please enter your details</p>

          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Accept trams &
              condition
            </label>
          </div>

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Sign in
          </button>

          <div className="flex items-center my-4">
            <div className="border-b w-full"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="border-b w-full"></div>
          </div>

          <button className="w-full flex items-center justify-center border py-3 rounded-lg hover:bg-gray-100 transition text-lg font-semibold">
            <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
          </button>

          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPAge;
