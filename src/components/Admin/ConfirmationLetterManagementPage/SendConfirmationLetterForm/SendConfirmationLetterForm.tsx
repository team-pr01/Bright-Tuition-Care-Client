import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Button from "../../../Reusable/Button/Button";

type TFormData = {
  jobId: string;
};
const SendConfirmationLetterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSendConfirmationLetter = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(handleSendConfirmationLetter)} className="flex items-center gap-3">
        {/* Job Id */}
      <TextInput
        label="Job Id"
        placeholder="Enter job id"
        error={errors.jobId}
        {...register("jobId", {
          required: "Job Id is required",
        })}
      />
      <Button label="Get Data" variant="primary" className="py-[14px] lg:py-[14px] mt-[26px] text-nowrap text-xs lg:text-xs" />
      </form>

       {/* Tuition Details */}
      <div className="my-6">
        <h3 className="font-semibold text-neutral-5 mb-2">Tuition Details</h3>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <p>Subject: Mathematics</p>
          <p>Class: 8</p>
          <p>Schedule: Mon, Wed, Fri - 6 PM</p>
          <p>Location: Dhaka</p>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <h4 className="font-semibold text-neutral-5 mb-1">
            Guardian/Student
          </h4>
          <p>Name: John Doe</p>
          <p>ID: G-102</p>
          <p>Phone: 0123456789</p>
        </div>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm">
          <h4 className="font-semibold text-neutral-5 mb-1">Tutor</h4>
          <p>Name: Jane Smith</p>
          <p>ID: T-501</p>
          <p>Phone: 0987654321</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          label="Submit"
          variant="primary"
          className="py-2 lg:py-2"
        />
      </div>
    </div>
  );
};

export default SendConfirmationLetterForm;
