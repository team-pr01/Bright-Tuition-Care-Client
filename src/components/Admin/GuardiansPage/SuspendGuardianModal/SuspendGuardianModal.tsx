import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Modal from "../../../Reusable/Modal/Modal";

type TFormData = {
  reason: string;
  password: string;
};

type TSuspendGuardianModalProps = {
  selectedGuardianId: string | null;
  isSuspendGuardianModalOpen: boolean;
  setIsSuspendGuardianModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuspendGuardianModal: React.FC<TSuspendGuardianModalProps> = ({
  selectedGuardianId,
  isSuspendGuardianModalOpen,
  setIsSuspendGuardianModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSuspend = (data: TFormData) => {
    console.log(data);
  };
  return (
    <Modal
      isModalOpen={isSuspendGuardianModalOpen}
      setIsModalOpen={setIsSuspendGuardianModalOpen}
      heading={`Suspend ${selectedGuardianId}`}
    >
      <form
        onSubmit={handleSubmit(handleSuspend)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Email */}
          <Textarea
            label="Reason for Suspension"
            placeholder="Enter reason for suspension"
            error={errors.reason}
            {...register("reason", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            label="Suspend"
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default SuspendGuardianModal;
