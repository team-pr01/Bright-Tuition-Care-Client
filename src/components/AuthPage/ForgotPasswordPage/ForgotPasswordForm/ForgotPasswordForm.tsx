import { useForm } from "react-hook-form";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { Link } from "react-router-dom";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

type TFormData = {
  email: string;
};

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleForgotPassword = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleForgotPassword)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title="Forgot Password?"
        description="Please enter your email address to receive a link to reset your password."
      />
      <div className="bg-neutral-50/10 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        <div></div>
        {/* Email */}
        <TextInput
          label="Email"
          placeholder="Enter your registered email address"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />

        <div className="flex md:gap-0 items-center justify-between">
          <Button
            type="submit"
            label="Sign In"
            variant="primary"
            icon={ICONS.topRightArrow}
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
