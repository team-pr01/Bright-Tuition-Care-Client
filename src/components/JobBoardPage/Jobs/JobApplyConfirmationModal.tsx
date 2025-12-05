/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import {
  useApplyOnJobMutation,
  useWithdrawApplicationMutation,
} from "../../../redux/Features/Application/applicationApi";
import Button from "../../Reusable/Button/Button";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";

const JobApplyConfirmationModal = ({
  isJobApplyConfirmationModalOpen,
  setIsJobApplyConfirmationModalOpen,
  jobId,
  action,
  applicationId,
}: {
  isJobApplyConfirmationModalOpen: boolean;
  setIsJobApplyConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  jobId: string;
  action: "apply" | "undo";
  applicationId?: string;
}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [applyOnJob, { isLoading: isApplyOnJobLoading }] =
    useApplyOnJobMutation();
  const [withdrawApplication, { isLoading: isWithdrawingApplication }] =
    useWithdrawApplicationMutation();

  const handleApplyOnJob = async () => {
    try {
      const payload = {
        userId: user._id,
        jobId,
      };
      const response = await applyOnJob(payload).unwrap();
      if (response?.success) {
        toast.success(
          response?.message || "You have successfully Applied on job."
        );
        setIsJobApplyConfirmationModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error applying on job. Please try again."
      );
    }
  };

  const handleWithdrawApplication = async () => {
    try {
      const res = await withdrawApplication(applicationId).unwrap();
      if (res?.success) {
        toast.success("Application withdrawn successfully.");
        setIsJobApplyConfirmationModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error withdrawing application. Please try again."
      );
    }
  };
  return (
    <div
      className={`${
        isJobApplyConfirmationModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-neutral-10/50 backdrop-blur-xs flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isJobApplyConfirmationModalOpen
            ? " scale-[1] opacity-100"
            : " scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] lg:w-[50%] 2xl:w-[30%] bg-white rounded-2xl px-4 py-8 transition-all duration-300`}
      >
        <div className="w-full flex items-center justify-center flex-col text-center">
          <h1 className="text-neutral-10 text-xl md:text-4xl font-bold leading-6">
            {action === "apply" ? "Apply" : "Undo Apply"}
          </h1>
          <p className="text-neutral-20 text-sm md:text-lg leading-6 mt-1 md:mt-3">
            {action === "apply"
              ? "Are you sure you want to apply for this job?"
              : "Are you sure you want to undo your application for this job?"}
          </p>
          <div className="mt-8 flex justify-center gap-5">
            <Button
              label="No"
              variant="secondary"
              iconBg="#0D99FF"
              className="border border-neutral-55 min-w-[100px] flex items-center justify-center"
              onClick={() => setIsJobApplyConfirmationModalOpen(false)}
            />
            {action === "apply" && (
              <Button
                label="Yes"
                variant="primary"
                iconBg="#0D99FF"
                className="min-w-[100px] flex items-center justify-center"
                onClick={handleApplyOnJob}
                isLoading={isApplyOnJobLoading}
              />
            )}
            {action === "undo" && (
              <Button
                label="Yes"
                variant="primary"
                iconBg="#0D99FF"
                className="min-w-[100px] flex items-center justify-center"
                onClick={handleWithdrawApplication}
                isLoading={isWithdrawingApplication}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplyConfirmationModal;
