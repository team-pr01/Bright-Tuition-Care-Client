/* eslint-disable @typescript-eslint/no-explicit-any */
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import {
  useGetJobDetailsForConfirmationLetterQuery,
  useSendConfirmationLetterMutation,
} from "../../../../redux/Features/ConfirmationLetter/confirmationLetterApi";
import { useState } from "react";
import toast from "react-hot-toast";

type TFormData = {
  jobId: string;
  tutorId: string;
  guardianId: string;
};
const SendConfirmationLetterForm = ({
  setIsConfirmationLetterModalOpen,
}: {
  setIsConfirmationLetterModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const [jobIdInput, setJobIdInput] = useState("");
  const [jobId, setJobId] = useState("");

  const {
    data: jobData,
    isLoading,
    isFetching,
    refetch,
  } = useGetJobDetailsForConfirmationLetterQuery(jobId, {
    skip: !jobId,
  });

  const [sendConfirmationLetter, { isLoading: isSending }] =
    useSendConfirmationLetterMutation();
  console.log(jobData);
  const handleSendConfirmationLetter = async () => {
    try {
      const payload: TFormData = {
        jobId: jobId,
        tutorId: jobData?.data?.tutor?._id,
        guardianId: jobData?.data?.guardian?._id,
      };
      const response = await sendConfirmationLetter(payload).unwrap();
      if (response?.success) {
        setJobId("");
        setJobIdInput("");
        toast.success("Confirmation letter sent successfully.");
        setIsConfirmationLetterModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to send confirmation letter."
      );
    }
  };
  return (
    <div className="mt-5 capitalize font-Nunito">
      <form className="flex items-center gap-3">
        <TextInput
          name="jobId"
          label="Job Id"
          placeholder="Enter job id to get details"
          onChange={(e) => setJobIdInput(e.target.value)}
        />

        <Button
          type="button"
          label="Get Data"
          variant="primary"
          className="py-[14px] lg:py-[14px] mt-[26px] text-nowrap text-xs lg:text-xs"
          onClick={() => {
            if (!jobIdInput.trim()) return;

            if (jobIdInput === jobId) {
              refetch();
            } else {
              setJobId(jobIdInput);
            }
          }}
          isLoading={isLoading || isFetching}
        />
      </form>

      {jobId && !jobData && (
        <p className="text-red-500 text-sm mt-2">
          No data found for the provided Job ID.
        </p>
      )}

      {jobData?.data?.job && (
        <div className="my-6">
          <h3 className="font-semibold text-neutral-5 mb-2">Tuition Details</h3>
          <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
            <p>Subject: {jobData?.data?.job?.subjects?.join(", ")}</p>
            <p>Class: {jobData?.data?.job?.class}</p>
            <p>Salary: {jobData?.data?.job?.salary} BDT</p>
            <p>Location: {jobData?.data?.job?.address}</p>
          </div>
        </div>
      )}

      {jobData?.data?.guardian && jobData?.data?.tutor && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Guardian */}
          <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
            <h4 className="font-semibold text-neutral-5 mb-1">
              Guardian/Student
            </h4>
            <p>Name: {jobData?.data?.guardian?.name || "N/A"}</p>
            <p>ID: {jobData?.data?.guardian?.guardianId || "N/A"}</p>
            <p>Phone: {jobData?.data?.guardian?.phoneNumber || "N/A"}</p>
          </div>

          {/* Tutor */}
          <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
            <h4 className="font-semibold text-neutral-5 mb-1">Tutor</h4>
            <p>Name: {jobData?.data?.tutor?.name || "N/A"}</p>
            <p>ID: {jobData?.data?.tutor?.tutorId || "N/A"}</p>
            <p>Phone: {jobData?.data?.tutor?.phoneNumber || "N/A"}</p>
          </div>
        </div>
      )}

      {jobData?.data && (
        <div className="flex justify-end">
          <Button
            type="submit"
            label="Submit"
            variant="primary"
            className="py-2 lg:py-2"
            onClick={handleSendConfirmationLetter}
            isDisabled={isSending}
            isLoading={isSending}
          />
        </div>
      )}
    </div>
  );
};

export default SendConfirmationLetterForm;
