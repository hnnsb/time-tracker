import React, { ReactNode, useState } from "react";
import { IconType } from "react-icons";

interface ViewSwitcherProps {
  title: ReactNode;
  icons: IconType[];
  children: ReactNode;
  className?: string;
}

export default function ViewSwitcher({
  title,
  icons,
  children,
  className,
}: Readonly<ViewSwitcherProps>) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to switch views
  const handleViewSwitch = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`${className}`}>
      <div className={"flex flex-row justify-between"}>
        {title}
        <div className="flex mb-2">
          {icons.map((IconComponent, index: number) => {
            const isFirst = index === 0;
            const isLast = index === icons.length - 1;
            const isSelected = index === activeIndex;

            return (
              <button
                className={`border-1  hover:bg-blue-500 px-3 py-2 font-semibold 
                          ${isFirst ? "rounded-l-full" : ""} ${isLast ? "rounded-r-full" : ""}
                          ${isSelected ? "bg-light-bg_primary dark:bg-dark-bg_primary border-blue-600 text-blue-600" : "bg-blue-600 text-white border-light-bg_primary dark:border-dark-bg_primary"}
                          `}
                key={index}
                onClick={() => handleViewSwitch(index)}
              >
                <IconComponent />
              </button>
            );
          })}
        </div>
      </div>
      <div>{children[activeIndex]}</div>
    </div>
  );
}
