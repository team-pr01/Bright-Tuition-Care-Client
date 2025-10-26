/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import { useParams } from "react-router-dom";
import { useAddLeadMutation } from "../../../redux/Features/Lead/leadApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import toast from "react-hot-toast";

type TFormData = {
  guardianPhoneNumber: string;
  email: string;
  class: string;
  address: string;
  details: string;
};
const TuitionRequestForm = () => {
  const { id } = useParams();
  const user = useSelector(useCurrentUser);
  const [addLead, { isLoading }] = useAddLeadMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();
  const handleSubmitRequest = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
        userId: user?._id ? user?._id : null,
        tutorId: id,
      };
      const res = await addLead(payload).unwrap();
      if (res?.success) {
        toast.success("Tuition request submitted successfully.");
        reset();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error submitting tuition request. Please try again."
      );
    }
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
        error={errors.address}
        {...register("address")}
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
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>
    </form>
  );
};

export default TuitionRequestForm;
