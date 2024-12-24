"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-center text-gray-800">
          <span className="text-blue-600">NextJS</span>
          <span className="text-gray-700"> x </span>
          <span className="text-blue-500">Agora</span>
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Seamlessly connect with Agora in your Next.js applications.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              channel: { value: string };
            };
            router.push(`/channel/${target.channel.value}`);
          }}
          className="space-y-6"
        >
          <div className="">
            <label
              htmlFor="channel"
              className="block text-gray-700 font-medium text-lg mb-2"
            >
              Enter Channel Name
            </label>
            <input
              id="channel"
              name="channel"
              type="text"
              placeholder="Channel name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300"
          >
            Join Channel
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Powered by <span className="text-blue-600 font-semibold">Agora</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
