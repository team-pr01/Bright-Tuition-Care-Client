import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";

type TFormData = {
  title: string;
  notice: string;
  targetedAudience: string;
};

type TAddNoticeModalProps = {
  isAddNoticeModalOpen: boolean;
  setIsAddNoticeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};

const AddNoticeModal: React.FC<TAddNoticeModalProps> = ({
  isAddNoticeModalOpen,
  setIsAddNoticeModalOpen,
  modalType,
  setModalType,
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
      isModalOpen={isAddNoticeModalOpen}
      setIsModalOpen={setIsAddNoticeModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Notice`}
    >
      <form
        onSubmit={handleSubmit(handleSuspend)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        <div className="flex flex-col gap-6">
          {/* Title */}
          <TextInput
            label="Title"
            placeholder="Enter notice title"
            error={errors.title}
            {...register("title", {
              required: "Title is required",
            })}
          />

          {/* Notice */}
          <Textarea
            label="Notice"
            placeholder="Enter notice"
            error={errors.notice}
            {...register("notice", {
              required: "This field is required",
            })}
          />

          {/* Targeted Audience */}
          <SelectDropdown
            label="Targeted Audience"
            options={["Tutor", "Guardian", "Both"]}
            error={errors.targetedAudience}
            {...register("targetedAudience")}
          />
        </div>

        <div className="flex gap-3 justify-end">
            <Button
            type="button"
            label={"Cancel"}
            variant="tertiary"
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
            onClick={() => {
              setIsAddNoticeModalOpen(false);
              setModalType("add");
            }}
          />
          <Button
            type="submit"
            label={modalType === "add" ? "Add Notice" : "Update Notice"}
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
          />
          
        </div>
      </form>
    </Modal>
  );
};

export default AddNoticeModal;
