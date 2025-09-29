import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";

type TFormData = {
  name: string;
  designationAndLocation: string;
  role : string
  review: string;
  rating: string;
};

type TAddTestimonialModalProps = {
  isTestimonialModalOpen: boolean;
  setIsTestimonialModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "add" | "edit";
  setModalType: React.Dispatch<React.SetStateAction<"add" | "edit">>;
};

const AddTestimonialModal: React.FC<TAddTestimonialModalProps> = ({
  isTestimonialModalOpen,
  setIsTestimonialModalOpen,
  modalType,
  setModalType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitForm = (data: TFormData) => {
    console.log(data);
  };

  return (
    <Modal
      isModalOpen={isTestimonialModalOpen}
      setIsModalOpen={setIsTestimonialModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Testimonial`}
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
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
            error={errors.designationAndLocation}
            {...register("designationAndLocation", {
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
            options={["Guardian", "Tutor"]}
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
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTestimonialModal;
