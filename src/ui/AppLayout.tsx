import React from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="h-screen">
      <aside className="float-left h-screen overflow-hidden border-r border-r-zinc-200 transition duration-500 dark:border-r-zinc-700 dark:bg-zinc-900">
        <Sidebar />
      </aside>
      <main className="ml-80 h-screen overflow-y-auto p-10 transition duration-500 dark:border-l-zinc-700 dark:bg-zinc-800 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};
