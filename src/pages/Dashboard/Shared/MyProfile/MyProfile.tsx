import { RiContactsBook3Line, RiLockPasswordLine } from "react-icons/ri";
import PersonalInfo from "../../../../components/Dashboard/MyProfilePage/PersonalInfo/PersonalInfo";
import ProfileDetails from "../../../../components/Dashboard/MyProfilePage/ProfileDetails/ProfileDetails";
import TuitionRelatedInfo from "../../../../components/Dashboard/MyProfilePage/TuitionRelatedInfo/TuitionRelatedInfo";
import { PiIdentificationBadge } from "react-icons/pi";
import { FiUnlock } from "react-icons/fi";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const MyProfile = () => {
  const profile = {
    tuitionRelatedInfo: {
      tutoringMethod:
        "I take tuition in such a way so that the student whom I am teaching understands what I am teaching.",
      tutoringStyles: ["One to One", "Online Tutoring"],
      availableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      time: "5:00 PM - 8:50 PM",
      location: {
        city: "Cumilla",
        area: "Cumilla Cantonment",
      },
      expectedSalary: 5000,
      preferences: {
        preferredCategories: "",
        preferredClasses: "",
        preferredSubjects: "",
        placeOfTutoring: "",
        preferredLocations: ["Cumilla Cantonment"],
      },
      experience: {
        total: "",
        details: "",
      },
    },

    personalInfo: {
      email: "rahulsd380@gmail.com",
      additionalNumber: "",
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
    },
  };

  const [activeTab, setActiveTab] = useState<string>("personalInfo");
  const profileTabs = [
    {
      title: "Personal",
      key: "personalInfo",
      icon: <RiContactsBook3Line />,
    },
    {
      title: "Tuition Related",
      key: "tuitionRelatedInfo",
      icon: <RiLockPasswordLine />,
    },
    {
      title: "Educational",
      key: "educationalInfo",
      icon: <PiIdentificationBadge />,
    },
    {
      title: "Emergency",
      key: "emergencyInfo",
      icon: <FiUnlock />,
    },
    {
      title: "Credential",
      key: "credentialInfo",
      icon: <FiUnlock />,
    },
  ];

  return (
    <div className="flex gap-5 font-Nunito">
      <ProfileDetails />

      <div className="w-[75%]">
        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {profileTabs?.map((tab) => {
            const isActive = tab?.key === activeTab;
            return (
              <button
                key={tab?.title}
                onClick={() => setActiveTab(tab?.key)}
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
                  <h1 className="font-semibold text-lg">{tab?.title}</h1>
                  <p className="text-sm">Information</p>
                </div>
                <div className="size-8 rounded-full bg-neutral-20/10 flex items-center justify-center">
                  {tab?.icon}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white border border-primary-40/10 p-5 rounded-2xl mt-5">
          {activeTab === "personalInfo" && (
            <>
              <div className="border-b border-neutral-30/20 pb-5">
                <h1 className="text-neutral-5 font-semibold text-2xl">
                  Overview
                </h1>
                <p className="text-neutral-45 mt-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore modi ad consequuntur ea. Distinctio velit atque
                  corporis labore quis commodi est necessitatibus fugiat
                  adipisci dicta consequatur cum dignissimos quasi debitis
                  laboriosam doloremque laborum eos consequuntur, hic quidem?
                  Mollitia blanditiis, assumenda voluptatem velit dolores aut,
                  cumque numquam alias maxime itaque ipsa?
                </p>
              </div>

              <PersonalInfo personalInfo={profile.personalInfo} />
            </>
          )}
          {activeTab === "tuitionRelatedInfo" && (
            <TuitionRelatedInfo
              tuitionRelatedInfo={profile.tuitionRelatedInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
