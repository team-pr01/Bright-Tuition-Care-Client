import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import Modal from "../../../Reusable/Modal/Modal";
import TextInput from "../../../Reusable/TextInput/TextInput";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { useState } from "react";

type TFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type TAddOrUpdateStaffModalProps = {
  isStaffModalOpen: boolean;
  setIsStaffModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<"add" | "edit">>;
};

const AddOrUpdateStaffModal: React.FC<TAddOrUpdateStaffModalProps> = ({
  isStaffModalOpen,
  setIsStaffModalOpen,
  modalType,
  setModalType,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      isModalOpen={isStaffModalOpen}
      setIsModalOpen={setIsStaffModalOpen}
      heading={`${modalType === "add" ? "Add" : "Update"} Staff`}
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
            {...register("name", {
              required: "Name is required",
            })}
          />

          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Enter email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {/* Phone */}
          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            error={errors.phone}
            {...register("phone", {
              required: "Phone number is required",
            })}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="Must be at least 8 Characters"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            label={"Cancel"}
            variant="tertiary"
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
            onClick={() => {
              setIsStaffModalOpen(false);
              setModalType("add");
            }}
          />
          <Button
            type="submit"
            label={modalType === "add" ? "Add Staff" : "Update Staff"}
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddOrUpdateStaffModal;
