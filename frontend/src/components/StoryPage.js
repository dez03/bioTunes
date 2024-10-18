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
          <h1 className="text-3xl font-bold mb-6">The Story Behind bioTunes</h1>
          <p className="text-lg text-gray-700 leading-8 mb-4">
            I started this project on August 6th, 2024. The idea originally came
            from my friend&nbsp;
            <a
              href="https://www.instagram.com/karsondurocher/" // Replace this with Karson's actual Instagram URL
              className="text-indigo-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Karson
            </a>
            , and I <i>very</i> loosely helped him build the first working
            version two years ago. With his permission, I decided to pick the
            idea back up and rebuild it from scratch.
          </p>

          <p className="text-lg text-gray-700 leading-8 mb-4">
            Initially, I posted a demo of the terminal-based version on my
            Instagram story just for fun. But I recieved a tremendous amount of
            support, which motivated me to turn this into a fully working web
            app for everyone to use.
          </p>
          <p className="text-lg text-gray-700 leading-8 mb-4">
            It has been a huge challenge since the demo I showed was a basic
            terminal version, fundamentally different from the web app I
            envisioned. I took on the task of reworking it entirely, but soon
            after, I began moving across the country for college. Life got in
            the way, and I found myself working on it less and less until I had
            completely stopped.
          </p>
          <p className="text-lg text-gray-700 leading-8 mb-4">
            Recently, I picked the project back up and I am committed to
            finishing it. However, it will take <i>even more</i> time as this is
            a large and complex project, and the development process is new to
            me. I'm learning how to build this as I go. If you want to keep
            track of my progress, you can find the&nbsp;
            <a
              href="https://github.com/dez03/bioTunes" // Replace this with Karson's actual Instagram URL
              className="text-indigo-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              bioTunes repository here
            </a>
            {""}. I am keeping this project open sourced, so feel free to contribute!
          </p>
          <p className="text-lg text-gray-700 leading-8 mb-4">
            Seeing projects like this to its fruition is a skill I want to
            develop.
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
