/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import RoleTab from "./RoleTab";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdownWithSearch from "../../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { filterData } from "../../../../constants/filterData";
import { useSignupMutation } from "../../../../redux/Features/Auth/authApi";
import toast from "react-hot-toast";

type TFormData = {
  name: string;
  phoneNumber: string;
  email: string;
  gender: string;
  city: string;
  area: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<any>({
    gender: "",
    city: "",
    area: "",
  });
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TFormData>();

  const password = watch("password");
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const selectedCity = watch("city");
  const selectedGender = watch("gender");
  const selectedArea = watch("area");

  // Update area options when city changes
  useEffect(() => {
    if (!selectedCity) {
      setAreaOptions([]);
      setValue("area", "");
      return;
    }

    const cityObj = filterData.cityCorporationWithLocation.find(
      (city) => city.name === selectedCity
    );
    const locations = cityObj?.locations || [];
    setAreaOptions(locations);
    setValue("area", "");
  }, [selectedCity, setValue]);

  const handleSignup = async (data: TFormData) => {
    if (!selectedCity) {
      setFieldErrors((prev: any) => ({
        ...prev,
        city: "City is required",
      }));
    }
    if (!selectedArea) {
      setFieldErrors((prev: any) => ({
        ...prev,
        area: "Area is required",
      }));
    }
    if (!selectedGender) {
      setFieldErrors((prev: any) => ({
        ...prev,
        gender: "Gender is required",
      }));
    }
    try {
      const res = await signup(data).unwrap();
      if (res?.success) {
        localStorage.setItem("signupEmail", data.email);
        navigate("/verify-otp");
        reset();
        setFieldErrors({ gender: "", city: "", area: "" });
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Something went wrong during signup. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title=" Choose role and get started"
        description="Sign up to get started. Select the role that fits you best and join our community."
      />

      <RoleTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-neutral-50/10 border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <TextInput
            label="Name"
            placeholder="Enter your full name"
            error={errors.name}
            {...register("name", {
              required: "Name is required",
            })}
          />

          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />

          {/* Phone Number */}
          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            type="number"
            error={errors.phoneNumber}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
          />

          {/* Gender */}
          <SelectDropdownWithSearch
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            onChange={(value) => setValue("gender", value.toLocaleLowerCase())}
            isRequired={true}
            error={fieldErrors.gender}
          />

          {/* City Dropdown */}
          <SelectDropdownWithSearch
            label="City"
            name="city"
            options={filterData.cityCorporationWithLocation.map((c) => c.name)}
            value={selectedCity}
            onChange={(value) => setValue("city", value)}
            isRequired={true}
            error={fieldErrors.city}
          />

          {/* Area Dropdown */}
          <SelectDropdownWithSearch
            label="Location"
            name="area"
            options={areaOptions}
            value={watch("area")}
            onChange={(value) => setValue("area", value)}
            isRequired={true}
            error={fieldErrors.area}
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

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-type your password"
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            isPasswordVisible={isConfirmPasswordVisible}
            setIsPasswordVisible={setIsConfirmPasswordVisible}
          />
        </div>

        {/* Terms & Conditions Agreement */}
        <label className="flex items-center gap-[10px] cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="relative">
            <span
              className={`${
                checked
                  ? "opacity-100 z-20 scale-[1]"
                  : "opacity-0 scale-[0.4] z-[-1]"
              } transition-all duration-200 absolute top-0 left-0`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 335">
                  <rect
                    id="Rectangle 331"
                    x="-0.00012207"
                    y="6.10352e-05"
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-[#0d99ff]"
                    stroke="#0d99ff"
                  ></rect>
                  <path
                    id="Vector"
                    d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                    fill="white"
                  ></path>
                </g>
              </svg>
            </span>

            <span
              className={`${
                !checked
                  ? "opacity-100 z-20 scale-[1]"
                  : "opacity-0 scale-[0.4] z-[-1]"
              } transition-all duration-200`}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 335">
                  <rect
                    id="Rectangle 331"
                    x="-0.00012207"
                    y="6.10352e-05"
                    width="20"
                    height="20"
                    rx="4"
                    className="fill-transparent"
                    stroke="#545454"
                  ></rect>
                </g>
              </svg>
            </span>
          </div>

          <p className="text-neutral-20 leading-5 text-sm md:text-base">
            By signing up, you agree to our{" "}
            <Link
              to="/terms-and-conditions"
              className="text-primary-10 font-semibold underline"
            >
              Terms and Conditions.
            </Link>
          </p>
        </label>

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between">
          <Button
            type="submit"
            label={isLoading ? "Signing Up..." : "Sign Up"}
            variant="primary"
            icon={ICONS.topRightArrow}
            className="py-2 lg:py-2"
            isDisabled={!checked || isLoading}
            isLoading={isLoading}
          />

          <p className="text-sm md:text-base leading-[24px] text-neutral-20">
            Already have an account?{" "}
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

export default SignupForm;
