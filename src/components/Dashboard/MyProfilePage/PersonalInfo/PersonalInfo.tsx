import React from "react";

type TPersonalInfo = {
  email?: string;
  additionalNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  religion?: string;
  identityType?: string;
  nationality?: string;
  socialLinks?: {
    facebook?: string;
    linkedIn?: string;
  };
  family?: {
    fatherName?: string;
    fatherNumber?: string;
    motherName?: string;
    motherNumber?: string;
  };
};

type TPersonalInfoProps = {
  personalInfo: TPersonalInfo;
};

const PersonalInfo: React.FC<TPersonalInfoProps> = ({ personalInfo }) => {
  const details = [
    { label: "Email", value: personalInfo?.email },
    { label: "Additional Number", value: personalInfo?.additionalNumber },
    { label: "Address", value: personalInfo?.address },
    { label: "Gender", value: personalInfo?.gender },
    { label: "Date of Birth", value: personalInfo?.dateOfBirth },
    { label: "Religion", value: personalInfo?.religion },
    { label: "Identity Type", value: personalInfo?.identityType },
    { label: "Nationality", value: personalInfo?.nationality },
    {
      label: "Facebook Profile Link",
      value: personalInfo?.socialLinks?.facebook,
    },
    {
      label: "LinkedIn Profile Link",
      value: personalInfo?.socialLinks?.linkedIn,
    },
    { label: "Father's Name", value: personalInfo?.family?.fatherName },
    { label: "Father's Number", value: personalInfo?.family?.fatherNumber },
    { label: "Mother's Name", value: personalInfo?.family?.motherName },
    { label: "Mother's Number", value: personalInfo?.family?.motherNumber },
  ];

  const isProvided = (val: unknown): boolean => {
    if (Array.isArray(val))
      return val.length > 0 && val.some((v) => String(v).trim() !== "");
    if (typeof val === "string") return val.trim() !== "";
    return val !== null && val !== undefined;
  };

  return (
    <div className="font-Nunito">
      <h1 className="text-neutral-5 font-semibold text-2xl">
        Personal Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {details.map((item, index) => {
          const provided = isProvided(item.value);

          return (
            <div key={index} className="flex">
              <span className="text-neutral-5 font-medium min-w-[200px]">
                {item.label}
              </span>
              <span className="text-neutral-5 font-medium">:</span>
              <span
                className={`ml-2 ${
                  provided ? "text-neutral-45" : "text-red-500"
                }`}
              >
                {provided
                  ? Array.isArray(item.value)
                    ? (item.value as string[]).join(", ")
                    : item.value
                  : "Not Provided"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfo;
