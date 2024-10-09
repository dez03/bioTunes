import React from "react";

function LandingPage() {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:3001/auth/spotify";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome to bioTunes
        </h1>
        <button
          onClick={handleSpotifyLogin}
          className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
        >
          Sign in with Spotify
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
