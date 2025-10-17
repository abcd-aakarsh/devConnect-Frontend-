import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import Toast from "../components/Toast.jsx";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const acceptRequest = async (requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connections/accept/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setToast({
        message: "Request accepted successfully",
        status: "success",
      });
      setRequests(requests.filter((req) => req.connectionId !== requestId));
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    }
  };
  const rejectRequest = async (requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connections/reject/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setToast({
        message: "Request rejected successfully",
        status: "error",
      });
      setRequests(requests.filter((req) => req.connectionId !== requestId));
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    }
  };
  const getRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/requests/pending`, {
        withCredentials: true,
      });

      setRequests(res?.data?.data?.connections || []);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "An error occurred",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-500">
        Loading requests...
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] text-gray-400">
        No pending requests found.
      </div>
    );
  }

  return (
    <>
      <div className="p-4!">
        <h2 className="text-xl font-semibold mb-4!">Pending Requests</h2>
        <div className="flex flex-col bg-gray-900 gap-3!">
          {requests.map((req) => (
            <div
              key={req.user._id}
              className="border rounded-lg p-4! flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-medium">
                  {req.user.firstName} {req.user.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {req.user.bio || "No bio"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-success px-2!"
                  onClick={() => {
                    acceptRequest(req.connectionId);
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    rejectRequest(req.connectionId);
                  }}
                  className="btn btn-sm btn-error px-2!"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
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

export default Requests;
