import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import UpdateContactInfoForm from "../../../../components/Dashboard/Settings/UpdateContactInfoForm/UpdateContactInfoForm";
import ChangePasswordForm from "../../../../components/Dashboard/Settings/ChangePasswordForm/ChangePasswordForm";
import ProfileVerificationForm from "../../../../components/Dashboard/Settings/ProfileVerificationForm/ProfileVerificationForm";
import ProfileStatusForm from "../../../../components/Dashboard/Settings/ProfileStatusForm/ProfileStatusForm";
import { RiContactsBook3Line, RiLockPasswordLine } from "react-icons/ri";
import { PiIdentificationBadge } from "react-icons/pi";
import { FiUnlock } from "react-icons/fi";
import DeleteAccount from "../../../../components/Dashboard/Settings/DeleteAccount/DeleteAccount";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import { useUser } from "../../../../contexts/UserContext";

const Settings = () => {
  const { user: myProfile, isLoading } = useUser();
  const profileStatus = myProfile?.profileStatus;
  const isVerified = myProfile?.isVerified;

  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [activeTab, setActiveTab] = useState<string>(
    user?.role === "admin" ? "Change Password" : "Contact Info"
  );
  const adminSettingsTabs = [
    {
      title: "Change Password",
      description: "Update your password to be secure.",
      icon: <RiLockPasswordLine />,
    },
  ];

  const guardianAndTutorSettingsTabs = [
    {
      title: "Contact Info",
      description: "Manage your contact details.",
      icon: <RiContactsBook3Line />,
    },
    {
      title: "Change Password",
      description: "Update your password to be secure.",
      icon: <RiLockPasswordLine />,
    },
    {
      title: "Profile Verification",
      description: "Verify your profile to gain full access.",
      icon: <PiIdentificationBadge />,
    },
    {
      title: "Profile Lock/Unlock",
      description: "Lock or unlock your profile for privacy.",
      icon: <FiUnlock />,
    },
    {
      title: "Delete Account",
      description: "Delete your account.",
      icon: <BsTrash />,
    },
  ];

  return (
    <div className="font-Nunito">
      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(user?.role === "admin"
          ? adminSettingsTabs
          : guardianAndTutorSettingsTabs
        ).map((role) => {
          const isActive = role?.title === activeTab;
          return (
            <button
              key={role?.title}
              onClick={() => {
                setActiveTab(role?.title);
                document
                  .getElementById(role?.title)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
              className={`relative border py-3 md:py-4 px-3 md:px-5 rounded-xl text-start flex flex-col-reverse xl:flex-row items-center justify-between gap-3 xl:gap-6 cursor-pointer transform duration-300 shadow-xs ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-primary-10 border-primary-10 text-white"
                  : "bg-white border border-primary-40/10 text-neutral-10 hover:bg-neutral-50/20"
              }`}
            >
              {/* Tick mark positioned above */}
              {isActive && (
                <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 to-primary-10 border border-white flex items-center justify-center absolute -top-3 -right-2 ">
                  <FaCheck
                    className="transform text-white text-xs"
                    title="Selected"
                  />
                </div>
              )}

              <div className="flex-1">
                <h1 className="font-semibold text-sm lg:text-lg">
                  {role?.title}
                </h1>
                <p className="text-xs lg:text-sm mt-1 lg:mt-[6px]">
                  {role?.description}
                </p>
              </div>
              <div className="size-12 md:size-16 text-2xl rounded-full bg-neutral-20/10 flex items-center justify-center">
                {role?.icon}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-primary-40/10 mt-10 py-7 px-5">
        <div id="Contact Info">
          {activeTab === "Contact Info" && <UpdateContactInfoForm />}
        </div>

        <div id="Change Password">
          {activeTab === "Change Password" && <ChangePasswordForm />}
        </div>

        <div id="Profile Verification">
          {activeTab === "Profile Verification" && (
            <ProfileVerificationForm isVerified={isVerified} hasRequestedToVerify={myProfile?.hasRequestedToVerify} />
          )}
        </div>

        <div id="Profile Lock/Unlock">
          {activeTab === "Profile Lock/Unlock" && (
            <ProfileStatusForm
              profileStatus={profileStatus}
              isLoading={isLoading}
            />
          )}
        </div>

        <div id="Delete Account">
          {activeTab === "Delete Account" && <DeleteAccount />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
