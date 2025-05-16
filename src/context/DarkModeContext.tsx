import React from "react";

type DarkModeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const DarkModeContext = React.createContext<DarkModeContextType | undefined>(
  undefined,
);

const getInitialTheme = () => {
  const preferredTheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const storedTheme = localStorage.getItem("theme") || undefined;

  return storedTheme || (preferredTheme ? "dark" : "light");
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState(() => getInitialTheme());

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
