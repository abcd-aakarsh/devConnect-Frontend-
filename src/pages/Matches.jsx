import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import MatchCard from "../components/MatchCard.jsx";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMatches = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/matches`, {
        withCredentials: true,
      });

      setMatches(res?.data.data.connections || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-lg">
        Loading matches...
      </div>
    );
  }

  if (matches?.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        No matches found 😢
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <div key={match._id || match.id}>
          <MatchCard user={match} />
        </div>
      ))}
    </div>
  );
};

export default Matches;
