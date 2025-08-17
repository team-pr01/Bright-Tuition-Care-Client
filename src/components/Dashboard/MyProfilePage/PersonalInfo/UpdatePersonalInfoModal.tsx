import { useForm } from "react-hook-form";
import Textarea from "../../../Reusable/TextArea/TextArea";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

type TFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  additionalNumber: string;
  dateOfBirth: string;
  gender: string;
  identityType: string;
  religion: string;
  nationality: string;
  fatherName: string;
  fatherNumber: string;
  motherName: string;
  motherNumber: string;
  city?: string;
  address: string;
  personalOverview: string;
  facebook: string;
  linkedin: string;
};

const UpdatePersonalInfoModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleUpdateInfo = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          error={errors.fullName}
          {...register("fullName", {
            required: "Full Name is required",
          })}
        />
        {/* Email */}
        <TextInput
          label="Email"
          type="email"
          placeholder="Enter email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
          })}
        />

        {/* Phone Number */}
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Phone number is required",
          })}
        />

        {/* Additional Number */}
        <TextInput
          label="Additional Number"
          type="tel"
          placeholder="Enter additional number"
          error={errors.additionalNumber}
          {...register("additionalNumber")}
        />

        {/* Date of Birth */}
        <TextInput
          label="Date of Birth"
          type="date"
          placeholder="Enter date of birth"
          error={errors.dateOfBirth}
          {...register("dateOfBirth", {
            required: "Date of Birth is required",
          })}
        />

        {/* Gender */}
        <TextInput
          label="Gender"
          placeholder="Enter gender"
          error={errors.gender}
          {...register("gender", {
            required: "Gender is required",
          })}
        />

        {/* Identity Type */}
        <TextInput
          label="Identity Type"
          placeholder="Enter identity type"
          error={errors.identityType}
          {...register("identityType")}
        />

        {/* Religion */}
        <TextInput
          label="Religion"
          placeholder="Enter religion"
          error={errors.religion}
          {...register("religion")}
        />

        {/* Nationality */}
        <TextInput
          label="Nationality"
          placeholder="Enter nationality"
          error={errors.nationality}
          {...register("nationality")}
        />

        {/* Father's Name */}
        <TextInput
          label="Father's Name"
          placeholder="Enter father's name"
          error={errors.fatherName}
          {...register("fatherName")}
        />

        {/* Father's Number */}
        <TextInput
          label="Father's Number"
          type="tel"
          placeholder="Enter father's number"
          error={errors.fatherNumber}
          {...register("fatherNumber")}
        />

        {/* Mother's Name */}
        <TextInput
          label="Mother's Name"
          placeholder="Enter mother's name"
          error={errors.motherName}
          {...register("motherName")}
        />

        {/* Mother's Number */}
        <TextInput
          label="Mother's Number"
          type="tel"
          placeholder="Enter mother's number"
          error={errors.motherNumber}
          {...register("motherNumber")}
        />

        {/* City */}
        <TextInput
          label="City"
          placeholder="Enter city"
          error={errors.city}
          {...register("city")}
        />

        {/* Address */}
        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          {...register("address", {
            required: "Address is required",
          })}
        />

        {/* Facebook */}
        <TextInput
          label="Facebook"
          type="url"
          placeholder="Enter Facebook profile URL"
          error={errors.facebook}
          {...register("facebook")}
        />

        {/* LinkedIn */}
        <TextInput
          label="LinkedIn"
          type="url"
          placeholder="Enter LinkedIn profile URL"
          error={errors.linkedin}
          {...register("linkedin")}
        />
      </div>

      {/* Personal Overview */}
      <Textarea
        label="Personal Overview"
        placeholder="Write about yourself"
        error={errors.personalOverview}
        {...register("personalOverview", {
          required: "Personal Overview is required",
        })}
      />

      <div className="flex items-center gap-4 justify-end">
        <Button
          type="submit"
          label="Cancel"
          variant="tertiary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
        />
      </div>
    </form>
  );
};

export default UpdatePersonalInfoModal;
