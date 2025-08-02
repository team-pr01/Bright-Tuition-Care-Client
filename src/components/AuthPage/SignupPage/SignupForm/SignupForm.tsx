import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import RoleTab from "./RoleTab";
import TextInput from "../../../Reusable/TextInput/TextInput";
import SelectDropdownWithSearch from "../../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";
import PasswordInput from "../../../Reusable/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { filterData } from "../../../../constants/filterData";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TFormData>();

  const password = watch("password");

  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const selectedCity = watch("city");

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

  const handleSignup = (data: TFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="flex flex-col gap-6 font-Nunito"
    >
        <AuthHeading title=" Choose role and get started" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi nisi totam magnam itaque consequatur facilis laboriosam fuga in reprehenderit." />

      <RoleTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-neutral-50/20 rounded-2xl p-5 flex flex-col gap-6">
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
            value={selectedCity}
            onChange={(value) => setValue("gender", value)}
            isRequired={true}
          />

          {/* City Dropdown */}
          <SelectDropdownWithSearch
            label="City"
            name="city"
            options={filterData.cityCorporationWithLocation.map((c) => c.name)}
            value={selectedCity}
            onChange={(value) => setValue("city", value)}
            isRequired={true}
          />

          {/* Area Dropdown */}
          <SelectDropdownWithSearch
            label="Location"
            name="area"
            options={areaOptions}
            value={watch("area")}
            onChange={(value) => setValue("area", value)}
            isRequired={true}
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

        <p className="text-neutral-20 leading-5">
          By signing up, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            className="text-primary-10 font-semibold underline"
          >
            Terms and Conditions.
          </Link>
        </p>

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between">
          <Button
            label="Sign Up"
            variant="primary"
            icon={ICONS.topRightArrow}
          />

          <p className="font-lg leading-[24px] text-neutral-20">
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
