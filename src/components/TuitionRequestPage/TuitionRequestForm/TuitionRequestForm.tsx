/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
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
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const phoneNumber = watch("guardianPhoneNumber");

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
            subTitle={"Thank you for submitting your tutor request."}
          />
        ));
        reset();
        setStep(1);
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
        {step === 1
          ? "Please share your phone number"
          : "Please provide the details below. You may skip this step if you wish."}
      </p>

      <form
        onSubmit={handleSubmit(handleSubmitRequest)}
        className="flex flex-col gap-6 bg-neutral-50/20 border border-primary-10/30 rounded-2xl p-3 md:p-5 mt-7"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <TextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              error={errors.guardianPhoneNumber}
              {...register("guardianPhoneNumber", {
                required: "Phone number is required",
              })}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                label="Next"
                variant="primary"
                isDisabled={!phoneNumber}
                onClick={() => setStep(2)}
                className="py-2 lg:py-2 px-3 lg:px-6"
              />
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <TextInput
              label="Student's Class/Grade (Optional)"
              placeholder="Enter student's class/grade"
              {...register("class")}
              isRequired={false}
            />

            <TextInput
              label="Address (Optional)"
              placeholder="Enter your address"
              {...register("address")}
              isRequired={false}
            />

            <Textarea
              label="Details (Optional)"
              placeholder="Tell us about your tuition request"
              rows={6}
              {...register("details")}
              isRequired={false}
            />

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                label="Go Back"
                variant="tertiary"
                onClick={() => setStep(1)}
                className="py-2 lg:py-2 px-3 lg:px-6"
              />

              <Button
                type="submit"
                label="Submit"
                variant="primary"
                isLoading={isLoading}
                isDisabled={isLoading}
                className="py-2 lg:py-2 px-3 lg:px-6"
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TuitionRequestForm;
