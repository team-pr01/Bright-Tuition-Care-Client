/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { useState } from "react";
import { RiPhoneFill } from "react-icons/ri";
import { useForgotPasswordMutation } from "../../../../redux/Features/Auth/authApi";
import toast from "react-hot-toast";

type TFormData = {
  method: string;
  email?: string;
  phoneNumber?: string;
};

const ForgotPasswordForm = () => {
  const [forgotPassword,{isLoading}]= useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const navigate= useNavigate();
  const handleForgotPassword =async (data: TFormData) => {
    try{const payload={
    phoneNumber:data.phoneNumber
   }
   if (data.phoneNumber) {
     localStorage.setItem("forgetPasswordPhNo", data.phoneNumber);
   }
   const res= await forgotPassword(payload).unwrap();
   if(res.success){
    navigate("/verify-otp",{state:{from:"forgot-password"}});
   }
  }catch(err:any){
    toast.error(err?.data?.message || "Failed to send OTP. Please try again.");
  }
   
  };

  const [activeTab, setActiveTab] = useState<string>("phone");

  const tabButtons = [
    {
      label: "phone",
      icon: <RiPhoneFill />,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title="Forgot Password?"
        description="Please enter your email address to receive a link to reset your password."
      />
      <div className="bg-neutral-50/10 border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        {/* Tab buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
          {tabButtons?.map((button) => (
            <button
              key={button?.label}
              onClick={() => setActiveTab(button?.label)}
              type="button"
              className={`text-sm md:text-base rounded-3xl px-3 py-2 flex items-center gap-3 border cursor-pointer ${
                button?.label === activeTab
                  ? "bg-primary-10/5 text-primary-10 border-primary-10/80"
                  : "bg-white text-neutral-20 border-neutral-45/20"
              }`}
            >
              <div
                className={` size-7 rounded-full flex items-center justify-center  ${
                  button?.label === activeTab
                    ? "bg-primary-10/20 "
                    : "bg-neutral-50/60"
                }`}
              >
                {button?.icon}
              </div>
              Get OTP on {button?.label}
            </button>
          ))}
        </div>

        
          <TextInput
            label="Phone Number"
            placeholder="Enter your registered phone number"
            type="number"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
        

        <div className="flex md:gap-0 items-center justify-between">
          <Button
            type="submit"
            label="Submit"
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-2 lg:py-2"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
          <p className="font-lg leading-[24px] text-neutral-20">
            Back to{" "}
            <Link
              to="/signin"
              className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
