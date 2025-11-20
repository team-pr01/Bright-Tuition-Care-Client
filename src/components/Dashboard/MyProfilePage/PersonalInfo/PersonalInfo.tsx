import { FaFacebook, FaFemale, FaMale } from "react-icons/fa";
import { formatDate } from "../../../../utils/formatDate";
import { getFacebookUsername } from "../../../../utils/socialMediaUsernameExtractor";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

type TPersonalInfo = {
  email?: string;
  phoneNumber?: string;
  additionalPhoneNumber?: string;
  city?: string;
  area?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  religion?: string;
  identityType?: string;
  nationality?: string;
  fatherName?: string;
  fatherPhoneNumber?: string;
  motherName?: string;
  motherPhoneNumber?: string;

  socialMediaInformation?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
};

type TPersonalInfoProps = {
  personalInfo: TPersonalInfo;
};

const PersonalInfo: React.FC<TPersonalInfoProps> = ({ personalInfo }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const socialMediaLinks = [
    {
      label: "Facebook",
      username: getFacebookUsername(
        personalInfo?.socialMediaInformation?.facebook as string
      ),
      icon: <FaFacebook />,
      link: personalInfo?.socialMediaInformation?.facebook,
    },
    // {
    //   label: "Instagram",
    //   username: getInstagramUsername(
    //     personalInfo?.socialMediaInformation?.instagram as string
    //   ),
    //   icon: <FaInstagram />,
    //   link: personalInfo?.socialMediaInformation?.instagram,
    // },
    // {
    //   label: "LinkedIn",
    //   username: getLinkedInUsername(
    //     personalInfo?.socialMediaInformation?.linkedin as string
    //   ),
    //   icon: <FaLinkedin />,
    //   link: personalInfo?.socialMediaInformation?.linkedin,
    // },
  ];

  const filteredSocialLinks = socialMediaLinks.filter((item) => item.link);

  const details = [
    { label: "Email", value: personalInfo?.email },
    { label: "Gender", value: personalInfo?.gender },
    { label: "Phone Number", value: personalInfo?.phoneNumber },
    { label: "Additional Number", value: personalInfo?.additionalPhoneNumber },
    { label: "City", value: personalInfo?.city },
    { label: "Area", value: personalInfo?.area },
    { label: "Address", value: personalInfo?.address },
    {
      label: "Date of Birth",
      value: formatDate((personalInfo?.dateOfBirth) as string ),
    },
    { label: "Religion", value: personalInfo?.religion },
    { label: "Nationality", value: personalInfo?.nationality },
    { label: "Father's Name", value: personalInfo?.fatherName },
    { label: "Father's Number", value: personalInfo?.fatherPhoneNumber },
    { label: "Mother's Name", value: personalInfo?.motherName },
    { label: "Mother's Number", value: personalInfo?.motherPhoneNumber },
  ];

  // Remove parent details if guardian
  const filteredDetails =
    user?.role === "guardian"
      ? details.filter(
          (item) =>
            ![
              "Father's Name",
              "Father's Number",
              "Mother's Name",
              "Mother's Number",
            ].includes(item.label)
        )
      : details;

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
            {personalInfo?.gender === "male" ? (
              <FaMale className="text-xl" />
            ) : (
              <FaFemale className="text-xl" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {filteredSocialLinks.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-10 font-semibold flex items-center gap-1 w-fit hover:-translate-y-1 transition duration-500"
            >
              {item.icon}
              <span className="hidden md:block">{item.username}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {filteredDetails?.map((item, index) => {
          const provided = isProvided(item.value);

          return (
            <div
              key={index}
              className={`flex text-[13px] md:text-sm lg:text-base ${
                item.label !== "Email" ? "capitalize" : ""
              }`}
            >
              <span className="text-neutral-5 font-medium min-w-[140px] lg:min-w-[200px] xl:min-w-fit">
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
