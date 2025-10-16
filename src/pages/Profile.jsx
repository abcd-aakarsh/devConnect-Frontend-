import React from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { NavLink } from "react-router";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="!p-6 !max-w-4xl !mx-auto">
      {/* Back to Feed */}
      <div className="mb-4!">
        <NavLink
          to={"/feed"}
          className="mb-4! !px-4 !py-2 text-sm !rounded-xl   text-emerald-500 hover:bg-emerald-600 hover:text-white  border-emerald-500 transition"
        >
          ← Back to Feed
        </NavLink>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center !px-4 !mb-6">
        <div>
          <h2 className="text-4xl font-bold text-emerald-400 mt-10">Profile</h2>
          <h3 className="text-xl font-semibold text-gray-300 mt-2">
            Manage your information
          </h3>
        </div>
        <NavLink
          to={"/edit"}
          className="btn flex items-center gap-2 !px-4 !py-2 text-sm !rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <CiEdit />
          Edit
        </NavLink>
      </div>

      {/* Profile Card */}
      <div className="backdrop-blur-3xl bg-gray-900/80 rounded-3xl !px-8 !py-6 shadow-lg border border-gray-700">
        <div className="mt-4 flex flex-col md:flex-row gap-8 !p-4 md:items-center">
          <div className="relative w-44 flex mx-auto! h-44">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Profile"
              className="w-44 h-44 rounded-full border-4 border-emerald-500 object-cover"
            />
            {/* Verify tick */}
            {user.verified && (
              <span className="absolute bottom-2 right-2 bg-emerald-500 text-white rounded-full p-1">
                ✅
              </span>
            )}
          </div>

          {/* User Info */}
          <div className="text-start! mt-4 flex-1">
            <p className="text-gray-400 font-semibold">Name</p>
            <p className=" text-white font-medium">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-gray-400 font-semibold mt-3">Email</p>
            <p className="text-white">{user?.email}</p>

            <p className="text-gray-400 font-semibold mt-3">Age</p>
            <p className="text-white">{user?.age || "Not provided"}</p>

            <p className="text-gray-400 font-semibold mt-3">Experience Level</p>
            <p className="text-amber-400 font-semibold">
              {user?.experienceLevel.charAt(0).toUpperCase() +
                user?.experienceLevel.slice(1)}
            </p>

            <p className="text-gray-400 font-semibold !mt-1">Interests</p>
            <div className="flex flex-wrap !gap-2 mt-2">
              {user.interests?.map((interest, idx) => (
                <span
                  key={idx}
                  className="!px-3 !py-1 rounded-full text-sm bg-cyan-700 font-medium text-white"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6 flex gap-4 bg-emerald-700/20 rounded-2xl !p-4 !px-6 items-center">
          <p className="text-white text-[16px] leading-snug">
            {user?.bio
              ? user?.bio
              : "No bio available. Click edit to add a bio."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
