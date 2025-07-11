import React from "react";

interface TitlePart {
  text: string;
  highlight?: boolean; // true if the word should be styled differently
}

interface HeadingProps {
  titleParts: TitlePart[];
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

const Heading: React.FC<HeadingProps> = ({
  titleParts,
  description,
  align = "left",
  className = "",
  headingClassName = "",
  descriptionClassName = "",
}) => {
  const alignment =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className={`${alignment} ${className} font-Nunito`}>
      <h1
        className={`text-[44px] font-Nunito font-bold text-neutral-10 leading-[48px] ${headingClassName}`}
      >
        {titleParts.map((part, index) => (
          <span key={index} className={part.highlight ? "text-blue-600" : ""}>
            {part.text}{" "}
          </span>
        ))}
      </h1>
      {description && (
        <p
          className={`mt-4 text-neutral-20 text-lg leading-[24px] ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
