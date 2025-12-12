/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import JobDetails from "../../JobDetails/JobDetails";
import JobApplyConfirmationModal from "../JobApplyConfirmationModal";
import ShareJobModal from "../../ShareJobModal";
import DeleteJobConfirmationModal from "../../../Reusable/DeleteJobConfirmationModal/DeleteJobConfirmationModal";
import { Link, useLocation } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";
import type { TJobs } from "../../../../types/job.types";
import { useUpdateJobMutation } from "../../../../redux/Features/Job/jobApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import { LuUser } from "react-icons/lu";
import { SlPhone } from "react-icons/sl";
import { formatDate } from "../../../../utils/formatDate";
import { FaRegFileAlt } from "react-icons/fa";

type TJobCardProps = {
  variant?: string;
  status?: string;
  detailsWidth?: string;
  job?: TJobs;
  appliedData?: any;
};
const JobCard: React.FC<TJobCardProps> = ({
  variant,
  status,
  detailsWidth = "max-w-full 2xl:max-w-[80%]",
  job,
  appliedData,
}) => {
  const pathname = useLocation().pathname;
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<"apply" | "undo">("apply");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const path = user?.role === "guardian" ? "guardian" : "admin";
  const role = user?.role;
  const [isShareJobModalOpen, setIsShareJobModalOpen] =
    useState<boolean>(false);
  const [isJobApplyConfirmationModalOpen, setIsJobApplyConfirmationModalOpen] =
    useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const jobDetails = [
    // { icon: ICONS.tuitionType, title: "Tuition Type", value: "Home Tutoring" },
    {
      icon: ICONS.tutoringDays,
      title: "Tutoring Days",
      value: job?.tutoringDays,
    },
    { icon: ICONS.salary, title: "Salary", value: `${job?.salary} BDT` },
    {
      icon:
        job?.preferredTutorGender === "male"
          ? ICONS.male
          : job?.preferredTutorGender === "female"
          ? ICONS.preferredTutor
          : ICONS.gender,
      title: "Prefer Tutor",
      value: job?.preferredTutorGender,
    },
    // { icon: ICONS.subject, title: "Subjects", value: "Physics, Chemistry, Math" },
    // { icon: ICONS.location, title: "Location", value: "Mohammodpur" },
  ];

  const shareUrl = `http://localhost:5173/job-board/${job?.jobId}`;

  const statusTextColor =
    status === "applied"
      ? "text-neutral-10"
      : status === "shortlisted"
      ? "text-primary-10"
      : status === "appointed"
      ? "text-[#9C9700]"
      : status === "confirmed"
      ? "text-green-500"
      : "text-rose-500";

  const statusTextColorForGuardian =
    job?.status === "pending"
      ? "text-yellow-600"
      : job?.status === "cancelled"
      ? "text-red-600"
      : job?.status === "closed"
      ? "text-gray-500"
      : "text-green-500";
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState<boolean>(false);

  const [updateJob] = useUpdateJobMutation();

  const handleUpdateStatus = async (status: string) => {
    try {
      const payload = {
        status,
      };
      await toast.promise(updateJob({ id: job?._id, data: payload }).unwrap(), {
        loading: "Loading...",
        success: `Status updated to ${status}`,
        error: "Failed to update status. Please try again.",
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update status. Please try again."
      );
    }
  };

  const appliedApplication = job?.applications?.find(
    (app) => app?.userId?.toString() === user?._id?.toString()
  );

  const isApplied = Boolean(appliedApplication);
  const applicationId = appliedApplication?.applicationId;

  return (
    <>
      {/* Smooth Overlay & Drawer */}
      {showDrawer && (
        <JobDetails
          job={job}
          status={status}
          setShowDrawer={setShowDrawer}
          setIsJobApplyConfirmationModalOpen={
            setIsJobApplyConfirmationModalOpen
          }
          isShareJobModalOpen={isShareJobModalOpen}
          setIsShareJobModalOpen={setIsShareJobModalOpen}
          link={shareUrl}
          isApplied={isApplied}
          applicationId={applicationId}
          user={user}
        />
      )}

      {/* Job Card */}
      <div className="px-3 py-3 md:px-5 border border-primary-30 bg-white shadow-job-card rounded-xl font-Nunito transform transition-transform duration-300 hover:-translate-y-2 relative z-10">
        <div className="flex justify-between gap-3">
          <button
            onClick={() => setShowDrawer(true)}
            className="text-neutral-10 text-lg md:text-xl font-bold leading-6 hover:text-primary-10 cursor-pointer text-start"
          >
            {job?.title} -{" "}
            <span className="text-primary-10 font-normal text-sm">
              {job?.tuitionType}
            </span>
          </button>

          <img
            src={ICONS.jobCategoryDummyIcon}
            alt="Category Icon"
            className="size-16 lg:size-20 opacity-50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:gap-5 text-neutral-10 text-xs sm:text-sm md:text-base mt-3 md:mt-0">
          <p>
            Job Id : <span className="font-semibold">{job?.jobId}</span>
          </p>
          <p>
            Posted Date :{" "}
            <span className="font-semibold">
              {formatDate(job?.createdAt as string)}
            </span>
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <img src={ICONS.subject} alt="" className="size-5" />
          <div>
            <p className="text-neutral-45 text-sm leading-normal">Subjects</p>
            <p className="text-neutral-10 font-medium leading-6 mt-1">
              {job?.subjects?.join(", ")}
            </p>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-0 mt-4 ${detailsWidth}`}
        >
          {jobDetails.map((details, index) => (
            <div key={index} className="flex gap-2">
              <img src={details.icon} alt="" className="size-5" />
              <div>
                <p className="text-neutral-45 text-sm leading-normal">
                  {details.title}
                </p>
                <p className="text-neutral-10 font-medium leading-6 mt-1 capitalize">
                  {details.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <img src={ICONS.location} alt="" className="size-5" />
          <div>
            <p className="text-neutral-45 text-sm leading-normal">Location</p>
            <p className="text-neutral-10 font-medium leading-6 mt-1">
              {job?.area} {job?.city}{" "}
            </p>
          </div>
        </div>

        {pathname === "/dashboard/tutor/my-applications" && (
          <div className="flex gap-2 mt-4">
            <FiInfo className="text-primary-10 text-xl" />
            <div>
              <p className="text-neutral-45 text-sm leading-normal">Status</p>
              <p
                className={`font-medium leading-6 mt-1 capitalize ${
                  job?.status === "live"
                    ? "text-green-500"
                    : job?.status === "closed"
                    ? "text-red-500"
                    : "text-neutral-10"
                }`}
              >
                {job?.status}
              </p>
            </div>
          </div>
        )}

        {variant === "admin" && (
          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <LuUser className="text-primary-10 text-xl mt-1" />
              <div>
                <p className="text-neutral-45 text-sm leading-normal">
                  Guardian Name
                </p>
                <p className="text-neutral-10 font-medium leading-6 mt-1">
                  {job?.guardianName || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <SlPhone className="text-primary-10 text-lg mt-1" />
              <div>
                <p className="text-neutral-45 text-sm leading-normal">
                  Guardian Phone Number
                </p>
                <p className="text-neutral-10 font-medium leading-6 mt-1">
                  {job?.guardianPhoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
              <FaRegFileAlt className="text-primary-10 text-xl mt-1" />
              <div>
                <p className="text-neutral-45 text-sm leading-normal">
                  Update
                </p>
                <p className="text-neutral-10 font-bold leading-6 mt-1">
                  {job?.jobUpdate || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {variant === "status" && (
          <div className="flex items-center gap-5 text-neutral-10 text-xs md:text-sm mt-4">
            <button
              onClick={() => setShowDrawer(true)}
              className="text-neutral-10 flex items-center gap-2 w-fit font-semibold transition-all duration-300 text-sm md:text-base cursor-pointer"
            >
              <img src={ICONS.jobDetails} alt="" className="size-5" />
              <p className="hidden md:block">Details</p>
            </button>
            <div className="flex items-center gap-1 md:gap-2">
              <p className="font-bold">Applied On:</p>
              <p className="text-primary-10">
                {formatDate(appliedData?.appliedOn as string)}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <p className="font-bold">Status:</p>
              <p className={`capitalize ${statusTextColor}`}>{status}</p>
            </div>
          </div>
        )}

        {(variant === "guardian" || variant === "admin") && (
          <div className="flex items-center gap-5 text-neutral-10 text-xs md:text-sm mt-4">
            <Link
              to={`/dashboard/${path}/edit-job/${job?._id}`}
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
            >
              <img src={ICONS.pen} alt="" className="size-4 md:size-5" />
              <p className="font-bold">Edit Job</p>
            </Link>
            {/* <button
              onClick={() => setIsConfirmDeleteModalOpen(true)}
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
            >
              <img src={ICONS.pen} alt="" className="size-4 md:size-5" />
              <p className="font-bold">Edit Job</p>
            </button> */}
            <div className="flex items-center gap-1 md:gap-2">
              <img src={ICONS.jobStatus} alt="" className="size-4" />
              <p className="font-bold">Status:</p>
              <p className={`capitalize ${statusTextColorForGuardian}`}>
                {job?.status}
              </p>
            </div>
            <Link
              to={`/dashboard/${path}/applications/${job?._id}`}
              className="flex items-center gap-1 md:gap-2 hover:underline"
            >
              <img
                src={ICONS.applications}
                alt=""
                className="size-4 md:size-5"
              />
              <p className="font-bold">
                Applications({job?.applications?.length || 0})
              </p>
            </Link>

            {/* Dropdown Menu for Admin */}
            {role === "admin" && (
              <div className="relative">
                <button
                  className="text-xl hover:text-gray-700 transition cursor-pointer"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <TbMenuDeep />
                </button>

                {isOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 bottom-full mb-2 w-40 bg-white shadow-lg rounded-md border border-gray-100 z-50"
                  >
                    {/* Make Live */}
                    <button
                      onClick={() => handleUpdateStatus("live")}
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-green-50 text-green-600 cursor-pointer"
                    >
                      <FiCheckCircle /> Make Live
                    </button>

                    {/* Close Job */}
                    <button
                      onClick={() => handleUpdateStatus("closed")}
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-yellow-50 text-yellow-600 cursor-pointer"
                    >
                      <FiXCircle /> Close Job
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() => handleUpdateStatus("cancelled")}
                      className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-accent-20/5 text-accent-20 cursor-pointer"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {variant === "tutorJobCard" && (
          <div className="flex gap-4 mt-5 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDrawer(true)}
                className="text-neutral-10 flex items-center gap-2 w-fit font-semibold transition-all duration-300 text-sm md:text-base cursor-pointer"
              >
                <img src={ICONS.jobDetails} alt="" className="size-5" />
                <p className="hidden md:block">Details</p>
              </button>
              <button
                onClick={() => setIsShareJobModalOpen(true)}
                className="text-neutral-10 flex items-center gap-2 w-fit font-semibold transition-all duration-300 text-sm md:text-base cursor-pointer"
              >
                <img src={ICONS.share} alt="" className="size-4" />
                <p className="hidden md:block">Share</p>
              </button>
            </div>

            {pathname !== "/dashboard/tutor/my-applications" && (
              <>
                {!isApplied && (
                  <Button
                    label={"Apply"}
                    variant="primary"
                    icon={ICONS.topRightArrowWhite}
                    iconBg="#0D99FF"
                    onClick={() => {
                      if (!user) {
                        toast.error("Please login to apply for a job.");
                      } else {
                        setActionType("apply");
                        setIsJobApplyConfirmationModalOpen(true);
                      }
                    }}
                    animation={true}
                  />
                )}
                {isApplied &&
                  status !== "appointed" &&
                  status !== "confirmed" &&
                  status !== "rejected" && (
                    <Button
                      label={"Undo Apply"}
                      variant="tertiary"
                      onClick={() => {
                        if (!user) {
                          toast.error("Please login to apply for a job.");
                        } else {
                          setActionType("undo");
                          setIsJobApplyConfirmationModalOpen(true);
                        }
                      }}
                    />
                  )}
              </>
            )}
          </div>
        )}
      </div>

      <JobApplyConfirmationModal
        isJobApplyConfirmationModalOpen={isJobApplyConfirmationModalOpen}
        setIsJobApplyConfirmationModalOpen={setIsJobApplyConfirmationModalOpen}
        jobId={job?._id as string}
        action={actionType}
        applicationId={applicationId}
      />

      <ShareJobModal
        isShareJobModalOpen={isShareJobModalOpen}
        setIsShareJobModalOpen={setIsShareJobModalOpen}
        link={shareUrl}
      />
      <DeleteJobConfirmationModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
      />
    </>
  );
};

export default JobCard;
