import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Change URL as needed
const API_URL = process.env.REACT_APP_API_URL || "https://www.biotunes.app/";

function SuccessPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statType, setStatType] = useState("current-track");
  const [statData, setStatData] = useState(null);
  const [lastListenedData] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const location = useLocation();

  // function handles stat type changes
  const handleStatTypeChange = (e) => {
    setStatType(e.target.value);
  };

  // useEffect hook to clear copy success message after a few seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [copySuccess]);

  // useEffect hook for fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);
        try {
          const response = await axios.get(`${API_URL}/api/user`, {
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

  //useEffect hook for fetching stat data
  useEffect(() => {
    const fetchStatData = async () => {
      if (!user) return;

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://www.biotunes.app/api/${statType}`,
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

    // Set up polling for current-track
    let intervalId;
    if (statType === "current-track" && user) {
      intervalId = setInterval(fetchStatData, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user, statType]);

  const renderStatData = () => {
    if (!statData && statType !== "last-listened") return null;

    let resultText;
    switch (statType) {
      case "current-track":
        if (statData && statData.isPlaying) {
          resultText = `I'm listening to: ${statData.track} by ${statData.artist} (@biotunes)`;
        } else if (statData) {
          resultText = `I last listened to: ${statData.track} by ${statData.artist} (@biotunes)`;
        } else {
          resultText = "No current track information available.";
        }
        break;
      case "last-listened":
        if (lastListenedData) {
          resultText = `I last listened to: ${lastListenedData.track} by ${lastListenedData.artist} (@biotunes)`;
        } else {
          resultText = "No last listened track found.";
        }
        break;
      case "top-album":
        if (statData) {
          resultText = `My top album of the week: ${statData.album} by ${statData.artist} (@biotunes)`;
        } else {
          resultText = "No top album information available.";
        }
        break;
      case "top-track":
        if (statData) {
          resultText = `My top song of the week: ${statData.track} by ${statData.artist} (@biotunes)`;
        } else {
          resultText = "No top track information available.";
        }
        break;
      case "top-artist":
        if (statData) {
          resultText = `My top artist of the week: ${statData.artist} (@biotunes)`;
        } else {
          resultText = "No top artist information available.";
        }
        break;
      default:
        resultText = "No information available.";
    }

    if (resultText) {
      console.log(`%c${resultText}`, "color: blue; font-weight: bold;");
    }

    return resultText;
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
    <div className="min-h-screen bg-white px-8">
      <div className="relative isolate flex-grow">
        <div className="bg-white flex flex-col items-center justify-center min-h-screen">
          {/* Main Content */}

          <div className="p-8 bg-white rounded shadow-md ">
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
              {/* <option value="last-listened">Last List ened To</option> */}
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
            <div className="mt-2 flex flex-col items-center justify-center gap-x-6">
              <Link
                to="/instainfo"
                className="w-full sm:w-auto text-sm font-semibold leading-6 text-gray-900 text-center"
              >
                Why Can't I Link my Instagram Account?{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
