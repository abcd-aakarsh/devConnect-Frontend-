import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import sign from "../assets/sign.png";
import { useSelector } from "react-redux";
import Toast from "../components/Toast";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        dob,
        password,
      });

      setToast({
        message: "Signup successful! Redirecting to login...",
        status: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response.data.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex justify-center px-4! items-center w-full min-h-screen bg-gray-900">
        {/* Card */}
        <div className="card card-side bg-gray-600 shadow-xl overflow-hidden shadow-emerald-500/30 max-w-4xl w-full">
          {/* Right: Form */}
          <div className="w-full! md:w-1/2! flex flex-col justify-center p-8! bg-gray-900 border-t border-gray-800 text-white">
            <h2 className="text-2xl md:text-start text-center font-bold mb-3! bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Create an Account <span className="text-white ml-1">✨</span>
            </h2>
            <p className="mb-6! bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent md:text-start text-center">
              Join us today! Fill in the details below to sign up.
            </p>

            {/* First Name */}
            <label className="form-control w-full mb-4!">
              <div className="label">
                <span className="label-text text-white mb-1!">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2!"
              />
            </label>

            {/* Last Name */}
            <label className="form-control w-full mb-4!">
              <div className="label">
                <span className="label-text text-white mb-1!">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2!"
              />
            </label>
            <label className="form-control w-full mb-4!">
              <div className="label">
                <span className="label-text text-white mb-1!">D.O.B.</span>
              </div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2!"
              />
            </label>

            {/* Email */}
            <label className="form-control w-full mb-4!">
              <div className="label">
                <span className="label-text text-white mb-1!">Email</span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered ring-1 ring-emerald-500 focus:ring-2 focus:ring-emerald-400 w-full px-2! pr-10!"
              />
              {/* Eye toggle */}
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3! top-7! flex items-center text-emerald-400 hover:text-emerald-300 focus:outline-none z-10"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
            {/* CTA Button */}
            <button
              className="btn mb-3! bg-gradient-to-r from-cyan-400 to-emerald-400 text-white shadow-xl hover:shadow-emerald-500/30 transition duration-300 ease-out w-full"
              onClick={handleSubmit}
            >
              Signup
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <NavLink to="/login" className="text-emerald-400 hover:underline">
                Login
              </NavLink>
            </p>
          </div>

          {/* Left: Image */}
          <figure className="w-1/2! hidden! md:flex! bg-gray-900">
            <img
              src={sign}
              alt="Signup Illustration"
              className="object-cover h-full w-full"
            />
          </figure>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Signup;
