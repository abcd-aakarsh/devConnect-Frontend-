import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../appStore/feedSlice/feedSlice.js";
import UserCard from "../components/UserCard.jsx";

const FeedPage = () => {
  const feed = useSelector((state) => state?.feed);
  const user = feed ? feed[0] : null;
  const [gotError, setGotError] = useState(false);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(res.data.data.users));
    } catch (error) {
      setGotError(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="min-h-[90vh]  text-white  flex">
      {/* LEFT — Feed Section */}
      <div className="md:w-[340px] lg:w-[380px] hidden   bg-gray-900 border-l border-gray-800 p-6 md:flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-gray-200">Connections</h2>

        <div className="space-y-4 overflow-y-auto flex-1">
          <div>
            <h3 className="text-sm text-gray-400 mb-2">💌 Match Requests</h3>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">No new requests</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-2">💬 Messages</h3>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">No messages yet</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-gray-400 mb-2">🤝 Your Matches</h3>
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">
                You haven’t matched with anyone yet
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT — Sidebar */}
      <div className="flex-1 flex justify-center items-center p-4!  border-r border-gray-800">
        {gotError ? (
          <p className="text-red-500">{gotError}</p>
        ) : user ? (
          <UserCard user={user} />
        ) : (
          <p className="text-gray-400">Loading feed...</p>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
