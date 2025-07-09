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
  primary: "bg-primary-10 py-3 px-6 text-white ",
  secondary: "bg-white py-[11px] px-6 text-black border border-black ",
  tertiary: "bg-white py-[7px] px-4 text-primary-10 border border-primary-10 ",
  quaternary:"bg-primary-10 py-2 px-4 text-white ",
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
    "flex items-center gap-4 text-lg leading-[24px] w-fit rounded-lg font-semibold font-Nunito";

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
              className="w-4 h-4"
            />
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
