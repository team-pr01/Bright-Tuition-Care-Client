/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { useRequestToUnlockProfileMutation } from "../../../../redux/Features/User/userApi";
import toast from "react-hot-toast";

type TFormData = {
  unlockRequestReason: string;
};
const RequestToUnlockProfileModal = ({
  isRequestUnlockModalOpen,
  setIsRequestUnlockModalOpen,
}: {
  isRequestUnlockModalOpen: boolean;
  setIsRequestUnlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [requestToUnlockProfile, { isLoading }] =
    useRequestToUnlockProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleRequestToUnlockProfile = async (data: TFormData) => {
    try {
      const payload = {
        unlockRequestReason: data.unlockRequestReason,
      };
      const res = await requestToUnlockProfile(payload).unwrap();
      if (res?.success) {
        toast.success(
          "We have received your request to unlock the profile. We will review it shortly."
        );
        reset();
        setIsRequestUnlockModalOpen(false);
        // navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Error deleting account.");
    }
  };
  return (
    <div
      className={`${
        isRequestUnlockModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isRequestUnlockModalOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        } w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg cursor-pointer absolute top-5 right-4"
          onClick={() => setIsRequestUnlockModalOpen(false)}
        />

        <form
          onSubmit={handleSubmit(handleRequestToUnlockProfile)}
          className="w-full flex flex-col items-center gap-6"
        >
          <img src={ICONS.warning} alt="warning icon" className="size-28" />
          <div className="text-center text-neutral-900">
            <h1 className="text-xl font-semibold ">Unlock Profile</h1>
            <p className="text-sm mt-2">
              Are you sure want to request to unlock your profile?
            </p>
          </div>

          <div className="w-full">
            <Textarea
              label="Reason for Unlocking Profile"
              placeholder="Please share your reason..."
              rows={4}
              error={errors.unlockRequestReason}
              {...register("unlockRequestReason")}
              isRequired={true}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              label="Cancel"
              variant="tertiary"
              className="py-2 lg:py-2"
              onClick={() => setIsRequestUnlockModalOpen(false)}
            />
            <Button
              type="submit"
              label="Submit"
              variant="primary"
              className="py-2 lg:py-2"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestToUnlockProfileModal;
