/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import { useSendVerificationRequestMutation } from "../../../../redux/Features/VerificationRequest/verificationRequestApi";
import toast from "react-hot-toast";

const SendProfileVerificationRequest = ({
  isVerificationModalOpen,
  setIsVerificationModalOpen,
}: {
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [sendVerificationRequest, {isLoading}] = useSendVerificationRequestMutation();

  const handleSendVerificationRequest = async () => {
    try {
      const res = await sendVerificationRequest({}).unwrap();
      if (res?.success) {
        toast.success("Verification request sent successfully");
        setIsVerificationModalOpen(false);
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error sending verification request");
      setIsVerificationModalOpen(false);
    }
  };
  return (
    <div
      className={`${
        isVerificationModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isVerificationModalOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        } w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] dark:bg-slate-800 bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg dark:text-[#abc2d3]/70 cursor-pointer absolute top-5 right-4"
          onClick={() => setIsVerificationModalOpen(false)}
        />

        <div className="w-full flex flex-col items-center gap-6">
          <img src={ICONS.warning} alt="warning icon" className="size-28" />
          <div className="text-center text-neutral-900">
            <h1 className="text-xl font-semibold ">Verification</h1>
            <p className="text-sm mt-2">
              Are you sure want to send Verification Request?
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="submit"
              label="Yes"
              variant="primary"
              className="py-2 lg:py-2"
              onClick={handleSendVerificationRequest}
              isLoading={isLoading}
            />
            <Button
              type="button"
              label="No"
              variant="tertiary"
              className="py-2 lg:py-2"
              onClick={() => setIsVerificationModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendProfileVerificationRequest;