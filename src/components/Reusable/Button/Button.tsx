import React from "react";

interface ButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary " |string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary-10 border border-primary-10 text-white",
  secondary: "bg-white text-black border border-black",
  tertiary: "bg-white text-primary-10 border border-primary-10 hover:bg-primary-10 hover:text-white",
  quaternary:"bg-primary-10 text-white border border-primary-10 hover:bg-white hover:text-primary-10",
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  icon,
  iconBg = "white",
  className = "",
}) => {
  const variantClass = variantClasses[variant] || variantClasses["primary"];

  const baseClasses =
    "flex items-center gap-4 text-lg leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 lg:py-3 px-3 lg:px-6 text-sm md:text-base";

  const combinedClasses = `${baseClasses} ${variantClass} ${className}`;

  return (
    <div className={`${variant ? "relative" : ""}`}>
      <button onClick={onClick} className={combinedClasses}>
        {label}
        {icon && (
          <span
            className="rounded-full p-1 size-6 flex items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            <img
              src={typeof icon === "string" ? icon : undefined}
              alt="Button Icon"
              className="size-3 lg:size-4"
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
