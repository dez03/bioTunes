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
  const [copySuccess, setCopySuccess] = useState(""); // Add state for copy success message
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
        ? `I'm listening to: ${statData.track} by ${statData.artist} (@biotunes)`
        : lastListenedData
        ? `I last listened to: ${lastListenedData.track} by ${lastListenedData.artist} (@biotunes)`
        : `I last listened to: ${statData.track} by ${statData.artist} (@biotunes)`; // Fallback to statData if lastListenedData is not available

    // case "last-listened":
    //   return lastListenedData
    //     ? `I last listened to: ${lastListenedData.track} by ${lastListenedData.artist}`
    //     : `I last listened to: ${statData.track} by ${statData.artist}`; // Fallback to statData

    case "top-album":
      return `My top album of the week: ${statData.album} by ${statData.artist} (@biotunes)`;
    case "top-track":
      return `My top song of the week: ${statData.track} by ${statData.artist} (@biotunes)`;
    case "top-artist":
      return `My top artist of the week: ${statData.artist} (@biotunes)`;
    default:
      return null;
  }
};




  const handleCopyToClipboard = () => {
    const textToCopy = renderStatData();
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess("You can now paste this into your bio!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
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
    <div className="relative isolate bg-white flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-65 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      {/* Middle Gradient */}
      <div
        className="absolute inset-x-0 top-[50%] -z-10 transform-gpu overflow-visible blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[-5rem] w-[20rem] h-[20rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="p-8 bg-white rounded shadow-md">
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome to bioTunes, {user.displayName}
        </h1>
        <select
          value={statType}
          onChange={handleStatTypeChange}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="current-track">Currently Listening</option>
          {/* <option value="last-listened">Last Listened</option> */}{" "}
          <option value="top-album">Top Album</option>
          <option value="top-track">Top Song</option>
          <option value="top-artist">Top Artist</option>
        </select>
        <p className="mb-4">{renderStatData()}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
          <button
            onClick={handleCopyToClipboard}
            className="rounded-md px-3.5 py-2.5 text-sm bg-yellow-500 hover:bg-yellow-600 font-semibold text-white shadow-sm transition duration-300 ease-in-out"
          >
            Copy to Clipboard 📋
          </button>
        </div>

        {/* Success Message */}
        <div className="flex flex-col items-center justify-center">
          {copySuccess && (
            <p className="mt-2 text-green-600 text-sm">{copySuccess}</p>
          )}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md px-3.5 py-2.5 text-sm bg-gray-400 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed"
          >
            Connect Instagram (Coming Soon... Maybe)
          </a>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default SuccessPage;
