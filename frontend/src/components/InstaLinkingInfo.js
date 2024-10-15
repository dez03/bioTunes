import React from "react";
import { Link } from "react-router-dom";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-white px-8">
      <div className="relative isolate flex-grow">
        {/* Top Gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
        <div className="max-w-3xl py-16 mx-auto min-h-screen">
          <h1 className="text-2xl font-bold mb-6">
            Why Can't I Link My Instagram Account?
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            First off, thank you for checking out bioTunes.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            If you're wondering why you can't link your Instagram account yet,
            it's because of a few hurdles I've run into while building this
            project.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            One of the biggest roadblocks is Instagram's API. The Instagram
            Basic Display API, which I was using to enable this
            feature, is being shut down on December 4, 2024. The very tool I
            needed to connect Instagram accounts won't be available anymore.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            I’ve explored other options, but right now, the only way to update
            Instagram bios automatically is through the Instagram Graph API,
            which only works for business or creator accounts. Unfortunately,
            regular personal accounts can’t use this feature. I’m looking
            into ways to make it more accessible in the future, but for now, I
            had to pivot and allow users to copy and paste their bio updates
            manually.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            This has been a learning process, and I'm committed to making
            bioTunes as great as I can. I truly appreciate your patience and
            support as I deal with Instagram's amazing service. The vision is
            still there, and I’m working hard to figure out how to make it a
            reality for everyone!
          </p>
          <p className="text-gray-600 text-lg mb-4">
            For those up for the challenge, I will make the original terminal-based version of
            bioTunes public. However, please keep in mind that it's not exactly
            user-friendly for most people. The terminal version requires some
            basic knowledge of coding and using the command line. You’d need to
            download the repo, set up the environment, and run it manually from
            your computer. So, unless you’re familiar with how to work with
            code, this version might not be the easiest to use. But if you're curious, feel free to check it out!
          </p>
          {/* Signature at the bottom */}
          <div className="mt-8 text-right">
            <p className="text-lg font-semibold text-gray-700">-Aviel</p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-indigo-600 bg-white 
                border-indigo-600 outline outline-2 outline-indigo-600 
               outline-offset-2 shadow-sm hover:bg-indigo-600 hover:text-white 
               transition-colors duration-200 ease-in-out"
            >
              &larr; Go Back
            </Link>
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
