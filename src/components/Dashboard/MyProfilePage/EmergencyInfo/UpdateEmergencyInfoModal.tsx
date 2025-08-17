import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

type TFormData = {
  name: string;
  relation: string;
  phoneNumber: string;
  address: string;
};
const UpdateEmergencyInfoModal = ({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleUpdateInfo = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-5 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <TextInput
          label="Name"
          placeholder="Enter name"
          error={errors.name}
          {...register("name", {
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
        />
      </div>
    </form>
  );
};

export default UpdateEmergencyInfoModal;
