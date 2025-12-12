/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiDownload } from "react-icons/fi";
import SignatureField from "./SignatureField ";
import { pdf } from "@react-pdf/renderer";
import ConfirmationLetterPdf from "./DownloadConfirmationLetterPdf";
import {
  useGetSingleConfirmationLetterByIdQuery,
  useSignOnLetterForGuardianMutation,
  useSignOnLetterForTutorMutation,
} from "../../../../../redux/Features/ConfirmationLetter/confirmationLetterApi";
import Loader from "../../../../Reusable/Loader/Loader";
import toast from "react-hot-toast";

const ConfirmationLetterPreview = ({ letterId }: { letterId: string }) => {
  const { data, isLoading, isFetching } =
    useGetSingleConfirmationLetterByIdQuery(letterId);
  const [signOnLetterForTutor] =
    useSignOnLetterForTutorMutation();
  const [
    signOnLetterForGuardian
  ] = useSignOnLetterForGuardianMutation();
  const handleDownloadConfirmationLetterPdf = async () => {
    const blob = await pdf(<ConfirmationLetterPdf data={data?.data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "confirmation-letter.pdf";
    link.click();
  };

  const handleSignOnLetterForTutor = async (signature: string) => {
    try {
      const payload = {
        signature,
      };
      const response = await signOnLetterForTutor({
        id: letterId as string,
        data: payload,
      }).unwrap();
      if (response?.success) {
        toast.success("Thanks for signing the letter!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to sign on letter");
    }
  };

  const handleSignOnLetterForGuardian = async (signature: string) => {
    try {
      const payload = {
        signature,
      };
      const response = await signOnLetterForGuardian({
        id: letterId as string,
        data: payload,
      }).unwrap();
      if (response?.success) {
        toast.success("Thanks for signing the letter!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to sign on letter");
    }
  };

  return isLoading || isFetching ? (
    <div className="py-20">
      <Loader size="lg" text="Loading Letter..." />
    </div>
  ) : (
    <div className="">
      {/* Header */}
      <h2 className="text-xl font-bold text-center mb-4 underline">
        Confirmation Letter
      </h2>

      {/* Greeting */}
      <p className="text-neutral-10 mb-2">
        Dear <span className="font-bold">Tutor</span> &{" "}
        <span className="font-bold">Guardian/Student</span>,
      </p>

      <p className="text-neutral-10 mb-6">
        Congratulations! We are pleased to let you know that{" "}
        <span className="font-bold">Bright Tuition Care</span> has successfully
        connected both of you for this tuition. (Job ID:{" "}
        {data?.data?.jobId?.jobId})
      </p>

      {/* Tuition Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-neutral-5 mb-2">Tuition Details</h3>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <p>Subject: {data?.data?.jobId?.subjects}</p>
          <p>Class: {data?.data?.jobId?.class}</p>
          <p>
            Schedule: {data?.data?.jobId?.tutoringDays},{" "}
            {data?.data?.jobId?.tutoringTime}
          </p>
          <p>
            Location: {data?.data?.jobId?.city}, {data?.data?.jobId?.area}
          </p>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <h4 className="font-semibold text-neutral-5 mb-1">
            Guardian/Student
          </h4>
          <p className="capitalize">Name: {data?.data?.guardianId?.name || "N/A"}</p>
          <p>Email: {data?.data?.guardianId?.email || "N/A"}</p>
          <p>Phone: {data?.data?.guardianId?.phoneNumber || "N/A"}</p>
        </div>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm">
          <h4 className="font-semibold text-neutral-5 mb-1">Tutor</h4>
          <p className="capitalize">Name: {data?.data?.tutorId?.name}</p>
          <p>Email: {data?.data?.tutorId?.email}</p>
          <p>Phone: {data?.data?.tutorId?.phoneNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <SignatureField
          label="Guardian/Student Signature"
          onClick={handleSignOnLetterForTutor}
          signature={
            data?.data?.guardianSignature ? data?.data?.guardianSignature : ""
          }
          signatureDate={
            data?.data?.guardianSinnedDate ? data?.data?.guardianSinnedDate : ""
          }
          role={"tutor"}
        />
        <SignatureField
          label="Tutor Signature"
          onClick={handleSignOnLetterForGuardian}
          signature={
            data?.data?.tutorSignature ? data?.data?.tutorSignature : ""
          }
          signatureDate={
            data?.data?.tutorSinnedDate ? data?.data?.tutorSinnedDate : ""
          }
          role={"guardian"}
        />
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleDownloadConfirmationLetterPdf}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-primary-10 text-white text-sm rounded-lg hover:bg-primary-40 transition cursor-pointer"
        >
          <FiDownload /> Download PDF
        </button>
      </div>

      <p className="text-primary-10 text-xs text-center mt-4">
        Note: You can sign digitally or manually download the PDF, print it and
        sign with date.{" "}
      </p>
    </div>
  );
};

export default ConfirmationLetterPreview;
