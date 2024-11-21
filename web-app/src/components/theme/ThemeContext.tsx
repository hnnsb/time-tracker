import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(userPrefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
