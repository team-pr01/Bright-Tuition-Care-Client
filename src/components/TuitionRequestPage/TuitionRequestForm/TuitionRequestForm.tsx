/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";
import { useParams } from "react-router-dom";
import { useRequestForTutorMutation } from "../../../redux/Features/Lead/leadApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import toast from "react-hot-toast";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import ToastMessage from "../../Reusable/ToastMessage/ToastMessage";

type TFormData = {
  guardianPhoneNumber: string;
  class?: string;
  address?: string;
  details?: string;
};

const TuitionRequestForm = () => {
  const { id } = useParams();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [requestForTutor, { isLoading }] = useRequestForTutorMutation();

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
        userId: user?._id || null,
        tutorId: id || null,
      };

      const res = await requestForTutor(payload).unwrap();
      if (res?.success) {
        toast.custom(() => (
          <ToastMessage
            title={"Submitted Successfully!"}
            subTitle={
              "Thank you for submitting your tutor request. One of our executives will contact you within 24 hours to verify your requirements and publish it on our job board."
            }
          />
        ));
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
    <div className="font-Nunito">
      <h2 className="text-2xl lg:text-[38px] font-semibold lg:font-bold text-neutral-10">
        Need an expert tutor?
      </h2>
      <p className="text-neutral-20 leading-[24px]">
        Please share your phone number and your student&apos;s class/grade.
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitRequest)}
        className="flex flex-col gap-6 bg-neutral-50/20 border border-primary-10/30 rounded-2xl p-3 md:p-5 mt-7"
      >
        <TextInput
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.guardianPhoneNumber}
          {...register("guardianPhoneNumber", {
            required: "Phone number is required",
          })}
        />
        <TextInput
          label="Student's Class/Grade (Optional)"
          placeholder="Enter student's class/grade"
          {...register("class")}
          isRequired={false}
        />

        <div className="flex justify-end">
          <Button
            label="Next"
            type="submit"
            variant="primary"
            className="py-2 lg:py-2 px-3 lg:px-6"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default TuitionRequestForm;
