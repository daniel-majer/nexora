import React from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="grow bg-zinc-300">
        <Outlet />
      </main>
    </div>
  );
};
