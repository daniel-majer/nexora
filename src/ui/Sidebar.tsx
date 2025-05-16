import React from "react";
import { MenuLogo } from "./MenuLogo";
import { MenuContent } from "./MenuContent";
import { MenuFooter } from "./MenuFooter";
import { DarkModeButton } from "./DarkMode";

export const Sidebar = () => {
  return (
    <aside className="flex basis-80 flex-col justify-between px-4 py-10 transition duration-500 dark:bg-zinc-900 dark:text-white">
      <div>
        <MenuLogo />
        <MenuContent />
        <DarkModeButton />
      </div>
      <MenuFooter />
    </aside>
  );
};
