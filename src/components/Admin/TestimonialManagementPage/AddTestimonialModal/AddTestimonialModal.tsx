/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import {
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
} from "../../../../redux/Features/Testimonial/testimonialApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../../../Reusable/Loader/Loader";

type TFormData = {
  name: string;
  designation: string;
  role: string;
  review: string;
  rating: string;
  file: FileList;
};

type TAddTestimonialModalProps = {
  isTestimonialModalOpen: boolean;
  setIsTestimonialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "add" | "edit";
  setModalType: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  defaultValues?: any;
  isLoading: boolean;
};

const AddTestimonialModal: React.FC<TAddTestimonialModalProps> = ({
  isTestimonialModalOpen,
  setIsTestimonialModalOpen,
  modalType,
  setModalType,
  defaultValues,
  isLoading,
}) => {
  const [addTestimonial, { isLoading: isAddingTestimonial }] =
    useAddTestimonialMutation();
  const [updateTestimonial, { isLoading: isUpdatingTestimonial }] =
    useUpdateTestimonialMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (modalType === "edit" && defaultValues) {
      setValue("name", defaultValues.name);
      setValue("designation", defaultValues.designation);
      setValue("role", defaultValues.role);
      setValue("review", defaultValues.review);
      setValue("rating", defaultValues.rating);
    } else {
      reset();
    }
  }, [defaultValues, modalType, setValue , reset]);

  const handleSubmitTestimonial = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("role", data.role);
      formData.append("review", data.review);
      formData.append("rating", data.rating);
      formData.append("file", data.file[0]);
      if (modalType === "add") {
        const res = await addTestimonial(formData).unwrap();
        if (res?.success) {
          reset();
          setIsTestimonialModalOpen(false);
        }
      } else if (modalType === "edit" && defaultValues) {
        const res = await updateTestimonial({
          id: defaultValues._id,
          data: formData,
        }).unwrap();
        if (res?.success) {
          reset();
          setIsTestimonialModalOpen(false);
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
      isModalOpen={isTestimonialModalOpen}
      setIsModalOpen={setIsTestimonialModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Testimonial`}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50">
            <Loader size="lg" text="Please wait..." />
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleSubmitTestimonial)}
          className="flex flex-col gap-6 font-Nunito mt-5"
        >
          <div className="flex flex-col gap-6">
            {/* Name */}
            <TextInput
              label="Name"
              placeholder="Enter full name"
              error={errors.name}
              {...register("name", { required: "Name is required" })}
            />

            {/* Role */}
            <TextInput
              label="Designation & Location"
              placeholder="Ex: Math Teacher, Banani, Dhaka"
              error={errors.designation}
              {...register("designation", {
                required: "Designation & Location is required",
              })}
            />

            {/* Rating */}
            <SelectDropdown
              label="Rating"
              options={["1", "2", "3", "4", "5"]}
              error={errors.rating}
              {...register("rating", { required: "Rating is required" })}
            />

            {/* Role */}
            <SelectDropdown
              label="Role"
              options={["guardian", "tutor"]}
              error={errors.role}
              {...register("role", { required: "Role is required" })}
            />

            {/* Review */}
            <Textarea
              label="Review"
              placeholder="Write the testimonial"
              error={errors.review}
              {...register("review", { required: "Review is required" })}
            />

            {/* Image */}
            <TextInput
              label="Picture"
              error={errors.file}
              type="file"
              {...register("file")}
              isRequired={modalType === "add"}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              label="Cancel"
              variant="tertiary"
              className="py-[7px] lg:py-[7px] w-full md:w-fit"
              onClick={() => {
                setIsTestimonialModalOpen(false);
                setModalType("add");
              }}
            />
            <Button
              type="submit"
              label={
                modalType === "add" ? "Add Testimonial" : "Update Testimonial"
              }
              variant="primary"
              iconWithoutBg={ICONS.topRightArrowWhite}
              className="py-[7px] lg:py-[7px] w-full md:w-fit"
              isLoading={
                isAddingTestimonial || isUpdatingTestimonial || isLoading
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTestimonialModal;
