import React, { useEffect, useState } from "react";
import login from "../assets/login.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { setUser } from "../appStore/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.data));
      navigate("/feed");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);
  return (
    <div className="flex  justify-center px-4! items-center w-full min-h-screen bg-gray-900">
      {/* Card */}
      <div className="card card-side bg-gray-600 shadow-xl overflow-hidden! shadow-emerald-500/30 max-w-4xl w-full">
        {/* Left: Image */}
        <figure className="w-1/2 hidden! sm:flex! bg-gray-900">
          <img
            src={login}
            alt="Login Illustration"
            className="object-cover h-full w-full"
          />
        </figure>

        {/* Right: Form */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center p-8! bg-gray-900 border-t border-gray-800 text-white">
          <h2 className="text-2xl sm:text-start text-center font-bold mb-3! bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Welcome Back! <span className="text-white ml-1">😎</span>
          </h2>
          <p className="mb-6! bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent sm:text-start text-center">
            We're glad to see you again. Please login to your account.
          </p>

          {/* Email */}
          <label className="form-control w-full mb-4!">
            <div className="label">
              <span className="label-text text-white mb-1!">Email</span>
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2!"
            />
          </label>

          {/* Password */}
          <label className="form-control w-full mb-6! relative">
            <div className="label">
              <span className="label-text text-white mb-1!">Password</span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2! pr-10"
            />
            {/* Eye toggle (centered, persists while typing) */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()} // keep input focus
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 top-7! flex items-center text-emerald-400 hover:text-emerald-300 focus:outline-none z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye OFF (eye + slash)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
                  <circle cx="12" cy="12" r="3.5" />
                  <line x1="4" y1="4" x2="20" y2="20" strokeLinecap="round" />
                </svg>
              ) : (
                // Eye ON
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              )}
            </button>
          </label>
          {error && <p className="text-red-500 !mb-4">*** {error}</p>}
          <button
            className="btn bg-gradient-to-r from-cyan-400 to-emerald-400 text-white shadow-xl hover:shadow-emerald-500/30 transition duration-300 ease-out w-full mb-3!"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <NavLink to="/signup" className="text-emerald-400 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
