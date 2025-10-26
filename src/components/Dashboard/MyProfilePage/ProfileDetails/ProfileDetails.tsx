/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { useUpdateTutorProfileInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import { FaUpload, FaPen, FaCheck } from "react-icons/fa";

const ProfileDetails = ({ data }: { data: any }) => {
  const [updateTutorProfileInfo, { isLoading }] =
    useUpdateTutorProfileInfoMutation();
  const user = useSelector(useCurrentUser);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    await updateTutorProfileInfo(formData);
  };

  const contactInfo = [
    {
      icon: ICONS.emailBlue,
      label: "Email",
      value: data?.userId?.email,
    },
    {
      icon: ICONS.phoneBlue,
      label: "Phone Number",
      value: data?.userId?.phoneNumber,
    },
    {
      icon: ICONS.locationBlue,
      label: "Address",
      value: data?.personalInformation?.address,
    },
  ];

  return (
    <div className="bg-white border border-primary-40/10 p-5 rounded-2xl w-full lg:w-[25%] flex flex-col gap-6 font-Nunito">
      <div className="flex flex-col items-center justify-center">
        {/* PROFILE IMAGE CONTAINER */}
        <div className="relative group">
          <div className="size-32 rounded-full relative">
            <div className="bg-white/40 rounded-full p-[2px] size-full">
              <img
                src={data?.imageUrl || IMAGES.dummyAvatar}
                alt="profile"
                className="size-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* UPLOAD/EDIT BUTTON - Bottom center with better styling */}
          <div className="absolute bottom-0 right-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageUpload"
              disabled={isLoading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                await handleImageUpload(file);
              }}
            />

            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                document.getElementById("profileImageUpload")?.click()
              }
              className="bg-primary-10 hover:bg-primary-10/80 size-7 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white cursor-pointer"
              title={data?.imageUrl ? "Edit photo" : "Upload photo"}
            >
              {isLoading ? (
                <span className="text-white">...</span>
              ) : data?.imageUrl ? (
                <FaPen className="text-white text-xs" />
              ) : (
                <FaUpload className="text-white text-xs" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          <h1 className="text-neutral-5e font-semibold text-center text-xl">
            {data?.userId?.name}
          </h1>
          {/* VERIFIED TICK - Top right corner */}
          {!data?.isVerified && (
            <div className="bg-primary-10 shadow-2xl size-5 rounded-full flex items-center justify-center border-2 border-white">
              <FaCheck className="text-white text-[10px]" />
            </div>
          )}
        </div>
        <h2 className="text-neutral-5e text-sm text-center mt-2 capitalize">
          {user?.role} Id : {data?.tutorId || data?.guardianId}
        </h2>
      </div>

      {/* PROFILE COMPLETION */}
      <div>
        <div className="bg-accent-25 py-2 px-5 text-accent-30 rounded-lg text-center text-sm">
          Profile Completed {data?.profileCompleted}%
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="flex flex-col gap-3">
        {contactInfo?.map((info) => (
          <div key={info?.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-[6px]">
              <img src={info?.icon} alt="" className="size-5 mt-0 md:mt-1" />
              <p className="text-neutral-10 text-base md:text-lg font-semibold">
                {info?.label}
              </p>
            </div>
            <p className="text-neutral-20 text-sm md:text-base ml-6">
              {info?.value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      {user?.role !== "guardian" && (
        <div className="flex flex-col">
          <Button
            type="button"
            label="Download CV"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex-row-reverse items-center justify-center hover:bg-primary-10/90 hover:text-white"
            iconWithoutBg={ICONS.downloadWhite}
          />
          <Button
            type="button"
            label="View as Guardian or Student"
            variant="tertiary"
            className="py-2 lg:py-2 w-full flex-row-reverse items-center justify-center mt-3 hover:bg-primary-20 hover:text-primary-10"
            iconWithoutBg={ICONS.eyeBlue}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
