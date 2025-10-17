import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants.js";
import Toast from "./Toast.jsx";
import { removeUserFromFeed } from "../appStore/feedSlice/feedSlice.js";
const UserCard = ({ user }) => {
  const loggedInUser = useSelector((state) => state?.user.user);
  const [toast, setToast] = useState(null);
  const dispatch = useDispatch();
  const colors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
  const getRandomColor = (i) => colors[i % colors.length];
  const userExperienceLevel = user?.experienceLevel?.toUpperCase() || "STUDENT";
  const onSendRequest = async (toUser) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connections/request/${toUser}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUserFromFeed(toUser));

      setToast({ status: "success", message: "Request sent successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: error?.message || "Failed to send request.",
      });
    }
  };
  const onPass = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connections/pass/${user?.id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUserFromFeed(user?.id));
      setToast({ status: "success", message: "User passed successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: error?.message || "Failed to pass user.",
      });
    }
  };

  return (
    <div className="w-full! max-w-sm! h-fit bg-gray-900! rounded-2xl! shadow-xl! border border-gray-800 p-8! flex flex-col items-center! transition-all! duration-200 hover:shadow-2xl hover:border-gray-700">
      {/* Avatar */}
      <div className="relative w-28! h-28!">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt={user?.firstName || "User"}
          className="w-28! h-28! rounded-full! border-4! border-emerald-500! object-cover! shadow-md!"
        />
        {user?.verified && (
          <span className="absolute bottom-1.5! right-1.5! bg-emerald-500! text-white! rounded-full! p-1.5! text-xs! shadow-sm!">
            ✅
          </span>
        )}
      </div>

      {/* Name & Experience */}
      <h2 className="mt-5! text-xl! font-semibold! text-white text-center!">
        {user?.firstName || "Unknown"} {user?.lastName || ""}
      </h2>
      <p className="text-gray-400! text-sm! mt-1!">{userExperienceLevel}</p>

      {/* Interests */}
      {user?.interests?.length > 0 && (
        <div className="flex! flex-wrap! justify-center! gap-2! mt-4!">
          {user.interests.map((interest, idx) => (
            <span
              key={idx}
              className="px-3! py-1.5! rounded-full! text-xs! font-medium! text-white shadow-sm!"
              style={{ backgroundColor: getRandomColor(idx) }}
            >
              {interest}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      {user?.bio && (
        <p className="mt-4! text-sm! text-gray-300! text-center! leading-relaxed! px-2!">
          {user.bio}
        </p>
      )}

      {/* CTA Buttons */}
      {user?.id === loggedInUser?.id ? null : (
        <div className="flex gap-4! mt-8! w-full">
          <button
            onClick={onPass}
            className="flex-1! py-2.5! rounded-xl! bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm! font-medium transition-colors duration-200"
          >
            Pass
          </button>
          <button
            onClick={() => {
              onSendRequest(user?.id);
            }}
            className="flex-1 py-2.5! rounded-xl! bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors duration-200"
          >
            Send Request
          </button>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default UserCard;
