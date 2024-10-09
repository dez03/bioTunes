import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";

function SuccessPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statType, setStatType] = useState("current-track");
  const [statData, setStatData] = useState(null);
  const [lastListenedData, setLastListenedData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);
        try {
          const response = await axios.get("http://localhost:3001/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data. Please try logging in again.");
        }
      } else {
        setError("No token found. Please try logging in again.");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [location]);

  useEffect(() => {
    const fetchStatData = async () => {
      if (!user) return;

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3001/api/${statType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(`${statType} data:`, response.data);
        setStatData(response.data);
      } catch (error) {
        console.error(
          `Error fetching ${statType} data:`,
          error.response ? error.response.data : error.message
        );
        setError(
          `Failed to fetch ${statType} data. ${
            error.response ? error.response.data.details : error.message
          }`
        );
      }
    };


    fetchStatData();
  }, [user, statType]);

  const handleStatTypeChange = (e) => {
    setStatType(e.target.value);
  };

  const renderStatData = () => {
    if (!statData) return null;

    switch (statType) {
      case "current-track":
        return statData.isPlaying
          ? `I'm currently listening to: ${statData.track} by ${statData.artist}`
          : lastListenedData
          ? `I last listened to: ${lastListenedData.track} by ${lastListenedData.artist}`
          : "I haven't listened to any music recently"; //TODO add how long its been since last listened to music
      case "last-listened":
        return lastListenedData
          ? `I last listened to: ${lastListenedData.track} by ${lastListenedData.artist}`
          : "I haven't listened to any music recently";
      case "top-album":
        return `My top album last week was: ${statData.album} by ${statData.artist}`;
      case "top-track":
        return `My top song last week was: ${statData.track} by ${statData.artist}`;
      case "top-artist":
        return `My top artist last week was: ${statData.artist}`;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome, {user.displayName}!
        </h1>
        <select
          value={statType}
          onChange={handleStatTypeChange}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="current-track">Currently Listening</option>
          <option value="last-listened">Last Listened</option>
          <option value="top-album">Top Album</option>
          <option value="top-track">Top Song</option>
          <option value="top-artist">Top Artist</option>
        </select>
        <p className="mb-4">{renderStatData()}</p>
        <button
          onClick={() => console.log("Instagram login not implemented yet")}
          className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          Connect Instagram
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;


//comment to push