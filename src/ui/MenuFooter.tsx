import { LogOutIcon, UserIcon } from "lucide-react";
import React from "react";

export const MenuFooter = () => {
  return (
    <div className="mt-12 px-5 leading-5 font-medium transition duration-500">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200">
          <UserIcon className="dark:text-purple-950" />
        </div>
        <div>
          <span className="block font-bold text-purple-950 transition duration-500 dark:text-purple-400">
            Daniel Majer
          </span>
          <span className="font-light text-zinc-500 transition duration-500 dark:text-zinc-200">
            Admin
          </span>
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-2 py-3 transition duration-500 hover:text-purple-950 dark:hover:text-purple-400">
        <LogOutIcon size={20} />
        <span>Log out</span>
      </div>
    </div>
  );
};
