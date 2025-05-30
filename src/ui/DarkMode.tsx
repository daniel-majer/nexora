import { MoonIcon } from "lucide-react";
import { useTheme } from "../context/DarkModeContext";

export const DarkModeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <>
      <MoonIcon className="self-center" />
      <span className="hidden lg:block">Dark mode</span>
      <div
        onClick={() => toggleTheme()}
        className={`flex h-3 w-6 items-center self-center rounded-full px-1 lg:ml-4 lg:h-6 lg:w-12 ${
          isDarkMode ? "bg-purple-200" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-2 w-2 transform rounded-full shadow-md transition duration-300 lg:h-4.5 lg:w-4.5 ${
            isDarkMode ? "bg-purple-800" : "bg-white"
          } ${isDarkMode ? "translate-x-2.5 lg:translate-x-5" : "translate-x-0"}`}
        ></div>
      </div>
    </>
  );
};
