import { useState } from "react";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

type TFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const ChangePasswordForm = () => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormData>();

  // To compare confirmPassword with password
  const passwordValue = watch("newPassword");

  const handleChangePassword = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="flex flex-col gap-6"
    >
      <h1 className="font-semibold text-lg text-neutral-10/90">
        Change Your Password
      </h1>
      <div className="flex flex-col gap-6">
        <PasswordInput
          label="Current Password"
          placeholder="Enter your current password"
          error={errors.currentPassword}
          {...register("currentPassword", {
            required: "Current password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          isPasswordVisible={isCurrentPasswordVisible}
          setIsPasswordVisible={setIsCurrentPasswordVisible}
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          error={errors.newPassword}
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          isPasswordVisible={isNewPasswordVisible}
          setIsPasswordVisible={setIsNewPasswordVisible}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Re-type your password"
          error={errors.confirmNewPassword}
          {...register("confirmNewPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
          isPasswordVisible={isConfirmPasswordVisible}
          setIsPasswordVisible={setIsConfirmPasswordVisible}
        />
      </div>
      <Button
        type="submit"
        label="Submit"
        variant="primary"
        iconWithoutBg={ICONS.topRightArrowWhite}
        className="py-2 lg:py-2"
      />
    </form>
  );
};

export default ChangePasswordForm;
