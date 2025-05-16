import { SettingsIcon } from "lucide-react";
import { NavLink } from "react-router";
import menuNames from "../data/menu-items";

export const MenuContent = () => {
  return (
    <>
      <nav className="mt-12 font-medium">
        <span className="px-4 text-zinc-400">GENERAL</span>
        <ul className="mt-2">
          {menuNames.map((menu) => (
            <li
              key={menu.name}
              className="transition-all duration-200 hover:text-purple-950 dark:hover:text-purple-400"
            >
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex w-full items-center gap-2 px-4 py-3 ${
                    isActive ? "rounded-lg bg-purple-100 text-purple-950" : ""
                  }`
                }
              >
                <menu.icon className="" size={20} />
                {menu.name}
              </NavLink>
            </li>
          ))}
          <span className="mt-8 mb-2 inline-block px-4 text-zinc-400">
            SYSTEM
          </span>
          <li className="transition-all duration-200 hover:text-purple-950 dark:hover:text-purple-400">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                `flex w-full items-center gap-2 px-4 py-3 ${
                  isActive ? "rounded-lg bg-purple-100 text-purple-950" : ""
                }`
              }
            >
              <SettingsIcon size={20} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
