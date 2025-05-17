import React from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="h-screen grow bg-zinc-100 p-10">
        <Outlet />
      </main>
    </div>
  );
};
