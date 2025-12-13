/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { ICONS, IMAGES } from "../../../../assets";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetSingleTutorByIdQuery } from "../../../../redux/Features/Tutor/tutorApi";
import type { TEducation } from "../../../../types/tutor.types";
import toast from "react-hot-toast";
import {
  useAppointTutorMutation,
  useConfirmTutorMutation,
  useGetSingleApplicationByIdQuery,
  useRejectTutorMutation,
  useShortlistTutorMutation,
} from "../../../../redux/Features/Application/applicationApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import LogoLoader from "../../../../components/Reusable/LogoLoader/LogoLoader";
import TutorsIdentityInfo from "../../../../components/Shared/TutorsIdentityInfo/TutorsIdentityInfo";
import AdminControls from "./AdminControls";
import { useNotifyTutorViewedCVMutation } from "../../../../redux/Features/Notification/notificationApi";

const TutorsResume = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [shortlistTutor, { isLoading: isShortlisting }] =
    useShortlistTutorMutation();
  const [appointTutor, { isLoading: isAppointing }] = useAppointTutorMutation();
  const [rejectTutor, { isLoading: isRejecting }] = useRejectTutorMutation();
  const [confirmTutor, { isLoading: isConfirming }] = useConfirmTutorMutation();
  // const [cancelTutor, { isLoading: isCancelling }] = useCancelTutorMutation();
  const location = useLocation();
  const { tutorId, applicationId } = useParams();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const jobId = searchParams.get("jobId");
  const { data, isLoading } = useGetSingleTutorByIdQuery(tutorId);
  const [notifyTutorViewedCV] = useNotifyTutorViewedCVMutation();
  const profile = data?.data;
  const educationDetails = data?.data?.educationalInformation || [];
  const tuitionPreference = profile?.tuitionPreference;
  const personalInfo = profile?.personalInformation || {};

  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (!jobId || !tutorId) return;
    if (hasNotifiedRef.current) return;
    if (status !== "applied") return;

    hasNotifiedRef.current = true;

    const sendNotification = async () => {
      try {
        const payload = { jobId };
        await notifyTutorViewedCV({ data: payload, id: tutorId }).unwrap();
      } catch (error: any) {
        console.log(error?.data?.message);
      }
    };

    sendNotification();
  }, [jobId, tutorId, notifyTutorViewedCV]);

  const { data: applicationData, isLoading: isApplicationLoading } =
    useGetSingleApplicationByIdQuery(applicationId);
  const application = applicationData?.data;

  const isTutorOrGuardian = user?.role === "tutor" || user?.role === "guardian";

  const isRestrictedPath = location?.pathname.startsWith(
    "/dashboard/tutor/view"
  );

  const isRestrictedStatus =
    application?.status === "applied" ||
    application?.status === "withdrawn" ||
    application?.status === "shortlisted";

  const isContactDetailsHidden =
    isTutorOrGuardian && (isRestrictedPath || isRestrictedStatus);

  const educationData = educationDetails?.map((item: TEducation) => [
    { label: "Institute Name", value: item.instituteName || "N/A" },
    { label: "Degree", value: item.degree || "N/A" },
    { label: "Department", value: item.department || item.group || "N/A" },
    { label: "Curriculum", value: item.medium || "N/A" },
    { label: "Result", value: item.result || "N/A" },
    { label: "Year of Passing", value: item.passingYear || "N/A" },
  ]);

  const tuitionData = [
    {
      label: "Preferred Location",
      value: tuitionPreference?.preferredLocation,
    },
    {
      label: "Preferred Categories",
      value: Array.isArray(tuitionPreference?.preferredCategories)
        ? tuitionPreference?.preferredCategories.join(", ")
        : tuitionPreference?.preferredCategories,
    },
    {
      label: "Preferred Classes",
      value: Array.isArray(tuitionPreference?.preferredClasses)
        ? tuitionPreference?.preferredClasses.join(", ")
        : tuitionPreference?.preferredClasses,
    },
    {
      label: "Preferred Subjects",
      value: Array.isArray(tuitionPreference?.preferredSubjects)
        ? tuitionPreference?.preferredSubjects.join(", ")
        : tuitionPreference?.preferredSubjects,
    },
    {
      label: "Tutoring Method",
      value: tuitionPreference?.tutoringMethod,
    },
    {
      label: "Tuition Style",
      value: Array.isArray(tuitionPreference?.tuitionStyle)
        ? tuitionPreference?.tuitionStyle.join(", ")
        : tuitionPreference?.tuitionStyle,
    },
    {
      label: "Available Days",
      value: Array.isArray(tuitionPreference?.availableDays)
        ? tuitionPreference?.availableDays.join(", ")
        : tuitionPreference?.availableDays,
    },
    {
      label: "Available Time",
      value: tuitionPreference?.availableTime
        ? `${tuitionPreference?.availableTime.from} - ${tuitionPreference?.availableTime.to}`
        : null,
    },
    {
      label: "Expected Salary",
      value: tuitionPreference?.expectedSalary
        ? `${tuitionPreference?.expectedSalary} BDT`
        : null,
    },
  ];

  const filteredTuitionData = tuitionData?.filter(
    (item) => item?.value && item?.value !== ""
  );

  const personalData = [
    { label: "Gender", value: personalInfo?.gender || "N/A" },
    { label: "Religion", value: personalInfo?.religion || "N/A" },
    { label: "Nationality", value: personalInfo?.nationality || "N/A" },
    {
      label: "Date of Birth",
      value: personalInfo?.dateOfBirth
        ? new Date(personalInfo?.dateOfBirth).toLocaleDateString()
        : "N/A",
    },
    { label: "Father's Name", value: personalInfo?.fatherName || "N/A" },
    {
      label: "Father's Phone",
      value: !isContactDetailsHidden
        ? personalInfo?.fatherPhoneNumber || "N/A"
        : "N/A",
    },
    { label: "Mother's Name", value: personalInfo?.motherName || "N/A" },
    {
      label: "Mother's Phone",
      value: !isContactDetailsHidden
        ? personalInfo?.motherPhoneNumber || "N/A"
        : "N/A",
    },
    {
      label: "Additional Phone",
      value: !isContactDetailsHidden
        ? personalInfo?.additionalPhoneNumber || "N/A"
        : "N/A",
    },
    { label: "Address", value: personalInfo?.address || "N/A" },
  ];

  const filteredPersonalData = personalData?.filter(
    (item) => item?.value && item?.value !== "N/A"
  );

  // Handle Shortlist
  const handleShortlistTutor = async () => {
    try {
      const response = await shortlistTutor({ id: applicationId }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Tutor shortlisted successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error shortlisting tutor. Please try again."
      );
    }
  };

  // Handle Appoint
  const handleAppointTutor = async () => {
    try {
      const response = await appointTutor({ id: applicationId }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Tutor appointed successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error appointing tutor. Please try again."
      );
    }
  };

  // Handle Reject
  const handleRejectTutor = async () => {
    try {
      const response = await rejectTutor({ id: applicationId }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Tutor Rejected.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error rejecting tutor. Please try again."
      );
    }
  };

  // Handle Confirm
  const handleConfirmTutor = async () => {
    try {
      const payload = { selectedTutor: tutorId };
      const response = await confirmTutor({
        id: applicationId,
        data: payload,
      }).unwrap();
      if (response?.success) {
        toast.success(response.message || "Tutor confirmed successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error confirming tutor. Please try again."
      );
    }
  };

  // Handle Cancel
  // const handleCancelTutor = async () => {
  //   try {
  //     const payload = { selectedTutor: tutorId };
  //     const response = await cancelTutor({
  //       id: applicationId,
  //       data: payload,
  //     }).unwrap();
  //     if (response?.success) {
  //       toast.success(response.message || "Tutor cancelled successfully.");
  //     }
  //   } catch (error: any) {
  //     toast.error(
  //       error?.data?.message || "Error cancelling tutor. Please try again."
  //     );
  //   }
  // };
  const buttonStyle = "py-[6px] lg:py-[6px] px-3 lg:px-2 text-sm lg:text-sm";

  if (isLoading || isApplicationLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-Nunito">
        <LogoLoader />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow rounded-xl max-w-[1000px] mx-auto p-5 font-Nunito">
        {/* profile and overview */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
          <div className="flex gap-5 w-full">
            <div className="relative">
              <img
                src={profile?.imageUrl || IMAGES.userProfilePlaceholder}
                alt=""
                className="size-20 lg:size-56 object-cover rounded-xl"
              />
              {profile?.isVerified && (
                <div className="size-10 rounded-full flex items-center justify-center absolute -right-5 -bottom-4">
                  <img src={ICONS.blueVerifiedBlue} alt="verified" />
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl lg:text-2xl font-semibold text-neutral-10">
                    {profile?.userId?.name}
                  </h1>
                  <p className="text-neutral-10 mt-1 text-sm md:text-base">
                    <strong>Tutor Id:</strong> {profile?.tutorId} |{" "}
                    <strong>Rating:</strong> {profile?.rating}/5
                  </p>
                  {!isContactDetailsHidden && (
                    <p className="text-neutral-10 mt-1 text-sm md:text-base">
                      <strong>Phone Number:</strong>{" "}
                      {profile?.userId?.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Admin controlls */}
                <div className="hidden lg:flex">
                  <AdminControls
                    location={location}
                    user={user}
                    profile={profile}
                    isShortlisting={isShortlisting}
                    isAppointing={isAppointing}
                    isConfirming={isConfirming}
                    isRejecting={isRejecting}
                    handleShortlistTutor={handleShortlistTutor}
                    handleAppointTutor={handleAppointTutor}
                    handleRejectTutor={handleRejectTutor}
                    handleConfirmTutor={handleConfirmTutor}
                    buttonStyle={buttonStyle}
                    status={status as string}
                  />
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
          {/* Admin controlls */}
          <div className="flex lg:hidden mt-4">
            <AdminControls
              location={location}
              user={user}
              profile={profile}
              isShortlisting={isShortlisting}
              isAppointing={isAppointing}
              isConfirming={isConfirming}
              isRejecting={isRejecting}
              handleShortlistTutor={handleShortlistTutor}
              handleAppointTutor={handleAppointTutor}
              handleRejectTutor={handleRejectTutor}
              handleConfirmTutor={handleConfirmTutor}
              buttonStyle={buttonStyle}
              status={status as string}
            />
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-5 pb-2 border-b border-neutral-55/50">
            Education
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0">
            {educationData.map((edu: TEducation[], eduIndex: number) => (
              <div key={eduIndex}>
                <h2 className="font-bold text-neutral-10 mt-4">
                  • {educationDetails[eduIndex]?.degree || "Education"}
                </h2>

                <div className="text-neutral-20 grid grid-cols-[150px_20px_1fr] gap-y-2 mt-3">
                  {edu?.map((item: any, index: number) => (
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

          <div className="text-neutral-20 grid grid-cols-[140px_20px_1fr] md:grid-cols-[180px_20px_1fr] gap-y-2 mt-4">
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

        {/* Identity Info */}
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-8 pb-2 border-b border-neutral-55/50 mb-4">
            Credentials Information
          </h2>

          <TutorsIdentityInfo
            identityInformation={profile?.identityInformation}
            variant="admin"
          />
        </div>
      </div>
    </>
  );
};

export default TutorsResume;
