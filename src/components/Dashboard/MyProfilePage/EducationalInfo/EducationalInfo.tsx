/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ProfileTabHeading from "../../../Reusable/ProfileTabHeading/ProfileTabHeading";
import Modal from "../../../Reusable/Modal/Modal";
import UpdateEducationalInfoModal from "./UpdateEducationalInfoModal";
import NoData from "../../../Reusable/NoData/NoData";

// Type for each educational record
type TEducationInfoItem = {
  _id?: string;
  degree?: string;
  levelOfEducation?: string;
  group?: string;
  board?: string;
  department?: string;
  semester?: number | string;
  idCardNo?: number | string;
  from?: string;
  to?: string;
  passingYear?: string | number;
  isCurrentInstitute?: boolean;
  [key: string]: any; // keep flexible for any extra fields from backend
};

// Props type
type TEducationalInfoProps = {
  educationalInfo: TEducationInfoItem[];
  isProfileLocked: boolean;
};

const EducationalInfo: React.FC<TEducationalInfoProps> = ({
  educationalInfo,
  isProfileLocked,
}) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  return (
    <div className="font-Nunito">
      <ProfileTabHeading
        heading="Educational Information"
        onClick={() => setIsFormModalOpen(!isFormModalOpen)}
        isProfileLocked={isProfileLocked}
        btnText={
          educationalInfo?.length < 1
            ? "Add Education Info"
            : "Add More Education"
        }
      />

      {educationalInfo?.length < 1 ? (
        <NoData
          title="No educational information added."
          description="Please add your educational details to complete your profile information."
        />
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {educationalInfo?.map((edu, eduIndex) => {
            const levelOfEducation = edu.levelOfEducation;
            const isSchoolLevel =
              levelOfEducation === "Secondary" ||
              levelOfEducation === "Higher Secondary";

            const isCurrentInstitute = !!edu.isCurrentInstitute;

            return (
              <div
                key={edu._id || eduIndex}
                className="border-b border-neutral-30/20 pb-4"
              >
                {/* Degree heading */}
                {edu.degree && (
                  <h2 className="text-neutral-5 font-bold text-sm lg:text-lg mb-2">
                    {edu.degree}
                  </h2>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(edu).map(([key, value], index) => {
                    // Skip internal/duplicate keys
                    if (key === "_id" || key === "degree") return null;

                    /* ------------ RULE 1 & 2: levelOfEducation filters ------------ */
                    if (isSchoolLevel) {
                      // Secondary / Higher Secondary → hide department, semester, idCardNo
                      if (
                        key === "department" ||
                        key === "semester" ||
                        key === "idCardNo"
                      ) {
                        return null;
                      }
                    } else {
                      // Higher education → hide group, board
                      if (key === "group" || key === "board") {
                        return null;
                      }
                    }

                    /* ------------ RULE 3: current institute filters ------------ */
                    if (
                      isCurrentInstitute &&
                      (key === "from" || key === "to" || key === "passingYear")
                    ) {
                      return null;
                    }

                    // Label formatting
                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());

                    // Determine if value is "provided"
                    let provided = false;
                    if (Array.isArray(value)) {
                      provided =
                        value.length > 0 &&
                        (value as unknown[]).some(
                          (v) => String(v).trim() !== ""
                        );
                    } else if (value && typeof value === "object") {
                      provided = Object.values(
                        value as Record<string, unknown>
                      ).some(
                        (v) =>
                          v !== null &&
                          v !== undefined &&
                          String(v).trim() !== ""
                      );
                    } else {
                      provided =
                        value !== null && value !== undefined && value !== "";
                    }

                    // Build display content
                    let content: string;

                    if (!provided) {
                      content = "Not Provided";
                    } else if (key === "from" || key === "to") {
                      // Format date fields
                      const date = value ? new Date(value as any) : null;
                      content = date
                        ? date.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-";
                    } else if (key === "isCurrentInstitute") {
                      content = value ? "Yes" : "No";
                    } else if (Array.isArray(value)) {
                      content = (value as string[]).join(", ");
                    } else if (value && typeof value === "object") {
                      const parts = Object.entries(
                        value as Record<string, unknown>
                      )
                        .filter(
                          ([, v]) =>
                            v !== null &&
                            v !== undefined &&
                            String(v).trim() !== ""
                        )
                        .map(([k, v]) => {
                          const kLabel = k
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (s) => s.toUpperCase());
                          return `${kLabel}: ${v}`;
                        });
                      content = parts.join(" • ");
                    } else {
                      content = String(value);
                    }

                    return (
                      <div
                        key={index}
                        className="flex text-[13px] md:text-sm lg:text-base"
                      >
                        <span className="text-neutral-5 font-medium min-w-[140px] lg:min-w-[200px]">
                          {label}
                        </span>
                        <span className="text-neutral-5 font-medium">:</span>
                        <span
                          className={`ml-2 ${
                            provided ? "text-neutral-45" : "text-red-500"
                          }`}
                        >
                          {content}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        heading="Update Educational Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] md:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdateEducationalInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
          defaultValues={educationalInfo}
        />
      </Modal>
    </div>
  );
};

export default EducationalInfo;