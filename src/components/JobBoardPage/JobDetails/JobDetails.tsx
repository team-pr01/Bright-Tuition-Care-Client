/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../../assets";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Reusable/Button/Button";
import ShareJobModal from "../ShareJobModal";
import toast from "react-hot-toast";
import { useWithdrawApplicationMutation } from "../../../redux/Features/Application/applicationApi";
import { formatDate } from "../../../utils/formatDate";

const JobDetails = ({
  job,
  status,
  link,
  setShowDrawer,
  setIsJobApplyConfirmationModalOpen,
  isShareJobModalOpen,
  setIsShareJobModalOpen,
  isApplied,
  applicationId,
}: {
  job: any;
  status?: string;
  link: string;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setIsJobApplyConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isShareJobModalOpen: boolean;
  setIsShareJobModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isApplied?: boolean;
  applicationId?: string;
}) => {
  const jobDetail2 = [
    {
      icon: ICONS.tutoringDays,
      title: "Tutoring Days",
      value: job?.tutoringDays,
    },
    { icon: ICONS.salary, title: "Salary", value: job?.salary },
    { icon: ICONS.gender, title: "Student Gender", value: job?.studentGender },
    {
      icon: ICONS.preferredTutor,
      title: "Prefer Tutor",
      value: job?.preferredTutorGender,
    },
    {
      icon: ICONS.numberOfStudents,
      title: "No. Of Students",
      value: job?.numberOfStudents,
    },
    { icon: ICONS.time, title: "Tutoring Time", value: job?.tutoringTime },

    // { icon: ICONS.subject, title: "Subject", value: "All" },
    // { icon: ICONS.location, title: "Location", value: "Mohammodpur" },
  ];

  const [withdrawApplication, { isLoading: isWithdrawingApplication }] =
    useWithdrawApplicationMutation();
  // const [reApply, { isLoading: isReApplyOnJobLoading }] = useReApplyMutation();

  const handleWithdrawApplication = async () => {
    try {
      const res = await withdrawApplication(applicationId).unwrap();
      if (res?.success) {
        toast.success("Application withdrawn successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error withdrawing application. Please try again."
      );
    }
  };

  // const handleReApplyOnJob = async (id: string) => {
  //   try {
  //     const response = await reApply(id).unwrap();
  //     if (response?.success) {
  //       toast.success(response.message || "Re-applied on job successfully.");
  //     }
  //   } catch (error: any) {
  //     toast.error(
  //       error?.data?.message || "Error applying on job. Please try again."
  //     );
  //   }
  // };
  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0  bg-black/30 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowDrawer(false)}
        />

        {/* Drawer */}
        <motion.div
          className="fixed top-0 left-0 w-full bg-white rounded-b-xl shadow-lg max-h-[95vh] overflow-y-auto p-5 md:p-8 z-[999999]"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="bg-white border-0 md:border md:border-neutral-55 rounded-xl lg:rounded-3xl p-0 md:p-8 max-w-[895px] mx-auto font-Nunito relative overflow-visible md:overflow-hidden">
            <div className="bg-primary-10/40 blur-[150px] size-32 rounded-full absolute top-0 right-0"></div>
            <h1 className="text-neutral-10 text-lg md:text-2xl lg:text-3xl font-bold leading-6 text-start md:text-center">
              {job?.title}{" "}
              {/* <span className="text-primary-10 font-normal text-sm leading-0">
                Home Tutoring
              </span> */}
            </h1>
            <button
              onClick={() => setIsShareJobModalOpen(true)}
              className="text-neutral-10 hidden md:flex items-center gap-2 leading-[24px] w-fit font-semibold transition-all duration-300 text-sm md:text-base absolute bottom-5 md:bottom-8 xl:bottom-12  right-5 md:right-8 xl:right-8 cursor-pointer"
            >
              <img src={ICONS.share} alt="" className="size-5" />
              <p className="hidden md:block">Share</p>
            </button>

            {/* Date and job id */}
            <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 mt-3 lg:mt-5 text-xs md:text-base">
              <p>
                Job Id : <span className="font-semibold">{job?.jobId}</span>
              </p>
              <p>|</p>
              <p>
                Posted Date :{" "}
                <span className="font-semibold">
                  {formatDate(job?.createdAt as string)}
                </span>
              </p>
              {/* <button className="text-neutral-10 md:hidden flex items-center gap-2 leading-[24px] w-fit font-semibold transition-all duration-300 text-xs md:text-base">
                <img src={ICONS.share} alt="" className="size-4" />
                Share
              </button> */}
            </div>

            <img
              src={ICONS.jobCategoryDummyIcon}
              alt="Category Icon"
              className="size-20 md:size-[100px] lg:size-[130px] mx-auto mt-5 lg:mt-11"
            />

            <div className="flex flex-col gap-6 items-start justify-center max-w-full lg:max-w-[70%] mx-0 lg:mx-auto">
              <div className="flex gap-2 mt-6 lg:mt-11">
                <img src={ICONS.subject} alt="" className="size-5" />
                <div>
                  <p className="text-neutral-45 text-sm">Subjects</p>
                  <p className="text-neutral-10 font-medium">
                    {job?.subjects?.join(", ")}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-6">
                {jobDetail2.map((details, index) => (
                  <div key={index} className="flex gap-2">
                    <img src={details.icon} alt="" className="size-5" />
                    <div>
                      <p className="text-neutral-45 text-sm">{details.title}</p>
                      <p className="text-neutral-10 font-medium">
                        {details.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <img src={ICONS.location} alt="" className="size-5" />
                <div>
                  <p className="text-neutral-45 text-sm">Location</p>
                  <p className="text-neutral-10 font-medium">
                    {job?.area} {job?.city}{" "}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <img src={ICONS.requirements} alt="" className="size-5" />
                <div>
                  <p className="text-neutral-45 text-sm">Other Requirements</p>
                  <p className="text-neutral-10 font-medium">
                    {job?.otherRequirements}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-5">
              <Button
                label="Direction"
                variant="secondary"
                iconBg="#0D99FF"
                className="border border-neutral-55"
              />
              {isApplied && (
                <Button
                  label={
                    isWithdrawingApplication
                      ? "Please wait..."
                      : "Withdraw Application"
                  }
                  variant="primary"
                  iconBg="#0D99FF"
                  onClick={handleWithdrawApplication}
                />
              )}

              {!status && (
                <Button
                  label={"Apply Now"}
                  variant="primary"
                  iconBg="#0D99FF"
                  onClick={() => setIsJobApplyConfirmationModalOpen(true)}
                  animation={true}
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowDrawer(false)}
            className="absolute top-[13px] md:top-8 right-3 md:right-10 text-neutral-45 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </motion.div>
      </>

      <ShareJobModal
        isShareJobModalOpen={isShareJobModalOpen}
        setIsShareJobModalOpen={setIsShareJobModalOpen}
        link={link}
      />
    </AnimatePresence>
  );
};

export default JobDetails;
