/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { useDeleteAccountMutation } from "../../../../redux/Features/User/userApi";
import toast from "react-hot-toast";

type TFormData = {
  accountDeleteReason: string;
};
const DeleteAccountConfirmationModal = ({
  isConfirmDeleteModalOpen,
  setIsConfirmDeleteModalOpen,
}: {
  isConfirmDeleteModalOpen: boolean;
  setIsConfirmDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const navigate = useNavigate();
  const [deleteAccount, {isLoading}] = useDeleteAccountMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitDeleteRequest = async (data: TFormData) => {
      try {
        const payload = {
          accountDeleteReason: data.accountDeleteReason,
        };
        const res = await deleteAccount(payload).unwrap();
        if (res?.success) {
          toast.success("Account deleted successfully");
          reset();
          setIsConfirmDeleteModalOpen(false);
          // navigate("/");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Error deleting account.");
      }
    };
  return (
    <div
      className={`${
        isConfirmDeleteModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isConfirmDeleteModalOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        } w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] dark:bg-slate-800 bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg dark:text-[#abc2d3]/70 cursor-pointer absolute top-5 right-4"
          onClick={() => setIsConfirmDeleteModalOpen(false)}
        />

        <form
          onSubmit={handleSubmit(handleSubmitDeleteRequest)}
          className="w-full flex flex-col items-center gap-6"
        >
          <img src={ICONS.warning} alt="warning icon" className="size-28" />

          <div className="text-center text-neutral-900 dark:text-neutral-100">
            <h1 className="text-xl font-semibold">Delete Account</h1>
            <p className="text-sm mt-2">
              It’s sad to see you go. Are you sure you want to delete your
              account?
            </p>
          </div>

          <div className="w-full">
            <Textarea
              label="Reason for account deletion (Optional)"
              placeholder="Please share your reason..."
              rows={4}
              error={errors.accountDeleteReason}
              {...register("accountDeleteReason")}
              isRequired={false}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="submit"
              label="Yes, Delete"
              variant="primary"
              className="py-2 lg:py-2"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
            <Button
              type="button"
              label="Cancel"
              variant="tertiary"
              className="py-2 lg:py-2"
              onClick={() => setIsConfirmDeleteModalOpen(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountConfirmationModal;
