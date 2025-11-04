/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import JobDetails from "../../JobDetails/JobDetails";
import JobApplyConfirmationModal from "../JobApplyConfirmationModal";
import ShareJobModal from "../../ShareJobModal";
import DeleteJobConfirmationModal from "../../../Reusable/DeleteJobConfirmationModal/DeleteJobConfirmationModal";
import { Link } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";
import type { TJobs } from "../../../../types/job.types";
import { useUpdateJobMutation } from "../../../../redux/Features/Job/jobApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

type TJobCardProps = {
  variant?: string;
  status?: string;
  detailsWidth?: string;
  job?: TJobs;
};
const JobCard: React.FC<TJobCardProps> = ({
  variant,
  status,
  detailsWidth = "max-w-full 2xl:max-w-[80%]",
  job,
}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  // const path = user?.role === "guardian" ? "guardian" : "admin";
  const [isOpen, setIsOpen] = useState(false);
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

  const path = "admin";
  const role = "admin";
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
      icon: ICONS.preferredTutor,
      title: "Prefer Tutor",
      value: job?.preferredTutorGender,
    },
    // { icon: ICONS.subject, title: "Subjects", value: "Physics, Chemistry, Math" },
    // { icon: ICONS.location, title: "Location", value: "Mohammodpur" },
  ];

  const shareUrl = "https://yourwebsite.com/job/123"; // Replace with actual job URL

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

  const isApplied = job?.applications?.some((app) => app === user?._id);

  return (
    <>
      {/* Smooth Overlay & Drawer */}
      {showDrawer && (
        <JobDetails
          setShowDrawer={setShowDrawer}
          setIsJobApplyConfirmationModalOpen={
            setIsJobApplyConfirmationModalOpen
          }
          isShareJobModalOpen={isShareJobModalOpen}
          setIsShareJobModalOpen={setIsShareJobModalOpen}
          link={shareUrl}
        />
      )}

      {/* Job Card */}
      <div className="px-3 py-3 md:px-5 border border-primary-30 bg-white shadow-job-card rounded-xl font-Nunito transform transition-transform duration-300 hover:-translate-y-2 z-0 relative">
        <div className="flex justify-between gap-3">
          <button
            onClick={() => setShowDrawer(true)}
            className="text-neutral-10 text-lg md:text-xl font-bold leading-6 hover:text-primary-10 cursor-pointer text-start"
          >
            {job?.title} -{" "}
            <span className="text-primary-10 font-normal text-sm">
              {job?.tuitionType?.join(", ")}
            </span>
          </button>

          <img
            src={ICONS.jobCategoryDummyIcon}
            alt="Category Icon"
            className="size-16 lg:size-20 opacity-50"
          />
        </div>

        <div className="flex items-center gap-5 text-neutral-10 text-xs sm:text-sm md:text-base mt-3 md:mt-0">
          <p>
            Job Id : <span className="font-semibold">#{job?.jobId}</span>
          </p>
          <p>
            Posted Date : <span className="font-semibold">August 15, 2025</span>
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <img src={ICONS.subject} alt="" className="size-5" />
          <div>
            <p className="text-neutral-45 text-sm leading-normal">Subjects</p>
            <p className="text-neutral-10 font-medium leading-6 mt-1">
              {job?.subjects}
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

        {variant === "status" && (
          <div className="flex items-center gap-5 text-neutral-10 text-xs md:text-sm">
            <div className="flex items-center gap-1 md:gap-2 mt-4">
              <img src={ICONS.jobStatus} alt="" className="size-4 md:size-5" />
              <p className="font-bold">Applied On:</p>
              <p className="text-primary-10">15 Aug, 2025</p>
            </div>
            <div className="flex items-center gap-1 md:gap-2 mt-4">
              <img src={ICONS.jobStatus} alt="" className="size-4 md:size-5" />
              <p className="font-bold">Status:</p>
              <p className={`capitalize ${statusTextColor}`}>{status}</p>
            </div>
          </div>
        )}

        {variant === "guardian" ||
          (variant === "admin" && (
            <div className="flex items-center gap-5 text-neutral-10 text-xs md:text-sm mt-4">
              <Link
                to={`/dashboard/admin/edit-job/${1}`}
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
                to={`/dashboard/${path}/applications/${1}`}
                className="flex items-center gap-1 md:gap-2 hover:underline"
              >
                <img
                  src={ICONS.applications}
                  alt=""
                  className="size-4 md:size-5"
                />
                <p className="font-bold">Applications(1)</p>
              </Link>

              {/* Dropdown Menu */}
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
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-50 cursor-pointer"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

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
            <Button
              label={isApplied ? "Applied" : "Apply Now"}
              variant="primary"
              icon={ICONS.topRightArrowWhite}
              iconBg="#0D99FF"
              onClick={() => setIsJobApplyConfirmationModalOpen(true)}
              isDisabled={isApplied}
            />
          </div>
        )}
      </div>
      <JobApplyConfirmationModal
        isJobApplyConfirmationModalOpen={isJobApplyConfirmationModalOpen}
        setIsJobApplyConfirmationModalOpen={setIsJobApplyConfirmationModalOpen}
        jobId={job?._id as string}
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
