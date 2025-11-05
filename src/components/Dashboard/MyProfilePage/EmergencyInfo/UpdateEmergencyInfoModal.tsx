/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";
import { useUpdateTutorProfileInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

type TFormData = {
  emergencyContactPersonName: string;
  relation: string;
  phoneNumber: string;
  address: string;
};
const UpdateEmergencyInfoModal = ({
  setIsFormModalOpen,
  defaultValues
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues : any
}) => {
  const [updateTutorProfileInfo, { isLoading }] =
    useUpdateTutorProfileInfoMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (defaultValues) {
      setValue("emergencyContactPersonName", defaultValues.name);
      setValue("relation", defaultValues.relation);
      setValue("phoneNumber", defaultValues.number);
      setValue("address", defaultValues.address);
    }
  }, [defaultValues, setValue]);

  const handleUpdateInfo = async (data: TFormData) => {
    try {
      const payload = {
        emergencyInformation: {
          emergencyContactPersonName: data.emergencyContactPersonName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          relation: data.relation,
        },
        profileCompleted: 10
      };
      const response = await updateTutorProfileInfo(payload).unwrap();
      if (response.success) {
        toast.success(
          response.message || "Emergency info updated successfully"
        );
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
          label="Name"
          placeholder="Enter emergency contact person name"
          error={errors.emergencyContactPersonName}
          {...register("emergencyContactPersonName", {
            required: "Name is required",
          })}
        />
        {/* Relation */}
        <TextInput
          label="Relation"
          type="text"
          placeholder="Enter relation"
          error={errors.relation}
          {...register("relation", {
            required: "Relation is required",
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

        {/* Address */}
        <TextInput
          label="Address"
          type="tel"
          placeholder="Enter address"
          error={errors.address}
          {...register("address", {
            required: "Address is required",
          })}
        />
      </div>

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

export default UpdateEmergencyInfoModal;
