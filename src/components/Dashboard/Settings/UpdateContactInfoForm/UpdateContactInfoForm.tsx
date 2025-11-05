/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { useUpdateProfileMutation } from "../../../../redux/Features/User/userApi";
import toast from "react-hot-toast";

type TFormData = {
  phoneNumber: string;
  email: string;
};
const UpdateContactInfoForm = () => {
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const handleUpdateContactInfo = async (data: TFormData) => {
    try {
      const payload = { ...data };
      const response = await updateProfile(payload).unwrap();
      if (response.success) {
        toast.success("Contact info updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update contact info");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleUpdateContactInfo)}
      className="flex flex-col gap-6"
    >
      <h1 className="font-semibold text-lg text-neutral-10/90">
        Update Contact Info
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Number */}
        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Invalid phone number",
            },
          })}
        />
      </div>

      <Button
        type="submit"
        label="Update"
        variant="primary"
        iconWithoutBg={ICONS.topRightArrowWhite}
        className="py-2 lg:py-2"
        isLoading={isUpdating}
        isDisabled={isUpdating}
      />
    </form>
  );
};

export default UpdateContactInfoForm;
