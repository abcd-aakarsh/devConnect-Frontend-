import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Toast from "../components/Toast";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const loggedInUser = useSelector((state) => state?.user.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/me/edit`, updates, {
        withCredentials: true,
      });

      setToast({
        message: res?.data.message,
        status: "success",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    }
  };
  useEffect(() => {
    setFirstName(loggedInUser?.firstName || "");
    setLastName(loggedInUser?.lastName || "");
    setExperienceLevel(loggedInUser?.experienceLevel || "STUDENT");
    setBio(loggedInUser?.bio || "");
    setSkills(loggedInUser?.interests || []);
  }, [loggedInUser]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };
  const updatedUser = {
    ...loggedInUser,
    firstName,
    lastName,
    bio,
    experienceLevel,
    interests: skills,
  };
  const updates = {
    firstName,
    lastName,
    bio,
    experienceLevel,
    interests: skills,
  };

  return (
    <div className="min-h-[90vh] flex lg:flex-row flex-col">
      {/* Left Section - Form */}
      <div className="flex-1  flex flex-col justify-center items-center p-4! md:px-10! gap-8">
        <div className="card w-full  max-w-2xl bg-base-100 shadow-sm p-4!">
          <h2 className=" text-xl lg:text-2xl font-bold text-center text-emerald-400 mb-2!">
            Edit Profile
          </h2>
          <p className="text-gray-400  text-center">
            Update your information and interests below.
          </p>
          <div className="card-body !w-full !p-10 py-4! flex flex-col gap-6">
            {/* First Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name:</legend>
              <input
                type="text"
                className="input w-full px-2!"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name:</legend>
              <input
                type="text"
                className="input w-full px-2!"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Experience Level */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Pick your experience level:
              </legend>
              <select
                defaultValue="STUDENT"
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="select px-2! appearance-none w-full"
              >
                <option>student</option>
                <option>junior</option>
                <option>mid</option>
                <option>senior</option>
                <option>lead</option>
              </select>
            </fieldset>

            {/* Bio */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Your bio (Max 200 characters)
              </legend>
              <textarea
                className="textarea px-2! py-1! h-24 w-full"
                placeholder="Bio"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                maxLength={200}
              ></textarea>
            </fieldset>

            {/* Skills / Interests */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Add your skills or interests
              </legend>

              {/* Input + Button */}
              <div className="flex gap-3! items-center">
                <input
                  type="text"
                  className="input px-2! w-full"
                  placeholder="e.g. React, Node.js"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-primary px-2! py-1!"
                >
                  Add
                </button>
              </div>

              {/* Skills Display */}
              <div className="flex flex-wrap gap-2! mt-4!">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-200 text-amber-900 px-3! py-1! rounded-full flex items-center gap-2! text-sm font-medium"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              onClick={handleSubmit}
              className="btn flex items-center gap-2 !px-4 !py-2 text-sm !rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Preview */}
      <div className="flex-1  flex justify-center  !p-6 ">
        <UserCard user={updatedUser} />
      </div>
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

export default EditProfile;
