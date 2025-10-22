/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import toast from "react-hot-toast";
import {
  useAddNoticeMutation,
  useUpdateNoticeMutation,
} from "../../../../redux/Features/NoticeBoard/noticeBoardApi";
import { useEffect } from "react";
import Loader from "../../../Reusable/Loader/Loader";

type TFormData = {
  title: string;
  description: string;
  targetedAudience: string;
};

type TAddNoticeModalProps = {
  isAddNoticeModalOpen: boolean;
  setIsAddNoticeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  defaultValues?: any;
  isLoading?: boolean;
};

const AddNoticeModal: React.FC<TAddNoticeModalProps> = ({
  isAddNoticeModalOpen,
  setIsAddNoticeModalOpen,
  modalType,
  setModalType,
  defaultValues,
  isLoading,
}) => {
  const [addNotice, { isLoading: isAddingStaff }] = useAddNoticeMutation();
  const [updateNotice, { isLoading: isUpdatingStaff }] =
    useUpdateNoticeMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (modalType === "edit" && defaultValues) {
      setValue("title", defaultValues.title);
      setValue("description", defaultValues.description);
      setValue("targetedAudience", defaultValues.targetedAudience);
    }
  }, [defaultValues, modalType, setValue]);

  const handleSubmitNotice = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
      };
      if (modalType === "add") {
        const res = await addNotice(payload).unwrap();
        if (res?.success) {
          reset();
          setIsAddNoticeModalOpen(false);
        }
      } else if (modalType === "edit" && defaultValues) {
        const res = await updateNotice({
          id: defaultValues._id,
          data: payload,
        }).unwrap();
        if (res?.success) {
          reset();
          setIsAddNoticeModalOpen(false);
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };
  return (
    <Modal
      isModalOpen={isAddNoticeModalOpen}
      setIsModalOpen={setIsAddNoticeModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Notice`}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50">
            <Loader size="lg" text="Please wait..." />
          </div>
        )}

        <form
          onSubmit={handleSubmit(handleSubmitNotice)}
          className="flex flex-col gap-6 font-Nunito mt-5"
        >
          <div className="flex flex-col gap-6">
            {/* Title */}
            <TextInput
              label="Title"
              placeholder="Enter notice title"
              error={errors.title}
              {...register("title", { required: "Title is required" })}
            />

            {/* Notice */}
            <Textarea
              label="Notice"
              placeholder="Enter notice"
              error={errors.description}
              {...register("description", {
                required: "This field is required",
              })}
            />

            {/* Targeted Audience */}
            <SelectDropdown
              label="Targeted Audience"
              options={["tutor", "guardian", "all"]}
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
              isLoading={isAddingStaff || isUpdatingStaff || isLoading}
              isDisabled={isAddingStaff || isUpdatingStaff || isLoading}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNoticeModal;
