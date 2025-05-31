import React from "react";

export const PageNotFound: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white px-6 text-zinc-800 dark:bg-zinc-900 dark:text-white">
      <div className="animate-fade-in max-w-md text-center">
        <h1 className="text-[6rem] font-black text-purple-600 dark:text-purple-500">
          404
        </h1>
        <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>
        <p className="mb-6 text-zinc-500 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <button
          onClick={() => window.location.replace("/")}
          className="rounded-xl bg-purple-600 px-6 py-2 text-white shadow-lg transition hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-zinc-900"
        >
          Go back home
        </button>
      </div>
    </div>
  );
};
