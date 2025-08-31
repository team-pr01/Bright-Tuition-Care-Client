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
  email: string;
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Tutor"
              checked={selectedRole === "Tutor"}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="w-5 h-5 accent-primary-10 cursor-pointer"
            />
            <span className="text-neutral-800">Tutor</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="Guardian/Student"
              checked={selectedRole === "Guardian/Student"}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="w-5 h-5 accent-primary-10 cursor-pointer"
            />
            <span className="text-neutral-800">Guardian/Student</span>
          </label>
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
      <TextInput
        label="Email"
        placeholder="Enter your email"
        error={errors.email}
        {...register("email")}
        type="email"
        isRequired={false}
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
