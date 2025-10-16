import React from "react";

const MatchCard = ({ user }) => {
  return (
    <div className="w-full!">
      {" "}
      <div className="w-full! md:max-w-96 h-fit bg-gray-900! rounded-2xl! shadow-xl! gap-4! border border-gray-800 p-8! flex items-center!! transition-all! duration-200 hover:shadow-2xl hover:border-gray-700 cursor-pointer">
        {/* Avatar */}
        <div className="relative w-20! h-20!">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt={user?.firstName || "User"}
            className="w-20! h-20! rounded-full! border-4! border-emerald-500! object-cover! shadow-md!"
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
      </div>
    </div>
  );
};

export default MatchCard;
