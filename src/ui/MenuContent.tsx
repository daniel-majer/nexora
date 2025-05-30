import { SettingsIcon } from "lucide-react";
import { NavLink } from "react-router";
import menuNames from "../data/menu-items";
import { DarkModeButton } from "./DarkMode";

export const MenuContent = () => {
  return (
    <>
      <nav className="mt-12 font-medium">
        <span className="hidden text-zinc-400 lg:block">GENERAL</span>
        <ul className="mt-2 space-y-2">
          {menuNames.map((menu) => (
            <li
              key={menu.name}
              className="transition duration-300 hover:text-purple-950 dark:hover:text-purple-400"
            >
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex w-full items-center justify-center gap-2 py-2 lg:justify-start lg:px-4 lg:py-3 ${
                    isActive ? "rounded-lg bg-purple-100 text-purple-950" : ""
                  }`
                }
              >
                <menu.icon className="" size={20} />
                <span className="hidden lg:block">{menu.name}</span>
              </NavLink>
            </li>
          ))}
          <span className="mb-2 hidden text-zinc-400 lg:mt-8 lg:block lg:px-4">
            SYSTEM
          </span>
          <li className="mt-8 mb-3 transition-all duration-200 hover:text-purple-950 lg:mt-0 lg:mb-0 dark:hover:text-purple-400">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `flex w-full items-center justify-center gap-2 py-2 lg:justify-start lg:px-4 lg:py-3 ${
                  isActive ? "rounded-lg bg-purple-100 text-purple-950" : ""
                }`
              }
            >
              <SettingsIcon size={20} />
              <span className="hidden lg:block">Settings</span>
            </NavLink>
          </li>
          <li className="flex cursor-pointer flex-col gap-2 lg:mt-3 lg:flex-row lg:px-4">
            <DarkModeButton />
          </li>
        </ul>
      </nav>
    </>
  );
};
