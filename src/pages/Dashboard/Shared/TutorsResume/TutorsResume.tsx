/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IMAGES } from "../../../../assets";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../../../components/Reusable/Button/Button";
import { useGetSingleTutorByIdQuery } from "../../../../redux/Features/Tutor/tutorApi";
import type { TEducation } from "../../../../types/tutor.types";

const TutorsResume = () => {
  const location = useLocation();
  const { tutorId } = useParams();
  const { data } = useGetSingleTutorByIdQuery(tutorId);
  const profile = data?.data;
  const profileStatus = "locked";
  const educationDetails = data?.data?.educationalInformation || [];
  const tuitionPreference = profile?.tuitionPreference;
  const personalInfo = profile?.personalInformation || {};

  const educationData = educationDetails.map((item:TEducation) => [
    { label: "Institute Name", value: item.instituteName || "N/A" },
    { label: "Degree", value: item.degree || "N/A" },
    { label: "Department", value: item.department || item.group || "N/A" },
    { label: "Curriculum", value: item.medium || "N/A" },
    { label: "Result", value: item.result || "N/A" },
    { label: "Year of Passing", value: item.passingYear || "N/A" },
  ]);

  const tuitionData = [
    { label: "Preferred Location", value: tuitionPreference.preferredLocation },
    {
      label: "Preferred Categories",
      value: Array.isArray(tuitionPreference.preferredCategories)
        ? tuitionPreference.preferredCategories.join(", ")
        : tuitionPreference.preferredCategories,
    },
    {
      label: "Preferred Classes",
      value: Array.isArray(tuitionPreference.preferredClasses)
        ? tuitionPreference.preferredClasses.join(", ")
        : tuitionPreference.preferredClasses,
    },
    {
      label: "Preferred Subjects",
      value: tuitionPreference.preferredSubjects,
    },
    {
      label: "Tutoring Method",
      value: tuitionPreference.tutoringMethod,
    },
    {
      label: "Tuition Style",
      value: Array.isArray(tuitionPreference.tuitionStyle)
        ? tuitionPreference.tuitionStyle.join(", ")
        : tuitionPreference.tuitionStyle,
    },
    {
      label: "Available Days",
      value: Array.isArray(tuitionPreference.availableDays)
        ? tuitionPreference.availableDays.join(", ")
        : tuitionPreference.availableDays,
    },
    {
      label: "Available Time",
      value: tuitionPreference.availableTime
        ? `${tuitionPreference.availableTime.from} - ${tuitionPreference.availableTime.to}`
        : null,
    },
    {
      label: "Expected Salary",
      value: tuitionPreference.expectedSalary
        ? `${tuitionPreference.expectedSalary} BDT`
        : null,
    },
  ];

  const filteredTuitionData = tuitionData.filter(
    (item) => item.value && item.value !== ""
  );

  const personalData = [
    { label: "Gender", value: personalInfo.gender || "N/A" },
    { label: "Religion", value: personalInfo.religion || "N/A" },
    { label: "Nationality", value: personalInfo.nationality || "N/A" },
    {
      label: "Date of Birth",
      value: personalInfo.dateOfBirth
        ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
        : "N/A",
    },
    { label: "Father's Name", value: personalInfo.fatherName || "N/A" },
    { label: "Father's Phone", value: personalInfo.fatherPhoneNumber || "N/A" },
    { label: "Mother's Name", value: personalInfo.motherName || "N/A" },
    { label: "Mother's Phone", value: personalInfo.motherPhoneNumber || "N/A" },
    {
      label: "Additional Phone",
      value: personalInfo.additionalPhoneNumber || "N/A",
    },
    { label: "Address", value: personalInfo.address || "N/A" },
  ];

  const filteredPersonalData = personalData.filter(
    (item) => item.value && item.value !== "N/A"
  );

  const buttonStyle = "py-[6px] lg:py-[6px] px-3 lg:px-2 text-sm lg:text-sm";

  return (
    <div className="bg-white shadow rounded-xl max-w-[1000px] mx-auto p-5 font-Nunito">
      {/* profile and overview */}
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="flex gap-5">
          <img
            src={profile?.imageUrl || IMAGES.dummyAvatar}
            alt=""
            className="size-20 lg:size-56 object-cover rounded-xl"
          />
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-neutral-10">
                  {profile?.userId?.name}
                </h1>
                <p className="text-neutral-10 mt-1 text-sm md:text-base">
                  <strong>Tutor Id:</strong> {profile?.tutorId}
                </p>
                <p className="text-neutral-10 mt-1 text-sm md:text-base">
                  <strong>Phone Number:</strong> {profile?.userId?.phoneNumber}
                </p>
              </div>

              {/* Admin controlls */}
              <div className="flex items-center gap-3">
                {location.pathname.startsWith("/dashboard/admin/tutor/") &&
                  (profileStatus === "locked" ? (
                    <Button
                      label="Unlock Profile"
                      variant="tertiary"
                      className={buttonStyle}
                    />
                  ) : (
                    <Button
                      label="Lock Profile"
                      variant="tertiary"
                      className={buttonStyle}
                    />
                  ))}

                {location.pathname.startsWith(
                  "/dashboard/admin/applications/resume"
                ) && (
                  <div className="flex items-center gap-3">
                    <Button
                      label="Shortlist"
                      variant="tertiary"
                      className={`${buttonStyle}`}
                    />

                    <Button
                      label="Appoint"
                      variant="tertiary"
                      className={`${buttonStyle} border-[#9C9700] hover:bg-[#9C9700] text-[#9C9700] hover:text-white`}
                    />

                    <Button
                      label="Confirm"
                      variant="tertiary"
                      className={`${buttonStyle} border-green-600 hover:bg-green-600 text-green-600 hover:text-white`}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className="text-neutral-20 mt-3 hidden lg:block">
              {profile?.personalInformation?.overview}
            </p>
          </div>
        </div>
        <p className="text-neutral-20 mt-3 block lg:hidden">
          {profile?.personalInformation?.overview}
        </p>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-5 pb-2 border-b border-neutral-55/50">
          Education
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0">
          {educationData.map((edu:TEducation[], eduIndex:number) => (
            <div key={eduIndex}>
              <h2 className="font-bold text-neutral-10 mt-4">
                • {educationDetails[eduIndex]?.degree || "Education"}
              </h2>

              <div className="text-neutral-20 grid grid-cols-[150px_20px_1fr] gap-y-2 mt-3">
                {edu?.map((item: any, index:number) => (
                  <React.Fragment key={index}>
                    <span className="font-medium">{item.label}</span>
                    <span className="text-neutral-10">:</span>
                    <span>{item.value}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tuition Related Information Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-8 pb-2 border-b border-neutral-55/50">
          Tuition Related Information
        </h2>

        <div className="text-neutral-20 grid grid-cols-[180px_20px_1fr] gap-y-2 mt-4">
          {filteredTuitionData?.map((item, index) => (
            <React.Fragment key={index}>
              <span className="font-medium">{item.label}</span>
              <span className="text-neutral-10">:</span>
              <span>{item.value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-8 pb-2 border-b border-neutral-55/50">
          Personal Information
        </h2>

        <div className="text-neutral-20 grid grid-cols-[180px_20px_1fr] gap-y-2 mt-4">
          {filteredPersonalData?.map((item, index) => (
            <React.Fragment key={index}>
              <span className="font-medium">{item.label}</span>
              <span className="text-neutral-10">:</span>
              <span>{item.value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsResume;
