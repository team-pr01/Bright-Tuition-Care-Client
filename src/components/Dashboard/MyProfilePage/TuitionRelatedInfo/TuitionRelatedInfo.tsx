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
    location: {
      city: string;
      area: string;
    };
    preferences?: {
      preferredCategories?: string[] | string;
      preferredClasses?: string[] | string;
      preferredSubjects?: string[] | string;
      placeOfTutoring?: string;
      preferredLocations: string[];
    };
    expectedSalary: string | number;
    experience: {
      total: string;
      details: string;
    };
  };
};

const TuitionRelatedInfo = ({
  tuitionRelatedInfo,
}: TTuitionRelatedInfoProps) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const details = [
    { label: "Tutoring Method", value: tuitionRelatedInfo?.tutoringMethod },
    { label: "Tutoring Styles", value: tuitionRelatedInfo?.tutoringStyles },
    { label: "Available Days", value: tuitionRelatedInfo?.availableDays },
    { label: "Time", value: tuitionRelatedInfo?.time },
    { label: "City", value: tuitionRelatedInfo?.location?.city },
    { label: "Area", value: tuitionRelatedInfo?.location?.area },
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
      value: tuitionRelatedInfo?.preferences?.placeOfTutoring,
    },
    {
      label: "Preferred Locations",
      value: tuitionRelatedInfo?.preferences?.preferredLocations,
    },
    { label: "Expected Salary", value: tuitionRelatedInfo?.expectedSalary },
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

  return (
    <div className="font-Nunito">
      <ProfileTabHeading
        heading="Tuition Related Information"
        onClick={() => setIsFormModalOpen(!isFormModalOpen)}
      />

      <div className="flex flex-col gap-2 mt-4">
        {details.map((item, index) => {
          const provided = isProvided(item.value);

          return (
            <div key={index} className="flex text-[13px] md:text-sm lg:text-base">
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
      <Modal
        heading="Update Tuition Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] md:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdateTuitionRelatedInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
        />
      </Modal>
    </div>
  );
};

export default TuitionRelatedInfo;
