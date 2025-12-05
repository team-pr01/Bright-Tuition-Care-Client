/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { toast } from "react-hot-toast";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useRequestToRefundMutation } from "../../../../redux/Features/RefundRequest/refundRequestApi";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";

type TFormData = {
  jobId: string;
  amount: number;
  paymentMethod: string;
  bankName?: string;
  accountNumber: string;
  refundReason: string;
};

const SendRefundRequest = ({
  setIsRefundRequestModalOpen,
}: {
  setIsRefundRequestModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [requestToRefund, { isLoading }] = useRequestToRefundMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TFormData>();

  const paymentMethod = watch("paymentMethod");

  const handleRequestToRefund = async (data: TFormData) => {
    try {
      const response = await requestToRefund({
        jobId: data.jobId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        bankName: data?.bankName,
        accountNumber: data.accountNumber,
        refundReason: data.refundReason,
      }).unwrap();

      if (response?.success) {
        setIsRefundRequestModalOpen(false);
        toast.success(response?.message || "Refund request sent successfully");
        setError(null);
      }

      reset();
    } catch (error: any) {
      setError(error?.data?.message || "Error sending refund request.");
    }
  };

  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        Request a Refund
      </h1>

      <p className="text-sm mt-3 max-w-full md:max-w-[500px] text-neutral-600">
        Please provide the necessary details below. Refund requests are reviewed
        manually.
      </p>

      <form
        onSubmit={handleSubmit(handleRequestToRefund)}
        className="w-full flex flex-col gap-6 mt-6"
      >
        {/* Job ID */}
        <TextInput
          label="Job ID"
          placeholder="Enter job ID"
          error={errors.jobId}
          {...register("jobId", {
            required: "Job ID is required",
          })}
        />

        {/* Amount */}
        <TextInput
          label="Refund Amount"
          placeholder="Enter refund amount"
          type="number"
          error={errors.amount}
          {...register("amount", {
            required: "Amount is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Amount must be greater than 0",
            },
          })}
        />

        {/* Payment Method */}
        <SelectDropdown
          label="Payment Method"
          options={["bKash", "Nagad", "Rocket", "Bank Transfer"]}
          error={errors.paymentMethod}
          {...register("paymentMethod", {
            required: "Payment method is required",
          })}
        />

        {paymentMethod === "Bank Transfer" && (
          <TextInput
            label="Bank Name"
            placeholder="Enter bank name"
            error={errors.bankName}
            {...register("bankName", {
              required: "Bank name is required",
            })}
          />
        )}

        {/* Account Number */}
        <TextInput
          label="Account Number"
          placeholder="Enter account number"
          error={errors.accountNumber}
          {...register("accountNumber", {
            required: "Account number is required",
          })}
        />

        {/* Refund Reason */}
        <Textarea
          label="Reason for refund"
          placeholder="Please explain why you want a refund..."
          error={errors.refundReason}
          {...register("refundReason", {
            required: "Refund reason is required",
            minLength: {
              value: 10,
              message: "Please provide a meaningful reason",
            },
          })}
          isRequired
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            label="Cancel"
            variant="tertiary"
            className="py-2"
            onClick={() => {
              setIsRefundRequestModalOpen(false);
              reset();
              setError(null);
            }}
          />
          <Button
            type="submit"
            label="Submit Refund Request"
            variant="primary"
            className="py-2"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SendRefundRequest;
