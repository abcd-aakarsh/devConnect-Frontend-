import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../appStore/feedSlice/feedSlice.js";
import UserCard from "../components/UserCard.jsx";
import Toast from "../components/Toast.jsx";
const FeedPage = () => {
  const feed = useSelector((state) => state?.feed);
  const user = feed ? feed[0] : null;
  const [gotError, setGotError] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(res.data.data.users));
    } catch (error) {
      setGotError(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading matches...
      </div>
    );
  }
  if (feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        No more users in feed 😢
      </div>
    );
  }
  return (
    <>
      <div className="flex-1 flex justify-center items-center p-4!  border-r border-gray-800">
        {gotError ? (
          <p className="text-red-500">{gotError}</p>
        ) : user ? (
          <UserCard user={user} />
        ) : (
          <p className="text-gray-400">Loading feed...</p>
        )}
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

export default FeedPage;
