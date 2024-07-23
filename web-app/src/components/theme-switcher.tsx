import {useTheme} from "@/contexts/theme-context";
import {FaMoon, FaSun} from "react-icons/fa";

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleTheme}
                className="p-2 border rounded flex flex-row border-gray-400 dark:border-gray-600">
            <div className="my-auto mr-1">{theme === 'dark' ? <FaSun/> : <FaMoon/>}</div>
            <span>Switch Theme</span>
        </button>
    );
};

export default ThemeSwitcher;