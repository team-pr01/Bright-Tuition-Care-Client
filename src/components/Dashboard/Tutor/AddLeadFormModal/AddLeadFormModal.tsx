import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";

type TFormData = {
  class: string;
  phoneNumber: string;
  address: string;
  details: string;
};

const AddLeadFormModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleAddLead = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h1 className="text-xl font-semibold ">Fill the details to add lead</h1>

      <form
        onSubmit={handleSubmit(handleAddLead)}
        className="flex flex-col gap-6 w-full"
      >
        {/* Class/Grade */}
        <TextInput
          label="Class/Grade"
          placeholder="Enter class"
          error={errors.class}
          {...register("class", {
            required: "Class/Grade is required",
          })}
        />
        {/* Guardian/Student Number */}
        <TextInput
          label="Guardian/Student Number"
          placeholder="Enter guardian/student number"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Guardian/Student number is required",
          })}
        />
        {/*Address */}
        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          {...register("address", {
            required: "Address is required",
          })}
        />
        {/*Details */}
        <Textarea
          label="Details"
          placeholder="Enter details of lead"
          error={errors.details}
          {...register("details", {
            required: "Details is required",
          })}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
        />
      </form>
    </div>
  );
};

export default AddLeadFormModal;
