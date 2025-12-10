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
import { useParams } from "react-router-dom";

const Settings = () => {
  const { slug } = useParams();
  const { user: myProfile, isLoading } = useUser();
  const profileStatus = myProfile?.profileStatus;
  const isVerified = myProfile?.isVerified;

  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const getDefaultTab = () => {
    if (slug) return slug;
    if (user?.role === "admin" || user?.role === "staff") {
      return "change-password";
    }
    return "contact-info";
  };
  const [activeTab, setActiveTab] = useState<string>(getDefaultTab);
  
  const adminSettingsTabs = [
    {
      key: "change-password",
      title: "Change Password",
      description: "Update your password to be secure.",
      icon: <RiLockPasswordLine />,
    },
  ];

  const guardianAndTutorSettingsTabs = [
    {
      key: "contact-info",
      title: "Contact Info",
      description: "Manage your contact details.",
      icon: <RiContactsBook3Line />,
    },
    {
      key: "change-password",
      title: "Change Password",
      description: "Update your password to be secure.",
      icon: <RiLockPasswordLine />,
    },
    {
      key: "profile-verification",
      title: "Profile Verification",
      description: "Verify your profile to gain full access.",
      icon: <PiIdentificationBadge />,
    },
    {
      key: "profile-status",
      title: "Profile Lock/Unlock",
      description: "Lock or unlock your profile for privacy.",
      icon: <FiUnlock />,
    },
    {
      key: "delete-account",
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
          : user?.role === "staff"
          ? adminSettingsTabs
          : guardianAndTutorSettingsTabs
        ).map((role) => {
          const isActive = role?.key === activeTab;
          return (
            <button
              key={role?.key}
              onClick={() => {
                setActiveTab(role?.key);
                document
                  .getElementById(role?.key)
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
        <div id="contact-info">
          {activeTab === "contact-info" && <UpdateContactInfoForm />}
        </div>

        <div id="change-password">
          {activeTab === "change-password" && <ChangePasswordForm />}
        </div>

        <div id="profile-verification">
          {activeTab === "profile-verification" && (
            <ProfileVerificationForm
              isVerified={isVerified}
              hasRequestedToVerify={myProfile?.hasRequestedToVerify}
            />
          )}
        </div>

        <div id="profile-status">
          {activeTab === "profile-status" && (
            <ProfileStatusForm
              profileStatus={profileStatus}
              isLoading={isLoading}
            />
          )}
        </div>

        <div id="delete-account">
          {activeTab === "delete-account" && <DeleteAccount />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
