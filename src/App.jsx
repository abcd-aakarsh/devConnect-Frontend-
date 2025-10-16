import React, { useEffect, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FeedPage from "./pages/FeedPage";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./appStore/userSlice/userSlice";
import { BASE_URL } from "./utils/constants";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/navigation/ProtectedRoute";
import EditProfile from "./pages/EditProfile";
import DashboardLayout from "./components/layout/DashboardLayout";
import Messages from "./pages/Messages";

import Matches from "./pages/Matches";
import Requests from "./pages/Requests";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const loggedIn = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/me`, {
        withCredentials: true,
      });

      dispatch(setUser(res.data.data));
      return;
    } catch (error) {
      console.error("Error fetching user data:", error);
      dispatch(setUser(null));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loggedIn();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FeedPage />} />
            <Route path="messages" element={<Messages />} />
            <Route path="matches" element={<Matches />} />
            <Route path="requests" element={<Requests />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute loading={loading}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit"
            element={
              <ProtectedRoute loading={loading}>
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
