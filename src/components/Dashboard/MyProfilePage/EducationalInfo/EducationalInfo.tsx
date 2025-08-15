import React from "react";

// Type for each educational record
type TEducationInfoItem = {
  degree: string;
  info: {
    institute?: string;
    examDegreeTitle?: string;
    majorGroup?: string;
    idCardNo?: string | number;
    result?: string | number;
    curriculum?: string;
    fromDate?: string;
    toDate?: string;
    yearOfPassing?: string | number;
    currentInstitute?: string;
  };
};

// Props type
type TEducationalInfoProps = {
  educationalInfo: TEducationInfoItem[];
};

const isProvided = (val: unknown): boolean => {
  if (Array.isArray(val))
    return val.length > 0 && val.some((v) => String(v).trim() !== "");
  if (typeof val === "string") return val.trim() !== "";
  return val !== null && val !== undefined;
};

const EducationalInfo: React.FC<TEducationalInfoProps> = ({
  educationalInfo,
}) => {
  return (
    <div className="font-Nunito">
      <h1 className="text-neutral-5 font-semibold text-2xl">
        Educational Information
      </h1>

      <div className="flex flex-col gap-4 mt-4">
        {educationalInfo.map((edu, eduIndex) => (
          <div key={eduIndex} className="border-b border-neutral-30/20 pb-4">
            <h2 className="text-neutral-5 font-bold text-lg mb-2">
              {edu.degree}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(edu.info).map(([key, value], index) => {
                const provided = isProvided(value);
                // Convert camelCase key to readable label
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                return (
                  <div key={index} className="flex">
                    <span className="text-neutral-5 font-medium min-w-[200px]">
                      {label}
                    </span>
                    <span className="text-neutral-5 font-medium">:</span>
                    <span
                      className={`ml-2 ${
                        provided ? "text-neutral-45" : "text-red-500"
                      }`}
                    >
                      {provided
                        ? Array.isArray(value)
                          ? (value as string[]).join(", ")
                          : value
                        : "Not Provided"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalInfo;
