import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher(props: Readonly<{ className: string }>) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${props.className} p-2 rounded dark:text-light-bg_primary`}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
