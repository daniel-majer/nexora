import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => {
  return (
    <div
      className="grid bg-white transition duration-500 dark:bg-zinc-800"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <aside className="overflow-hidden border-r border-r-zinc-200 transition duration-500 dark:border-r-zinc-700 dark:bg-zinc-900">
        <Sidebar />
      </aside>
      <main className="h-screen overflow-y-auto p-2 transition duration-500 lg:p-10 dark:border-l-zinc-700 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};
