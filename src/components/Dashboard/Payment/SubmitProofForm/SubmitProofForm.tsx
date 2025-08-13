/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";

type TFormData = {
  senderNumber: string;
  bankName? : string
  file?: string;
  amount?: string;
};

type TSubmitProofFormProps = {
  amount: number;
  selectedPaymentMethod: string;
  setPaymentModalType: React.Dispatch<
    React.SetStateAction<
      "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
    >
  >;
};

const SubmitProofForm: React.FC<TSubmitProofFormProps> = ({
  amount,
  selectedPaymentMethod,
  setPaymentModalType,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSubmitProof = (data: TFormData) => {
    console.log(selectedPaymentMethod);
    console.log(data);
    setPaymentModalType("paymentSuccess");
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitProof)}
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
        />
      </div>

      <p className="text-neutral-20 mt-2 max-w-[400px] mx-auto text-center">
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
