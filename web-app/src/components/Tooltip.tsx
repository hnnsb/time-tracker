import { CSSProperties, ReactNode, useState } from "react";

interface TooltipProps {
  description: string;
  children: ReactNode;
}

const styles: { [key: string]: CSSProperties } = {
  tooltip: {
    position: "absolute",
    bottom: "125%", // Position the tooltip above the icon
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
};

export default function Tooltip({ description, children }: Readonly<TooltipProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ cursor: "pointer", color: "#555" }}> {children}</div>
      {isHovered && <div style={styles.tooltip}>{description}</div>}
    </div>
  );
}
