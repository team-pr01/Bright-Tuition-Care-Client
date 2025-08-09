import { useState } from "react";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../Reusable/TextInput/TextInput";
import RoleTab from "../../SignupPage/SignupForm/RoleTab";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";

type TFormData = {
  email: string;
  password: string;
};

const SignInForm = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSigIn = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleSigIn)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title="Welcome Back!"
        description="Choose your role and enter your credentials below to access your personalized dashboard and resources."
      />

      <RoleTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-neutral-50/10 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
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
        </div>
        <div className="flex items-center justify-between">
          <p className="font-lg leading-[24px] text-neutral-20">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
          <Link
            to="/forgot-password"
            className="text-primary-10 font-semibold underline text-end"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex md:gap-0 items-center justify-between">
          <Button
            type="submit"
            label="Sign In"
            variant="primary"
            icon={ICONS.topRightArrow}
          />
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
