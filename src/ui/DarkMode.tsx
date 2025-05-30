import { MoonIcon } from "lucide-react";
import { useTheme } from "../context/DarkModeContext";

export const DarkModeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <>
      <MoonIcon className="self-center"/>
      <span className="hidden lg:block">Dark mode</span>
      <div
        onClick={() => toggleTheme()}
        className={`flex self-center h-5 w-10 items-center rounded-full px-1 lg:ml-4 lg:h-6 lg:w-12 ${
          isDarkMode ? "bg-purple-200" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-4 w-4 transform rounded-full shadow-md transition duration-300 lg:h-4.5 lg:w-4.5 ${
            isDarkMode ? "bg-purple-800" : "bg-white"
          } ${isDarkMode ? "translate-x-4 lg:translate-x-5" : "translate-x-0"}`}
        ></div>
      </div>
    </>
  );
};
