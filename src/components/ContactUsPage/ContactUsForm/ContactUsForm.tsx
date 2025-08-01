import { useForm } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";

type TFormData = {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
};

const ContactUsForm = () => {
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
      className="flex flex-col gap-6 w-full lg:w-[60%] bg-neutral-50/20 rounded-2xl p-5"
    >
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
