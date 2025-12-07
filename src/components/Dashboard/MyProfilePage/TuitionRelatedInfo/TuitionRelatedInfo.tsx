import { useState } from "react";
import ProfileTabHeading from "../../../Reusable/ProfileTabHeading/ProfileTabHeading";
import Modal from "../../../Reusable/Modal/Modal";
import UpdateTuitionRelatedInfoModal from "./UpdateTuitionRelatedInfoModal";

type TTuitionRelatedInfoProps = {
  tuitionRelatedInfo: {
    tutoringMethod: string;
    tutoringStyles: string[];
    availableDays: string[];
    time: string;
    preferences?: {
      preferredCategories?: string[] | string;
      preferredClasses?: string[] | string;
      preferredSubjects?: string[] | string;
      placeOfTuition?: string[];
      preferredLocation: string[];
    };
    expectedSalary: string | number;
    experience: {
      total: string;
      details: string;
    };
  };
  isProfileLocked: boolean;
};

const TuitionRelatedInfo = ({
  tuitionRelatedInfo,
  isProfileLocked,
}: TTuitionRelatedInfoProps) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const accessibilityInfo = [
    { label: "Tutoring Method", value: tuitionRelatedInfo?.tutoringMethod },
    { label: "Tutoring Styles", value: tuitionRelatedInfo?.tutoringStyles },
    { label: "Available Days", value: tuitionRelatedInfo?.availableDays },
    { label: "Time", value: tuitionRelatedInfo?.time },
    { label: "Expected Salary", value: tuitionRelatedInfo?.expectedSalary },
    {
      label: "Preferred Locations",
      value: tuitionRelatedInfo?.preferences?.preferredLocation,
    },
  ];

  const additionalInfo = [
    {
      label: "Preferred Categories",
      value: tuitionRelatedInfo?.preferences?.preferredCategories,
    },
    {
      label: "Preferred Classes",
      value: tuitionRelatedInfo?.preferences?.preferredClasses,
    },
    {
      label: "Preferred Subjects",
      value: tuitionRelatedInfo?.preferences?.preferredSubjects,
    },
    {
      label: "Place of Tutoring",
      value: tuitionRelatedInfo?.preferences?.placeOfTuition,
    },

    { label: "Total Experience", value: tuitionRelatedInfo?.experience?.total },
    {
      label: "Experience Details",
      value: tuitionRelatedInfo?.experience?.details,
    },
  ];

  const isProvided = (val: unknown): boolean => {
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "string") return val.trim() !== "";
    return val !== null && val !== undefined;
  };

  const allInfo = [...accessibilityInfo, ...additionalInfo];

  const allNotProvided = allInfo.every((item) => !isProvided(item.value));

  return (
    <div className="font-Nunito">
      <ProfileTabHeading
        heading="Tuition Related Information"
        onClick={() => setIsFormModalOpen(!isFormModalOpen)}
        isProfileLocked={isProfileLocked}
        btnText={allNotProvided ? "Add Tuition Preferences" : "Edit Info"}
      />

      <div className="mt-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2 border border-neutral-30/20 bg-[#F2F5FC]/10 rounded-lg p-3">
          <h2 className="text-neutral-5 font-semibold text-lg md:text-xl mb-1">
            Accessibility Information
          </h2>
          {accessibilityInfo?.map((item, index) => {
            const provided = isProvided(item.value);

            return (
              <div
                key={index}
                className="flex text-[13px] md:text-sm lg:text-base"
              >
                <span className="text-neutral-5 font-medium min-w-[140px] md:max-w-[160px] lg:min-w-[200px]">
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
        <div className="flex flex-col gap-2 border border-neutral-30/20 bg-[#F2F5FC]/10 rounded-lg p-3">
          <h2 className="text-neutral-5 font-semibold text-lg md:text-xl mb-1">
            Additional Information
          </h2>
          {additionalInfo?.map((item, index) => {
            const provided = isProvided(item.value);

            return (
              <div
                key={index}
                className="flex text-[13px] md:text-sm lg:text-base"
              >
                <span className="text-neutral-5 font-medium min-w-[140px] md:max-w-[160px] lg:min-w-[200px]">
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
      <Modal
        heading="Update Tuition Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] md:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdateTuitionRelatedInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
          defaultValues={tuitionRelatedInfo}
        />
      </Modal>
    </div>
  );
};

export default TuitionRelatedInfo;
