import { FaFacebook, FaFemale, FaLinkedin, FaMale } from "react-icons/fa";

type TPersonalInfo = {
  email?: string;
  phoneNumber?: string;
  additionalNumber?: string;
  city?: string;
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
    { label: "Gender", value: personalInfo?.gender },
    { label: "Phone Number", value: personalInfo?.phoneNumber },
    { label: "Additional Number", value: personalInfo?.additionalNumber },
    { label: "City", value: personalInfo?.city },
    { label: "Address", value: personalInfo?.address },
    { label: "Date of Birth", value: personalInfo?.dateOfBirth },
    { label: "Religion", value: personalInfo?.religion },
    { label: "Identity Type", value: personalInfo?.identityType },
    { label: "Nationality", value: personalInfo?.nationality },
    // {
    //   label: "Facebook Profile Link",
    //   value: personalInfo?.socialLinks?.facebook,
    // },
    // {
    //   label: "LinkedIn Profile Link",
    //   value: personalInfo?.socialLinks?.linkedIn,
    // },
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-5 font-semibold">
          <h1 className="text-xl md:2xl">Personal Information</h1>
          <div className="bg-primary-10 text-white rounded-full size-7 hidden md:flex items-center justify-center">
            {personalInfo?.gender === "Male" ? (
              <FaMale className="text-xl" />
            ) : (
              <FaFemale className="text-xl" />
            )}
          </div>
        </div>

          {/* Social media icons */}
        <div className="flex items-center gap-3">
          <a
            href=""
            target="_blank"
            className="text-primary-10 font-semibold flex items-center gap-1 w-fit hover:-translate-y-1 transition duration-500"
          >
            <FaFacebook />
            <span className="hidden md:block">rahulsd380</span>
          </a>
          <a
            href=""
            target="_blank"
            className="text-primary-10 font-semibold flex items-center gap-1 w-fit hover:-translate-y-1 transition duration-500"
          >
            <FaLinkedin />
            <span className="hidden md:block">rahulsd380</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {details.map((item, index) => {
          const provided = isProvided(item.value);

          return (
            <div key={index} className="flex text-[13px] md:text-sm lg:text-base">
              <span className="text-neutral-5 font-medium min-w-[140px] lg:min-w-[200px]">
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
