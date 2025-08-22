import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

type TFormData = {
  phoneNumber: string;
  email: string;
};
const UpdateContactInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const handleUpdateContactInfo = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleUpdateContactInfo)}
      className="flex flex-col gap-6"
    >
      <h1 className="font-semibold text-lg text-neutral-10/90">
        Update Contact Info
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <TextInput
          label="Email"
          placeholder="Enter your email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          isDisabled={true} // NOTE : Email cannot be changed
        />

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
      />
    </form>
  );
};

export default UpdateContactInfoForm;
