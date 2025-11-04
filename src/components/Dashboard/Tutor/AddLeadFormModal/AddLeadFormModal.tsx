/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { useAddLeadMutation } from "../../../../redux/Features/Lead/leadApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

type TFormData = {
  class: string;
  guardianPhoneNumber: string;
  address: string;
  details: string;
  paymentNumber: string;
};

const AddLeadFormModal = ({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const navigate = useNavigate();
  const [addLead, { isLoading }] = useAddLeadMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleAddLead = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
        userId: user?._id,
      };
      const res = await addLead(payload).unwrap();
      if (res?.success) {
        toast.success("Lead added. please for admin approval.");
        setIsFormModalOpen(false);
        reset();
        navigate("/dashboard/tutor/my-leads");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error adding lead. Please try again."
      );
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h1 className="text-xl font-semibold ">Fill the details to add lead</h1>

      <form
        onSubmit={handleSubmit(handleAddLead)}
        className="flex flex-col gap-6 w-full"
      >
        {/* Class/Grade */}
        <TextInput
          label="Class/Grade"
          placeholder="Enter class"
          error={errors.class}
          {...register("class", {
            required: "Class/Grade is required",
          })}
        />
        {/* Guardian/Student Number */}
        <TextInput
          label="Guardian/Student Number"
          type="number"
          placeholder="Enter guardian/student number"
          error={errors.guardianPhoneNumber}
          {...register("guardianPhoneNumber", {
            required: "Guardian/Student number is required",
          })}
        />
        {/*Address */}
        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          {...register("address", {
            required: "Address is required",
          })}
        />
        {/*Details */}
        <Textarea
          label="Details"
          placeholder="Enter details of lead"
          error={errors.details}
          {...register("details", {
            required: "Details is required",
          })}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </form>
    </div>
  );
};

export default AddLeadFormModal;
