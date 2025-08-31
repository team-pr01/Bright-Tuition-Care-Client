import PersonalInfo from "../../../../components/Dashboard/MyProfilePage/PersonalInfo/PersonalInfo";
import ProfileDetails from "../../../../components/Dashboard/MyProfilePage/ProfileDetails/ProfileDetails";
import TuitionRelatedInfo from "../../../../components/Dashboard/MyProfilePage/TuitionRelatedInfo/TuitionRelatedInfo";
import { RiContactsBook3Line } from "react-icons/ri";
import { PiIdentificationBadge } from "react-icons/pi";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
import { useState } from "react";
import { FaChalkboardTeacher, FaCheck } from "react-icons/fa";
import EducationalInfo from "../../../../components/Dashboard/MyProfilePage/EducationalInfo/EducationalInfo";
import EmergencyInfo from "../../../../components/Dashboard/MyProfilePage/EmergencyInfo/EmergencyInfo";
import CredentialsInfo from "../../../../components/Dashboard/MyProfilePage/CredentialsInfo/CredentialsInfo";
import ProfileTabHeading from "../../../../components/Reusable/ProfileTabHeading/ProfileTabHeading";
import Modal from "../../../../components/Reusable/Modal/Modal";
import UpdatePersonalInfoModal from "../../../../components/Dashboard/MyProfilePage/PersonalInfo/UpdatePersonalInfoModal";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
  const location = useLocation();
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
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
    },

    educationalInfo: [
      {
        degree: "BSC in Computer Science and Engineering",
        info: {
          institute: "CCN Polytechnic Institute",
          examDegreeTitle: "Diploma in Computer Engineering",
          majorGroup: "Computer Science and Engineering (CSE)",
          idCardNo: "582693",
          result: "3.81",
          curriculum: "Bangla Version",
          fromDate: "2020-08-01",
          toDate: "2024-08-01",
          yearOfPassing: 2024,
          currentInstitute: "No",
        },
      },
      {
        degree: "Secondary Education",
        info: {
          institute: "ABC High School",
          examDegreeTitle: "SSC",
          majorGroup: "Science",
          idCardNo: "123456",
          result: "4.75",
          curriculum: "Bangla Version",
          fromDate: "2014-01-01",
          toDate: "2020-06-30",
          yearOfPassing: 2020,
          currentInstitute: "No",
        },
      },
    ],

    emergencyInfo: {
      name: "",
      relation: "",
      number: "",
      address: "",
    },

    identityProofsInfo: [
      {
        documentType: "SSC Certificate",
        imageUrl: "https://i.ibb.co.com/391Jr7r4/cloud-security3.pngE",
      },
      {
        documentType: "NID Card",
        imageUrl:
          "https://i.ibb.co.com/JWyDbXS9/thanks-popup-screen-login-sign-260nw-2237153683.webp",
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<string>("personalInfo");

  const tutorProfileTabs = [
    {
      title: "Personal",
      key: "personalInfo",
      icon: <RiContactsBook3Line />,
    },
    {
      title: "Tuition Related",
      key: "tuitionRelatedInfo",
      icon: <FaChalkboardTeacher />,
    },
    {
      title: "Educational",
      key: "educationalInfo",
      icon: <PiIdentificationBadge />,
    },
    {
      title: "Emergency",
      key: "emergencyInfo",
      icon: <FiAlertCircle />,
    },
    {
      title: "Credential",
      key: "credentialInfo",
      icon: <FiFileText />,
    },
  ];

  const guardianProfileTabs = [
    {
      title: "Personal",
      key: "personalInfo",
      icon: <RiContactsBook3Line />,
    },
    {
      title: "Emergency",
      key: "emergencyInfo",
      icon: <FiAlertCircle />,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-5 font-Nunito w-full">
      <ProfileDetails />

      <div className="w-full lg:w-[75%]">
        {/* Tabs */}
        <div className="flex overflow-x-auto pt-3 text-nowrap gap-2">
          {(location.pathname.startsWith("/dashboard/tutor")
            ? tutorProfileTabs
            : guardianProfileTabs
          )?.map((tab) => {
            const isActive = tab?.key === activeTab;

            return (
              <button
                key={tab?.key}
                onClick={() => setActiveTab(tab?.key)}
                type="button"
                className={`flex-shrink-0 w-auto md:w-52 relative border py-4 px-5 rounded-xl text-start flex items-center justify-between gap-6 cursor-pointer transform duration-300 shadow-xs ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-primary-10 border-primary-10 text-white"
                    : "bg-white border border-primary-40/10 text-neutral-10 hover:bg-neutral-50/20"
                }`}
              >
                {/* Tick mark above */}
                {isActive && (
                  <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 to-primary-10 border border-white flex items-center justify-center absolute -top-3 -right-2">
                    <FaCheck
                      className="transform text-white text-xs"
                      title="Selected"
                    />
                  </div>
                )}

                <div>
                  <h1 className="font-semibold text-base md:text-lg">
                    {tab?.title}
                  </h1>
                  <p className="text-xs md:text-sm">Information</p>
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
              <div className="border-b border-neutral-30/20 pb-5 mb-4">
                <ProfileTabHeading
                  heading="Overview"
                  onClick={() => setIsFormModalOpen(!isFormModalOpen)}
                />
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
          {activeTab === "tuitionRelatedInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <TuitionRelatedInfo
                tuitionRelatedInfo={profile.tuitionRelatedInfo}
              />
            )}

          {activeTab === "educationalInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <EducationalInfo educationalInfo={profile.educationalInfo} />
            )}
          {activeTab === "emergencyInfo" && (
            <EmergencyInfo emergencyInfo={profile.emergencyInfo} />
          )}
          {activeTab === "credentialInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <CredentialsInfo credentialInfo={profile.identityProofsInfo} />
            )}
        </div>
      </div>

      <Modal
        heading="Update Personal Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] md:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdatePersonalInfoModal setIsFormModalOpen={setIsFormModalOpen} />
      </Modal>
    </div>
  );
};

export default MyProfile;
