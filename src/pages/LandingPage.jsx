import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const LandingPage = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="relative flex justify-center items-center min-h-[81vh]  overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/80 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-500/80 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6 gap-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400  bg-clip-text text-transparent">
          Welcome to DevConnect
        </h1>

        <p className="text-lg md:text-xl text-gray-300">
          Connect, Collaborate, and Build with Developers Worldwide 🚀
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-2">
          <Link
            to={user ? "/feed" : "/login"}
            className="btn text-lg px-6! font-semibold  bg-gradient-to-r from-cyan-700 to-emerald-400  text-white shadow-xl hover:scale-105 hover:shadow-emerald-500/30 transition duration-300 ease-out"
          >
            Get Started
          </Link>
          <span className="text-sm text-gray-400">It’s free to join 🎉</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
