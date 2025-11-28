/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import { useState } from "react";

type TFormData = {
  role: string;
  name: string;
  phoneNumber: string;
  message: string;
};

const ContactUsForm = () => {
  const [selectedRole, setSelectedRole] = useState<any>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitRequest = (data: TFormData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitRequest)}
      className="flex flex-col gap-6 bg-neutral-50/20 border border-primary-10/30 rounded-2xl p-3 md:p-5 font-Nunito max-w-full lg:max-w-[60%] mx-auto"
    >
      {/* Role input boxes */}
      <div className="flex flex-col gap-3">
        <label className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16]">
          I am a <span className="text-primary-10">*</span>
        </label>

        <div className="flex gap-6">
          {[
            { value: "Tutor", label: "Tutor" },
            { value: "Guardian/Student", label: "Guardian/Student" },
          ].map((role) => (
            <label
              key={role.value}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="relative">
                {/* Hidden native input for accessibility */}
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  checked={selectedRole === role.value}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                  className="sr-only"
                />

                {/* Custom circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedRole === role.value
                      ? "border-primary-10"
                      : "border-gray-300"
                  }`}
                >
                  {selectedRole === role.value && (
                    <div className="w-2.5 h-2.5 bg-primary-10 rounded-full transition-all duration-300" />
                  )}
                </div>
              </div>

              <span
                className={`text-neutral-800 transition-colors ${
                  selectedRole === role.value ? "text-primary-10" : ""
                }`}
              >
                {role.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <TextInput
        label="Name"
        placeholder="Enter your full name"
        error={errors.name}
        {...register("name", {
          required: "Name is required",
        })}
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        error={errors.phoneNumber}
        {...register("phoneNumber")}
      />
      <Textarea
        label="Message"
        placeholder="Please enter your concern"
        rows={6}
        error={errors.message}
        {...register("message")}
        isRequired={false}
      />

      <div className="flex flex-row gap-4 items-center justify-center lg:justify-start">
        <Button
          type="submit"
          label="Submit"
          variant="primary"
          icon={ICONS.topRightArrow}
        />
        <p className="text-neutral-5 font-semibold">Or</p>
        <a href="tel:+8801616012365">
          <Button
            label="Call Now"
            variant="secondary"
            icon={ICONS.phone}
            iconBg="#fff"
            className="border border-neutral-55"
          />
        </a>
      </div>
    </form>
  );
};

export default ContactUsForm;
