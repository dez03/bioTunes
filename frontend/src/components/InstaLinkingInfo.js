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
          <h1 className="text-3xl font-bold mb-6">
            Why Can't I Link My Instagram Account?
          </h1>
          <div className="text-gray-600 text-lg mb-6">
            <p className="mb-4">
              First off, thank you for checking out bioTunes. Your interest and
              support mean a lot!
            </p>

            <p className="mb-4">
              If you're wondering about linking your Instagram account, I want
              to explain why this feature isn't available and share some
              important updates about the project.
            </p>

            <h2 className="text-2xl text-black font-semibold mb-3">
              The Instagram Challenge
            </h2>
            <p className="mb-4">
              Instagram is an especially unforgiving platform for third-party
              apps like bioTunes. Their systems are designed to prevent
              automated logins and bio updates, which is exactly what bioTunes
              needed to do. But despite my efforts at working round these
              limitations, I realized that scaling this feature could
              potentially put users' accounts in danger of being flagged or
              banned by Instagram.{" "}
              <a
                href="https://www.swebdevelopment.com/instagram-api-sucks/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read more about Instagram's API limitations here
              </a>
              .
            </p>

            <h2 className="text-black text-2xl font-semibold mb-3">
              API Changes and Limitations
            </h2>
            <p className="mb-4">
              The Instagram Basic Display API, which was needed for this
              project, is being discontinued on December 4, 2024. The
              alternative, Instagram Graph API, is limited to business or
              creator accounts, making it inaccessible for most users anyways.
              And use of that API is meant for businesses, not independent
              developers like myself.
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-black">
              Pivoting bioTunes
            </h2>
            <p className="mb-4">
              Given these challenges, I've decided to pivot bioTunes. Instead of
              automatic Instagram updates, I now made it easy for you to
              manually copy and paste your bio updates. This approach is not
              ideal, but you can still showcase your music tastes without
              risking your Instagram account.
            </p>

            <h2 className="text-black text-2xl font-semibold mb-3">
              bioTunes as a Public Archive
            </h2>
            <p className="mb-4">
              Because of all the limitations I faced, I decided to make bioTunes
              a public archive. This means that I will no longer be maintaining
              or updating this project but anyone can still use it and access
              the code. It's my way of ensuring that the core idea of bioTunes
              lives on and remains accessible to everyone who wants to use it.
            </p>

            <h2 className="text-black text-2xl font-semibold mb-3">
              Release of Terminal Version (The OG)
            </h2>
            <p className="mb-4">
              The working version you all saw on my Instagram story, will now be
              avalible to use for those comfortable with coding and
              command-line. I'll be making the original terminal-based version
              of bioTunes public. This version requires you to have an IDE like
              Visual Studio Code installed to set up and run, but it offers a
              glimpse into the project's roots. If you're up for a bit of a
              challenge, feel free to check it out!
            </p>

            <h2 className="text-black text-2xl font-semibold mb-3">
              Future Plans
            </h2>
            <p className="mb-4">
              Looking ahead, I'm exploring the possibility of bringing bioTunes
              to Twitter. This platform offers different opportunities and
              challenges, and I'm excited about the potential to integrate your
              music tastes with your tweets. Stay tuned for updates on this new
              direction!
            </p>

            <h2 className="text-2xl font-semibold mb-3 text-black ">
              Thank You
            </h2>
            <p className="mb-4">
              Your interest and support have been incredible motivators
              throughout this journey. While the project has evolved from its
              original concept, the core idea of sharing your music tastes in
              creative ways remains. I'm committed to making bioTunes as great
              as it can be, and I truly appreciate your patience.
            </p>
          </div>
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
