import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";

type TFormData = {
  jobId: string;
  tutorName: string;
  tutorId: string;
  phoneNumber: string;
  jobTitle: string;
  amount: string;
};

const SendInvoiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSendInvoice = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSendInvoice)} className="space-y-4 mt-5">
      {/* Job Id */}
      <TextInput
        label="Job Id"
        placeholder="Enter job id"
        error={errors.jobId}
        {...register("jobId", {
          required: "Job Id is required",
        })}
      />

      {/* Tutor Name */}
      <TextInput
        label="Tutor Name"
        placeholder="Enter tutor name"
        error={errors.tutorName}
        {...register("tutorName", {
          required: "Tutor Name is required",
        })}
      />

      {/* Tutor Id */}
      <TextInput
        label="Tutor Id"
        placeholder="Enter tutor id"
        error={errors.tutorId}
        {...register("tutorId", {
          required: "Tutor Id is required",
        })}
      />

      {/* Phone Number */}
      <TextInput
        label="Phone Number"
        placeholder="Enter phone number"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          required: "Phone Number is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers are allowed",
          },
        })}
      />

      {/* Job Title */}
      <TextInput
        label="Job Title"
        placeholder="Enter job title"
        error={errors.jobTitle}
        {...register("jobTitle", {
          required: "Job Title is required",
        })}
      />

      {/* Amount */}
      <TextInput
        label="Amount"
        placeholder="Enter amount"
        error={errors.amount}
        {...register("amount", {
          required: "Amount is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Amount must be a number",
          },
        })}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          label="Send Invoice"
          variant="primary"
          className="py-2 lg:py-2"
        />
      </div>
    </form>
  );
};

export default SendInvoiceForm;
