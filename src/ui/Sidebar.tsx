import React from "react";
import { MenuLogo } from "./MenuLogo";
import { MenuContent } from "./MenuContent";
import { MenuFooter } from "./MenuFooter";
import { DarkModeButton } from "./DarkMode";

export const Sidebar = () => {
  return (
    <div className="scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-700 scrollbar-track-zinc-200 dark:scrollbar-track-zinc-600 flex h-screen w-80 flex-col justify-between gap-6 overflow-auto px-4 py-10 transition duration-500 dark:text-white">
      <div>
        <MenuLogo />
        <MenuContent />
        <DarkModeButton />
      </div>
      <MenuFooter />
    </div>
  );
};
