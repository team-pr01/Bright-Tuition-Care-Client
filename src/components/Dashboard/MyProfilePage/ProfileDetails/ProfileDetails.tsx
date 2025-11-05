/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { FaUpload, FaPen, FaCheck } from "react-icons/fa";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "../../../../redux/Features/User/userApi";

const ProfileDetails = ({
  data,
  isGenerating,
  handleDownloadResume,
}: {
  data: any;
  isGenerating: boolean;
  handleDownloadResume: () => void;
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const user = useSelector(useCurrentUser) as TLoggedInUser;

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profileCompleted", "5");
    formData.append("file", file);
    await updateProfile(formData);
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
  // Add these helper functions to your component
  const getProgressColor = (percentage = 0) => {
    const progress = percentage ?? 0;

    if (progress >= 100) {
      return {
        from: "#10B981",
        to: "#059669",
        glow: "#10B981",
        step: "bg-green-500",
        badge: "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
        pulse: "bg-green-400",
        text: "text-green-700",
      };
    } else if (progress >= 80) {
      return {
        from: "#34D399",
        to: "#10B981",
        glow: "#34D399",
        step: "bg-green-400",
        badge: "bg-gradient-to-br from-green-400 to-green-500 text-white",
        pulse: "bg-green-300",
        text: "text-green-600",
      };
    } else if (progress >= 60) {
      return {
        from: "#FBBF24",
        to: "#F59E0B",
        glow: "#FBBF24",
        step: "bg-yellow-400",
        badge: "bg-gradient-to-br from-yellow-400 to-amber-500 text-black",
        pulse: "bg-yellow-300",
        text: "text-amber-700",
      };
    } else if (progress >= 40) {
      return {
        from: "#FB923C",
        to: "#F97316",
        glow: "#FB923C",
        step: "bg-orange-400",
        badge: "bg-gradient-to-br from-orange-400 to-orange-500 text-white",
        pulse: "bg-orange-300",
        text: "text-orange-700",
      };
    } else {
      return {
        from: "#EF4444",
        to: "#DC2626",
        glow: "#EF4444",
        step: "bg-red-500",
        badge: "bg-gradient-to-br from-red-500 to-red-600 text-white",
        pulse: "bg-red-400",
        text: "text-red-700",
      };
    }
  };

  const getProgressIcon = (percentage = 0) => {
    const progress = percentage ?? 0;
    if (progress >= 100) return "✓";
    if (progress >= 80) return "👏";
    if (progress >= 60) return "👍";
    if (progress >= 40) return "📝";
    return "⚡";
  };

  const getProgressMessage = (percentage = 0) => {
    const progress = percentage ?? 0;
    if (progress >= 100) return "Profile Complete!";
    if (progress >= 80) return "Almost There!";
    if (progress >= 60) return "Good Progress";
    if (progress >= 40) return "Getting There";
    return "Get Started";
  };

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

      {/* PROFILE COMPLETION - ENHANCED VERSION */}
      {data?.userId?.role === "tutor" && (
        <div className="relative">
          {/* Progress Bar Container */}
          <div className="relative bg-gray-200 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
            {/* Animated Progress Fill */}
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${data?.profileCompleted ?? 0}%`,
                background: `linear-gradient(90deg,
          ${getProgressColor(data?.profileCompleted).from} 0%,
          ${getProgressColor(data?.profileCompleted).to} 100%)`,
                boxShadow: `0 0 10px ${
                  getProgressColor(data?.profileCompleted).glow
                }`,
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>

            {/* Progress Steps */}
            <div className="absolute inset-0 flex justify-between items-center px-2">
              {[0, 25, 50, 75, 100].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    (data?.profileCompleted ?? 0) >= step
                      ? getProgressColor(data?.profileCompleted).step
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              {/* Animated Icon */}
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${getProgressColor(data?.profileCompleted).badge} 
          shadow-lg transition-all duration-500`}
                >
                  <span className="text-sm font-bold">
                    {getProgressIcon(data?.profileCompleted)}
                  </span>

                  {/* Pulse Animation for incomplete profiles */}
                  {(data?.profileCompleted ?? 0) < 100 && (
                    <div
                      className={`absolute inset-0 rounded-full animate-ping 
              ${getProgressColor(data?.profileCompleted).pulse}`}
                    ></div>
                  )}
                </div>
              </div>

              {/* Text Display */}
              <div className="">
                <div
                  className={`text-sm font-semibold transition-colors duration-300
          ${getProgressColor(data?.profileCompleted).text}`}
                >
                  {getProgressMessage(data?.profileCompleted)}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {data?.profileCompleted ?? 0}% Complete
                </div>
              </div>
            </div>
          </div>

          {/* Celebration Effect for 100% */}
          {(data?.profileCompleted ?? 0) >= 100 && (
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xs">🎉</span>
              </div>
            </div>
          )}
        </div>
      )}

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
            onClick={handleDownloadResume}
            type="button"
            label="Download CV"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex-row-reverse items-center justify-center hover:bg-primary-10/90 hover:text-white"
            iconWithoutBg={ICONS.downloadWhite}
            isLoading={isGenerating}
            isDisabled={isGenerating}
          />
          <Link to={`/dashboard/tutor/view/${data?._id}`}>
            <Button
              type="button"
              label="View as Guardian or Student"
              variant="tertiary"
              className="py-2 lg:py-2 w-full flex-row-reverse items-center justify-center mt-3 hover:bg-primary-20 hover:text-primary-10"
              iconWithoutBg={ICONS.eyeBlue}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
