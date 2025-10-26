/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Textarea from "../../../Reusable/TextArea/TextArea";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import { useUpdateTutorProfileInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import toast from "react-hot-toast";
import { filterData } from "../../../../constants/filterData";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import SelectDropdownWithSearch from "../../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import { useEffect, useState } from "react";

type TFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  additionalNumber: string;
  dateOfBirth: string;
  gender: string;
  religion: string;
  nationality: string;
  fatherName: string;
  fatherPhoneNumber: string;
  motherName: string;
  motherPhoneNumber: string;
  city?: any;
  area?: any;
  address: string;
  overview: string;
  facebook: string;
  instagram: string;
  linkedin: string;
};

const UpdatePersonalInfoModal = ({
  setIsFormModalOpen,
  defaultValues,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: any;
}) => {
  const [updateTutorProfileInfo, { isLoading }] =
    useUpdateTutorProfileInfoMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name);
      setValue("email", defaultValues.email);
      setValue("phoneNumber", defaultValues.phoneNumber);
      setValue("additionalNumber", defaultValues.additionalPhoneNumber);
      setValue(
        "dateOfBirth",
        defaultValues.dateOfBirth ? defaultValues.dateOfBirth.split("T")[0] : ""
      );
      setValue("gender", defaultValues.gender);
      setValue("religion", defaultValues.religion);
      setValue("nationality", defaultValues.nationality);
      setValue("fatherName", defaultValues.fatherName);
      setValue("fatherPhoneNumber", defaultValues.fatherPhoneNumber);
      setValue("motherName", defaultValues.motherName);
      setValue("motherPhoneNumber", defaultValues.motherPhoneNumber);
      setValue("city", defaultValues.city);
      setValue("area", defaultValues.area);
      setValue("address", defaultValues.address);
      setValue("overview", defaultValues.overview);
      setValue("facebook", defaultValues.socialMediaInformation?.facebook);
      setValue("instagram", defaultValues.socialMediaInformation?.instagram);
      setValue("linkedin", defaultValues.socialMediaInformation?.linkedin);
    }
  }, [defaultValues, setValue]);

  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const selectedCity = watch("city");
  const selectedArea = watch("area");

  // Update area options when city changes
  useEffect(() => {
    if (!selectedCity) {
      setAreaOptions([]);
      setValue("area", "");
      return;
    }

    const cityObj = filterData.cityCorporationWithLocation.find(
      (city) => city.name === selectedCity
    );
    const locations = cityObj?.locations || [];
    setAreaOptions(locations);
    setValue("area", "");
  }, [selectedCity, setValue]);

  const handleUpdateInfo = async (data: TFormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        city: data.city,
        area: data.area || selectedArea,
        personalInformation: {
          additionalPhoneNumber: data.additionalNumber,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          religion: data.religion,
          nationality: data.nationality,
          fatherName: data.fatherName,
          fatherPhoneNumber: data.fatherPhoneNumber,
          motherName: data.motherName,
          motherPhoneNumber: data.motherPhoneNumber,
          overview: data.overview,
        },
        socialMediaInformation: {
          facebook: data.facebook,
          instagram: data.instagram,
          linkedin: data.linkedin,
        },
      };
      const response = await updateTutorProfileInfo(payload).unwrap();
      if (response.success) {
        toast.success(response.message || "Personal info updated successfully");
        setIsFormModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error updating info. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-5 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <TextInput
          label="Full Name"
          placeholder="Enter full name"
          error={errors.name}
          {...register("name", {
            required: "Full Name is required",
          })}
          isRequired={false}
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
          isDisabled={true}
          isRequired={false}
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
          isRequired={false}
        />

        {/* Additional Number */}
        <TextInput
          label="Additional Number"
          type="tel"
          placeholder="Enter additional number"
          error={errors.additionalNumber}
          {...register("additionalNumber")}
          isRequired={false}
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
          isRequired={false}
        />

        {/* Gender */}
        <SelectDropdown
          label="Gender"
          options={filterData.tutorGender}
          {...register("gender", {
            required: "Gender is required",
          })}
          isRequired={false}
        />

        {/* Religion */}
        <TextInput
          label="Religion"
          placeholder="Enter religion"
          error={errors.religion}
          {...register("religion")}
          isRequired={false}
        />

        {/* Nationality */}
        <TextInput
          label="Nationality"
          placeholder="Enter nationality"
          error={errors.nationality}
          {...register("nationality")}
          isRequired={false}
        />

        {/* Father's Name */}
        <TextInput
          label="Father's Name"
          placeholder="Enter father's name"
          error={errors.fatherName}
          {...register("fatherName")}
          isRequired={false}
        />

        {/* Father's Number */}
        <TextInput
          label="Father's Number"
          type="tel"
          placeholder="Enter father's number"
          error={errors.fatherPhoneNumber}
          {...register("fatherPhoneNumber")}
          isRequired={false}
        />

        {/* Mother's Name */}
        <TextInput
          label="Mother's Name"
          placeholder="Enter mother's name"
          error={errors.motherName}
          {...register("motherName")}
          isRequired={false}
        />

        {/* Mother's Number */}
        <TextInput
          label="Mother's Number"
          type="tel"
          placeholder="Enter mother's number"
          error={errors.motherPhoneNumber}
          {...register("motherPhoneNumber")}
          isRequired={false}
        />

        {/* City Dropdown */}
        <SelectDropdownWithSearch
          label="City"
          name="city"
          options={filterData.cityCorporationWithLocation.map((c) => c.name)}
          value={selectedCity}
          onChange={(value) => setValue("city", value)}
          isRequired={false}
        />

        {/* Area Dropdown */}
        <SelectDropdownWithSearch
          label="Location"
          name="area"
          options={areaOptions}
          value={watch("area")}
          onChange={(value) => setValue("area", value)}
          isRequired={false}
        />

        {/* Address */}
        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          {...register("address", {
            required: "Address is required",
          })}
          isRequired={false}
        />

        {/* LinkedIn */}
        <TextInput
          label="LinkedIn"
          type="url"
          placeholder="Enter LinkedIn profile URL"
          error={errors.linkedin}
          {...register("linkedin")}
          isRequired={false}
        />

        {/* Facebook */}
        <TextInput
          label="Facebook"
          type="url"
          placeholder="Enter Facebook profile URL"
          error={errors.facebook}
          {...register("facebook")}
          isRequired={false}
        />

        {/* Facebook */}
        <TextInput
          label="Instagram"
          type="url"
          placeholder="Enter Instagram profile URL"
          error={errors.instagram}
          {...register("instagram")}
          isRequired={false}
        />
      </div>

      {/* Personal Overview */}
      <Textarea
        label="Personal Overview"
        placeholder="Write about yourself"
        error={errors.overview}
        {...register("overview", {
          required: "Personal Overview is required",
        })}
        isRequired={false}
      />

      <div className="flex items-center gap-4 justify-end">
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          onClick={() => setIsFormModalOpen(false)}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>
    </form>
  );
};

export default UpdatePersonalInfoModal;
