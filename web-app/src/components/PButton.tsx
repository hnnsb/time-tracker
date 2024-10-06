import React from "react";
import PropTypes from "prop-types";

interface PButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  className?: string;
  children: React.ReactNode;
}

const VARIANT_STYLES = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  outline:
    "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-white",
};

const PButton: React.FC<PButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyle = "px-3 py-2 rounded-full font-semibold";
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <button className={`${baseStyle} ${variantStyle} ${className} `} {...props}>
      {children}
    </button>
  );
};

PButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success", "outline"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PButton;
