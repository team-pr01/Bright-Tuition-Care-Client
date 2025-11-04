import { useParams } from "react-router-dom";
import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import JobCard from "../../../../components/JobBoardPage/Jobs/JobCard/JobCard";
import SuspendGuardianModal from "../../../../components/Admin/SharedAdmin/SuspendUserModal/SuspendUserModal";
import { useState } from "react";

const GuardianProfile = () => {
  const { id } = useParams();
  const [isSuspendGuardianModalOpen, setIsSuspendGuardianModalOpen] =
    useState<boolean>(false);

  const personalInfo = {
    email: "rahulsd380@gmail.com",
    phoneNumber: "",
    additionalNumber: "",
    city: "",
    address: "",
    gender: "Male",
    dateOfBirth: "",
    religion: "",
    identityType: "",
    nationality: "",
    socialLinks: {
      facebook: "",
      linkedIn: "",
    },
    family: {
      fatherName: "",
      fatherNumber: "",
      motherName: "",
      motherNumber: "",
    },
  };

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
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-start lg:items-center justify-between pb-5">
        <div className="flex items-center gap-3">
          <div className="size-24 lg:size-32 rounded-full relative">
            <div className="bg-white/40 rounded-full p-[2px] size-full">
              <img
                src={IMAGES.dummyAvatar}
                alt=""
                className="size-full object-cover rounded-full"
              />
            </div>
            <div className="bg-primary-10 shadow-2xl size-5 rounded-full flex items-center justify-center absolute right-4 bottom-1">
              <img src={ICONS.tickMark} alt="" className="" />
            </div>
          </div>
          <div>
            <h1 className="text-neutral-5 font-semibold text-2xl mt-2">
              John Smith
            </h1>
            <h2 className="text-neutral-5e text-sm mt-2">Tutor Id : {id}</h2>
            <p className="text-neutral-20 mt-3 max-w-[500px] 2xl:max-w-[800px] hidden lg:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus
              incidunt eum asperiores quisquam omnis facilis voluptates iste
              dolorum nam cumque esse sit doloribus temporibus
            </p>
          </div>
        </div>

        <p className="text-neutral-20 block lg:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus
          incidunt eum asperiores quisquam omnis facilis voluptates iste dolorum
          nam cumque esse sit doloribus temporibus
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            label="Suspend Guardian"
            variant="quaternary"
            className="py-2 lg:py-2 px-3 lg:px-3 w-fit flex-row-reverse items-center justify-center hover:bg-primary-10/90 hover:text-white"
            iconWithoutBg={ICONS.suspend}
            onClick={() => setIsSuspendGuardianModalOpen(true)}
          />
          <Button
            type="button"
            label="Go Back"
            variant="tertiary"
            className="py-2 lg:py-2 px-3 lg:px-3 w-fit flex-row-reverse items-center justify-center hover:bg-primary-10/90 hover:text-white"
          />
        </div>
      </div>

      <p className="text-neutral-10 text-lg font-medium border-b pb-2 border-primary-10 mt-2">
        Personal and Posted Jobs
      </p>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex flex-col gap-3 bg-white p-5 rounded-2xl shadow-sm w-full lg:w-[45%] xl:w-[30%] h-fit">
          {details.map((item, index) => {
            const provided = isProvided(item.value);

            return (
              <div
                key={index}
                className="flex text-[13px] md:text-sm lg:text-base"
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

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 w-full lg:w-[55%] xl:w-[70%]">
          {[1, 2, 3].map((_, index) => (
            <JobCard key={index} variant="guardian" status="pending" />
          ))}
        </div>
      </div>

      <SuspendGuardianModal
        selectedGuardianId={id as string}
        isSuspendUserModalOpen={isSuspendGuardianModalOpen}
        setIsSuspendUserModalOpen={setIsSuspendGuardianModalOpen}
      />
    </div>
  );
};

export default GuardianProfile;
