import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import sign from "../../assets/signup.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { setUser } from "../../appStore/userSlice/userSlice";

const AppLayout = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = async () => {
    const res = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(setUser(null));
    navigate("/login");
  };
  useEffect(() => {
    loggedIn();
  }, []); // only run once

  const loggedIn = async () => {
    try {
      if (user) return; // prevent extra calls
      const res = await axios.get(`${BASE_URL}/profile/me`, {
        withCredentials: true,
      });
      if (res.data?.data) {
        dispatch(setUser(res.data.data));
      }
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${sign})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          zIndex: -1,
          top: 0,
          left: 0,
          opacity: 0.15,
        }}
      />

      <div className="min-h-screen flex flex-col ">
        <header className="navbar  shadow-md !px-4  !py-1 sm:!px-8">
          <NavLink to="/" className="flex items-center ">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 sm:h-16 rounded-2xl" />
              <span className="text-lg sm:text-2xl font-bold font-serif font-kode bg-gradient-to-r from-cyan-500 to-emerald-500 text-transparent bg-clip-text">
                DevConnect
              </span>
            </div>
          </NavLink>

          {!user && (
            <div className="ml-auto! flex justify-center items-center gap-4">
              <NavLink
                to="/login"
                className="px-4! py-1! text-sm sm:text-base font-semibold border-2 border-cyan-600 text-cyan-600 rounded-md hover:bg-gradient-to-r hover:from-cyan-600 hover:to-emerald-600 hover:text-white transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4! py-1! text-sm sm:text-base font-semibold rounded-md bg-gradient-to-r from-cyan-600 to-emerald-600 text-nowrap text-white shadow-md hover:opacity-90 transition"
              >
                Sign Up
              </NavLink>
            </div>
          )}
          {user && (
            <div className="ml-auto! flex items-center gap-2 relative group">
              <NavLink to="/profile">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                />
              </NavLink>
              <button
                className="px-2! items-center py-1! text-xs sm:text-sm font-semibold border-2 border-cyan-600 text-cyan-600 rounded-md hover:bg-gradient-to-r cursor-pointer hover:from-cyan-600 hover:to-emerald-600 hover:text-white transition"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 relative z-10 bg-transparent">
          <Outlet />
        </main>

        {/* Footer */}
        {/* <footer className="  footer-center text-base-content text-center !p-4">
          <aside>
            <p className="text-sm md:text-xl font-bold font-serif font-kode bg-gradient-to-r from-cyan-500 to-emerald-500 text-transparent bg-clip-text">
              Copyright © {new Date().getFullYear()} - All rights reserved by
              @abcd-aakarsh
            </p>
          </aside>
        </footer> */}
      </div>
    </>
  );
};

export default AppLayout;
