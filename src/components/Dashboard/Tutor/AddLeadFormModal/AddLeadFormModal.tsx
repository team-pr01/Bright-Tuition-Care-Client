import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";

type TFormData = {
  class: string;
  guardianPhoneNumber: string;
  guardianAddress: string;
  details: string;
  paymentNumber: string;
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
          type="number"
          placeholder="Enter guardian/student number"
          error={errors.guardianPhoneNumber}
          {...register("guardianPhoneNumber", {
            required: "Guardian/Student number is required",
          })}
        />
        {/*Address */}
        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.guardianAddress}
          {...register("guardianAddress", {
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
        <div>
          {/*Bkash/Nagad Personal Number */}
        <TextInput
          label="Bkash/Nagad Personal Number"
          type="number"
          placeholder="Enter your bkash/nagad personal number"
          error={errors.paymentNumber}
          {...register("paymentNumber", {
            required: "Payment number is required",
          })}
        />
        <p className="italic text-[13px] text-orange-600 mt-2">**Please add your preferred payment method. Once your lead is confirmed, we will contact you and process your payment accordingly.</p>
        </div>
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
