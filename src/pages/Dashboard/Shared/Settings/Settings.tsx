import { useState } from "react";
import { IMAGES } from "../../../../assets";
import { FaCheck } from "react-icons/fa";
import UpdateContactInfoForm from "../../../../components/Dashboard/Settings/UpdateContactInfoForm/UpdateContactInfoForm";
import ChangePasswordForm from "../../../../components/Dashboard/Settings/ChangePasswordForm/ChangePasswordForm";


const Settings = () => {
  
  const [activeTab, setActiveTab] = useState<string>("Contact Info");
  const settingsTabs = [
    {
      title: "Contact Info",
      description: "Manage your contact details.",
      icon: IMAGES.guardian,
    },
    {
      title: "Change Password",
      description: "Update your password to keep account secure.",
      icon: IMAGES.teacher,
    },
    {
      title: "Profile Verification",
      description: "Verify your profile to gain full access.",
      icon: IMAGES.teacher,
    },
    {
      title: "Profile Lock/Unlock",
      description: "Lock or unlock your profile for privacy.",
      icon: IMAGES.teacher,
    },
  ];

  

  return (
    <div className="font-Nunito">
      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
        {settingsTabs?.map((role) => {
          const isActive = role?.title === activeTab;
          return (
            <button
              key={role?.title}
              onClick={() => setActiveTab(role?.title)}
              type="button"
              className={`relative border py-4 px-5 rounded-xl text-start flex items-center justify-between gap-6 cursor-pointer transform duration-300 shadow-xs ${
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

              <div>
                <h1 className="font-semibold text-lg">{role?.title}</h1>
                <p className="text-sm mt-[6px]">{role?.description}</p>
              </div>
              <div className="size-16 rounded-full bg-neutral-20/10 flex items-center justify-center">
                <img src={role?.icon} alt="" className="size-11" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-primary-40/10 mt-10 py-7 px-5">
        {
            activeTab === "Contact Info" && <UpdateContactInfoForm />
        }
        {
            activeTab === "Change Password" && <ChangePasswordForm />
        }
      </div>
    </div>
  );
};

export default Settings;
