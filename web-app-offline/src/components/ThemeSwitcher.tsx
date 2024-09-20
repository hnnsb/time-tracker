import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher(props: { className: String }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${props.className} p-2 border rounded border-gray-400 dark:border-gray-800 dark:text-light-bg_primary`}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
