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
// import { useGetMyTutorProfileQuery } from "../../../../redux/Features/Tutor/tutorApi";
import TutorResumePDF from "../TutorsResume/TutorResumePDF";
import { pdf } from "@react-pdf/renderer";
import { useGetMeQuery } from "../../../../redux/Features/User/userApi";

const MyProfile = () => {
  const { data } = useGetMeQuery({});
  const myProfile = data?.data;
  const personalInformation = myProfile?.personalInformation;
  const socialMediaInformation = myProfile?.socialMediaInformation;
  const tuitionPreference = myProfile?.tuitionPreference;
  const experience = myProfile?.experience;
  const emergencyInformation = myProfile?.emergencyInformation;
  const educationalInformation = myProfile?.educationalInformation;
  const identityInformation = myProfile?.identityInformation;
  const location = useLocation();
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const profile = {
    tuitionRelatedInfo: {
      tutoringMethod: tuitionPreference?.tutoringMethod,
      tutoringStyles: tuitionPreference?.tuitionStyle, // []
      availableDays: tuitionPreference?.availableDays, // []
      time: `${tuitionPreference?.availableTime?.from} - ${tuitionPreference?.availableTime?.to}`,
      availableTime: {
        from: tuitionPreference?.availableTime?.from,
        to: tuitionPreference?.availableTime?.to,
      },
      expectedSalary: tuitionPreference?.expectedSalary,
      preferences: {
        preferredCategories: tuitionPreference?.preferredCategories, // []
        preferredClasses: tuitionPreference?.preferredClasses, // []
        preferredSubjects: tuitionPreference?.preferredSubjects,
        placeOfTuition: tuitionPreference?.placeOfTuition, // []
        preferredLocation: tuitionPreference?.preferredLocation,
      },
      experience: {
        total: experience?.totalExperience,
        details: experience?.experienceDetails,
      },
    },

    personalInfo: {
      overview: personalInformation?.overview,
      name: myProfile?.userId?.name,
      email: myProfile?.userId?.email,
      phoneNumber: myProfile?.userId?.phoneNumber,
      additionalPhoneNumber: personalInformation?.additionalPhoneNumber,
      city: myProfile?.userId?.city,
      area: myProfile?.userId?.area,
      address: personalInformation?.address,
      gender: myProfile?.userId?.gender,
      dateOfBirth: personalInformation?.dateOfBirth,
      religion: personalInformation?.religion,
      nationality: personalInformation?.nationality,
      fatherName: personalInformation?.fatherName,
      fatherPhoneNumber: personalInformation?.fatherPhoneNumber,
      motherName: personalInformation?.motherName,
      motherPhoneNumber: personalInformation?.motherPhoneNumber,

      socialMediaInformation: {
        facebook: socialMediaInformation?.facebook,
        instagram: socialMediaInformation?.instagram,
        linkedin: socialMediaInformation?.linkedin,
      },
    },

    educationalInfo: educationalInformation,

    emergencyInfo: {
      name: emergencyInformation?.emergencyContactPersonName,
      relation: emergencyInformation?.relation,
      number: emergencyInformation?.phoneNumber,
      address: emergencyInformation?.address,
    },

    identityInformation: identityInformation,
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

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadResume = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<TutorResumePDF profile={myProfile} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Tutor_Resume_${myProfile?.userId?.name || "resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 font-Nunito w-full">
      <ProfileDetails
        data={myProfile}
        isGenerating={isGenerating}
        handleDownloadResume={handleDownloadResume}
      />

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
                  heading={
                    myProfile?.userId?.role === "tutor"
                      ? "Overview"
                      : "Profile Overview"
                  }
                  onClick={() => setIsFormModalOpen(!isFormModalOpen)}
                  isProfileLocked={myProfile?.profileStatus === "locked"}
                />
                <p
                  className={`text-neutral-45 ${
                    myProfile?.userId?.role === "tutor" ? "mt-3" : "mt-0"
                  }`}
                >
                  {profile?.personalInfo?.overview}
                </p>
              </div>

              <PersonalInfo personalInfo={profile.personalInfo} />
            </>
          )}
          {activeTab === "tuitionRelatedInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <TuitionRelatedInfo
                tuitionRelatedInfo={profile.tuitionRelatedInfo}
                isProfileLocked={myProfile?.profileStatus === "locked"}
              />
            )}

          {activeTab === "educationalInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <EducationalInfo
                educationalInfo={profile?.educationalInfo}
                isProfileLocked={myProfile?.profileStatus === "locked"}
              />
            )}
          {activeTab === "emergencyInfo" && (
            <EmergencyInfo
              emergencyInfo={profile.emergencyInfo}
              isProfileLocked={myProfile?.profileStatus === "locked"}
            />
          )}
          {activeTab === "credentialInfo" &&
            location.pathname.startsWith("/dashboard/tutor") && (
              <CredentialsInfo
                identityInformation={profile?.identityInformation}
                isProfileLocked={myProfile?.profileStatus === "locked"}
              />
            )}
        </div>
      </div>

      <Modal
        heading="Update Personal Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] xl:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdatePersonalInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
          defaultValues={profile.personalInfo}
        />
      </Modal>
    </div>
  );
};

export default MyProfile;
