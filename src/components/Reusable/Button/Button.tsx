import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconBg?: string;
}

const variantClasses: Record<string, string> = {
  primary: "bg-primary-10 text-white ",
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  icon,
  iconBg = "white",
}) => {
  const variantClass = variantClasses[variant] || variantClasses["primary"];

  const baseClasses =
    "flex items-center gap-2 px-6 py-3 w-fit rounded-lg font-semibold";

  const combinedClasses = `${baseClasses} ${variantClass}`;

  return (
    <div className={`${variant?"relative":""}`}>
        
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
