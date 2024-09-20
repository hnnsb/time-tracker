import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaGear } from "react-icons/fa6";

export default function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        onClick={toggleDialog}
        className="btn p-2 dark:text-light-bg_primary"
      >
        <FaGear />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-800 text-light-text dark:text-dark-text">
            <h2 className="text-lg">Settings</h2>
            <Button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="btn btn-danger"
            >
              Clear Local Storage
            </Button>
            <Button onClick={toggleDialog}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
