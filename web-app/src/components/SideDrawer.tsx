import { ReactNode, useState } from "react";
import PButton from "./PButton";
import { FaTimes } from "react-icons/fa";

interface SideDrawerProps {
  className?: string;
  title: string;
  children: ReactNode;
}

export default function SideDrawer({ className, title, children }: Readonly<SideDrawerProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  // TODO Fix drawer behaviour and category editing.
  return (
    <div>
      <PButton onClick={toggleDrawer}>{title}</PButton>
      {isOpen ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-end items-center bg-gray-500 bg-opacity-50">
          <div className={"p-2 bg-gray-100 dark:bg-gray-800 h-full w-3/12"}>
            <div className="flex justify-between align-top">
              <h2 className="pr-3">{title}</h2>
              <button onClick={toggleDrawer}>
                <FaTimes />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
