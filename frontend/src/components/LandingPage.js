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


export default function Example() {
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
            <div className="sm:mb-8 sm:flex sm:justify-center">
              <div className="relative mb-8 rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                This project is still in development.{" "}
                <Link to="/story" className="font-semibold text-indigo-600">
                  Read More <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome to bioTunes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Personalize your music experience by linking your Spotify and
                Instagram accounts and displaying your favorite songs
                seamlessly.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md px-3.5 py-2.5 text-sm bg-gray-400 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed "
                >
                  Sign in with Spotify (Coming Soon)
                </a>
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
