import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import { useParams } from "react-router-dom";

type TFormData = {
  guardianPhoneNumber: string;
  email: string;
  class: string;
  guardianAddress: string;
  details: string;
};
const TuitionRequestForm = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitRequest = (data: TFormData) => {
    console.log(data, id);
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitRequest)}
      className="flex flex-col gap-6 bg-neutral-50/20 border border-primary-10/30 rounded-2xl p-3 md:p-5 font-Nunito max-w-full lg:max-w-[60%] mx-auto"
    >
      <TextInput
        label="Student's Class/Grade"
        placeholder="Enter student's class/grade"
        error={errors.class}
        {...register("class")}
      />

      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        error={errors.guardianPhoneNumber}
        {...register("guardianPhoneNumber")}
      />
      <TextInput
        label="Address"
        placeholder="Enter your address"
        error={errors.guardianAddress}
        {...register("guardianAddress")}
      />
      <Textarea
        label="Details (optional)"
        placeholder="Tell us about your tuition request"
        rows={6}
        error={errors.details}
        {...register("details")}
        isRequired={false}
      />

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          label="Submit"
          variant="primary"
          icon={ICONS.topRightArrow}
        />
      </div>
    </form>
  );
};

export default TuitionRequestForm;
