import { useState } from "react";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../Reusable/TextInput/TextInput";
import RoleTab from "../../SignupPage/SignupForm/RoleTab";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { ICONS } from "../../../../assets";
import { useLoginMutation } from "../../../../redux/Features/Auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/Features/Auth/authSlice";
import Cookies from "js-cookie";

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
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSigIn = async (data: TFormData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const res = await login(payload).unwrap();
      if (res?.success) {
        Cookies.set("accessToken", res?.data?.accessToken, {
          expires: 7, 
          secure: true,
          sameSite: "strict",
        });
        dispatch(
          setUser({ user: res?.data?.user, token: res?.data?.accessToken })
        );
      };
      if(res?.data?.user?.role==="admin"){
        navigate("/dashboard/admin/home");
      }
      else if(res?.data?.user?.role==="tutor"){
        navigate("/dashboard/tutor/home");
      }
      else{
        navigate("/dashboard/guardian/home");
      }
      reset();
    } catch (err) {
      console.error("Login failed:", err);
      reset();
    }
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
      <div className="bg-neutral-50/10 border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-3 md:gap-6">
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

        <div className="flex items-center justify-end md:justify-between">
          <p className="font-lg leading-[24px] text-neutral-20 hidden md:block">
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
            className="text-primary-10 font-semibold underline text-end text-sm md:text-base"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-col gap-3 items-center justify-between">
          <Button
            type="submit"
            label="Sign In"
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-2 lg:py-2 w-full md:w-fit"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
          <p className="text-sm md:font-lg leading-[24px] text-neutral-20 block md:hidden">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
