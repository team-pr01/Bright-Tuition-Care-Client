/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { usePayMutation } from "../../../../redux/Features/Payment/paymentApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

type TFormData = {
  senderNumber: string;
  transactionId?: string;
  bankName?: string;
  file?: FileList;
  amount?: string;
};

type TSubmitProofFormProps = {
  amount: number;
  selectedPaymentMethod: string;
  paidFor: string;
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitProofForm: React.FC<TSubmitProofFormProps> = ({
  amount,
  selectedPaymentMethod,
  paidFor,
  setIsPaymentModalOpen,
}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [pay, { isLoading }] = usePayMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleCompletePayment = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("userId", user?._id);
      formData.append("senderAccountNumber", data.senderNumber);
      formData.append("transactionId", data.transactionId || "");
      formData.append("paymentMethod", selectedPaymentMethod);
      formData.append("bankName", data.bankName || "");
      formData.append("paidFor", paidFor);
      formData.append("amount", amount.toString());
      if (data.file && data.file.length > 0) {
        formData.append("file", data.file[0]);
      }
      const response = await pay(formData).unwrap();
      if (response?.success) {
        toast.success(
          response?.message ||
            "Payment is successful. Please wait for admin approval."
        );
        setIsPaymentModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error completing payment. Please try again."
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCompletePayment)}
      className="flex flex-col w-full"
    >
      <div className="flex flex-col gap-4 mt-4">
        {selectedPaymentMethod === "bankTransfer" && (
          <TextInput
            label="Bank Name"
            placeholder="Enter bank name"
            error={errors.bankName}
            {...register("bankName", {
              required: "Bank name is required",
            })}
          />
        )}

        <TextInput
          label={
            selectedPaymentMethod !== "bankTransfer"
              ? "Sender Phone Number"
              : "Sender Account Number"
          }
          placeholder={`Enter sender ${
            selectedPaymentMethod !== "bankTransfer" ? "phone" : "account"
          } number`}
          error={errors.senderNumber}
          {...register("senderNumber", {
            required: "Number is required",
          })}
        />

        {selectedPaymentMethod !== "bankTransfer" && (
          <TextInput
            label={"Transaction Id"}
            placeholder={`Enter transaction id`}
            error={errors.transactionId}
            {...register("transactionId")}
            isRequired={false}
          />
        )}
        <TextInput
          label="Screenshot of Payment (optional)"
          type="file"
          {...register("file")}
          error={errors.file as any}
          isRequired={false}
        />
        <TextInput
          label="Amount"
          error={errors.amount}
          {...register("amount")}
          value={amount.toString()}
          isDisabled={true}
        />

        <Button
          type="submit"
          label="Submit"
          variant="primary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>

      <p className="text-sm md:text-base text-neutral-20 mt-4 md:mt-2 max-w-[400px] mx-auto text-center">
        Having any problem with payment?{" "}
        <a
          href="tel:01720000000"
          className="underline font-semibold text-primary-10"
        >
          Call Us
        </a>
      </p>
    </form>
  );
};

export default SubmitProofForm;
