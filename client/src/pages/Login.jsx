import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
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
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="text-center  my-6">
          <h2 className="text-lg">
            Do not Have an Account?{" "}
            <span className="text-blue-500 font-semibold">
              <Link to="/sign-up"> Sign Up</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
