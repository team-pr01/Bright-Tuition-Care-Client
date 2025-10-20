import { useEffect, useState } from "react";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { Link } from "react-router-dom";
import { useChangePasswordMutation, useResetPasswordMutation } from "../../../../redux/Features/Auth/authApi";
import toast from "react-hot-toast";

type TFormData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = ({isNavigatedFromVerifyOtp}:{isNavigatedFromVerifyOtp:boolean}) => {
  const [changePassword,{isLoading}] =useChangePasswordMutation();
  const [resetPassword,{isLoading:isResetPasswordLoading}] =useResetPasswordMutation();
  const [phoneNumber, setPhoneNumber] = useState<string |null>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormData>();

  // To compare confirmPassword with password
  const passwordValue = watch("password");
 useEffect(() => {
    const phoneNumber = localStorage.getItem("forgetPasswordPhNo");
    setPhoneNumber(phoneNumber);
  }, []);

  const handleResetPassword = async(data: TFormData) => {
   try{
    if(!isNavigatedFromVerifyOtp){
    const payload={
      currentPassword:data.currentPassword,
      newPassword:data.confirmPassword,
    };
    const res= await changePassword(payload).unwrap();
    if(res?.success){
      toast.success("Password changed successfully");
    }}
    else{
       const payload={
      phoneNumber:phoneNumber,
      newPassword:data.confirmPassword,
    };
    const res= await resetPassword(payload).unwrap();
    if(res?.success){
      toast.success("Password changed successfully");
    }
    }
   }catch(err){
    console.error("Error resetting password:", err);
   }
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title="Reset Your Password"
        description="Enter a new password below to secure your account. Make sure your password is at least 8 characters long."
      />

      <div className="bg-neutral-50/10 border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
         { !isNavigatedFromVerifyOtp &&<PasswordInput
            label="current Password"
            placeholder="Enter your current password"
            error={errors.currentPassword}
            {...register("currentPassword", {
              required: "current Password is required",
              minLength: {
                value: 8,
                message: "current Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />}
          <PasswordInput
            label="Password"
            placeholder="Must be at least 8 Characters"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-type your password"
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            isPasswordVisible={isConfirmPasswordVisible}
            setIsPasswordVisible={setIsConfirmPasswordVisible}
          />
        </div>
        <div className="flex md:gap-0 items-center justify-between">
          <Button
            type="submit"
            label="Sign In"
            variant="primary"
            icon={ICONS.topRightArrow}
            className="py-2 lg:py-2"
            isDisabled={isLoading || isResetPasswordLoading}
            isLoading={isLoading || isResetPasswordLoading}
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

export default ResetPasswordForm;
