import React from "react";
import { Link } from "react-router-dom";

export default function Example() {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:3001/auth/spotify"; // or update the live endpoint
  };

  return (
    <div className="bg-white min-h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="relative isolate flex-grow">
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
          className="absolute inset-x-0 top-[50%] -z-10 transform-gpu overflow-visible blur-3xl "
          aria-hidden="true"
        >
          <div
            className="relative left-[-5rem] w-[20rem] h-[20rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          ></div>
        </div>

        {/* Page Content */}
        <div className="px-6 pt-14 lg:px-8 flex flex-col min-h-screen">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 flex-grow flex flex-col justify-center">
            <div className="text-center">
              {/* Logo Image */}
              <div className="mb-8">
                <img
                  src="https://cdn.pixabay.com/photo/2013/07/13/12/16/note-159509_640.png" // Replace with actual path
                  alt="bioTunes Logo"
                  className="mx-auto w-48 h-48 object-contain"
                />
              </div>

              {/* Welcome Text */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to bioTunes
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Link your Spotify account and generate personalized bio updates
                based on your listening activity. Copy the generated text and
                paste it into your Instagram bio!
              </p>

              {/* Sign In Button */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 sm:gap-y-0">
                <button
                  onClick={handleSpotifyLogin}
                  className="w-fit-content sm:w-auto rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Sign in With Spotify
                </button>
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
    </div>
  );
}
