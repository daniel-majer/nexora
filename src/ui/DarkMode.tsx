import { MoonIcon } from "lucide-react";
import { useTheme } from "../context/DarkModeContext";

export const DarkModeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <li className="mt-4 flex cursor-pointer gap-2 px-4">
      <MoonIcon className="" />
      <span>Dark mode</span>
      <div
        onClick={() => toggleTheme()}
        className={`ml-4 flex h-5 w-10 items-center rounded-full px-1 md:h-6 md:w-12 ${
          isDarkMode ? "bg-purple-200" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-4 w-4 transform rounded-full shadow-md transition duration-300 md:h-4.5 md:w-4.5 ${
            isDarkMode ? "bg-purple-800" : "bg-white"
          } ${isDarkMode ? "translate-x-4 md:translate-x-5" : "translate-x-0"}`}
        ></div>
      </div>
    </li>
  );
};
