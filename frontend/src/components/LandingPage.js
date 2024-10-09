// import React from "react";

// function LandingPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//       <div className="p-8 bg-white rounded-lg shadow-xl max-w-md">
//         <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">
//           Welcome to bioTunes
//         </h1>
//         <p className="mb-6 text-center text-gray-600">
//           This project is still in development. You'll soon be able to sign in
//           with Spotify and enjoy all the features we're working on!
//         </p>
//         <button
//           disabled
//           className="w-full px-4 py-2 font-bold text-white bg-gray-400 cursor-not-allowed rounded-lg"
//         >
//           Sign in with Spotify (Coming Soon)
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;


import React from "react";

// localhost landing page

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
