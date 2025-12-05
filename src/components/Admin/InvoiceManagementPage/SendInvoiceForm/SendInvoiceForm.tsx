/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { useEffect, useState } from "react";
import {
  useGetJobDetailsForInvoiceQuery,
  useSendInvoiceMutation,
} from "../../../../redux/Features/Invoice/invoiceApi";
import toast from "react-hot-toast";

type TFormData = {
  jobId: string;
  tutorName: string;
  userId: string;
  phoneNumber: string;
  jobTitle: string;
  dueDate: string;
  amount: string;
};

const SendInvoiceForm = ({
  setIsSendInvoiceModalOpen,
}: {
  setIsSendInvoiceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();
  const [activeTab, setActiveTab] = useState<string>("");
  const [sendInvoice, { isLoading: isSending }] = useSendInvoiceMutation();
  const [jobIdInput, setJobIdInput] = useState("");
  const [jobId, setJobId] = useState("");

  const {
    data: jobData,
    isLoading,
    isFetching,
  } = useGetJobDetailsForInvoiceQuery(jobId, {
    skip: !jobId,
  });

  useEffect(() => {
    if (jobData?.data) {
      setValue("tutorName", jobData.data.tutor?.name || "");
      setValue("userId", jobData.data.tutor?._id || "");
      setValue("phoneNumber", jobData.data.tutor?.phoneNumber || "");
      setValue("jobTitle", jobData.data.job?.title || "");
      setValue("amount", jobData.data.amount?.toString() || "");
    }
  }, [jobData, setValue]);

  const handleSendInvoice = async (data: TFormData) => {
    console.log(data);
    try {
      const payload = {
        invoiceType : activeTab === "Verification Charge" ? "verificationCharge" : "platformCharge",
        jobId: jobId ? jobId : null,
        userId: data.userId,
        amount: activeTab === "Verification Charge" ? 500 : data.amount,
        dueDate: data.dueDate,
      };
      const response = await sendInvoice(payload).unwrap();
      if (response?.success) {
        setJobId("");
        setJobIdInput("");
        toast.success("Invoice sent successfully.");
        setIsSendInvoiceModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send invoice.");
    }
  };


  const tabButtons = ["Verification Charge", "Platform Charge"];

  return (
    <div className="space-y-4 mt-5">
      <div className="flex flex-col lg:flex-row items-center gap-4 mb-2">
        {tabButtons?.map((button) => (
          <button
            key={button}
            onClick={() => setActiveTab(button)}
            type="button"
            className={`text-sm md:text-base rounded-3xl px-3 py-2 flex items-center gap-3 border cursor-pointer ${
              button === activeTab
                ? "bg-primary-10/5 text-primary-10 border-primary-10/80"
                : "bg-white text-neutral-20 border-neutral-45/20"
            }`}
          >
            {button}
          </button>
        ))}
      </div>

      {activeTab === "Platform Charge" && (
        <form className="flex items-center gap-3 mt-5">
          <TextInput
            name="jobId"
            label="Job Id"
            placeholder="Enter job id to get details"
            onChange={(e) => setJobIdInput(e.target.value)}
          />

          <Button
            type="button"
            label="Get Data"
            variant="primary"
            className="py-[14px] lg:py-[14px] mt-[26px] text-nowrap text-xs lg:text-xs"
            onClick={() => {
              if (!jobIdInput.trim()) return;
              setJobId(jobIdInput);
            }}
            isDisabled={isLoading || isFetching}
            isLoading={isLoading || isFetching}
          />
        </form>
      )}

      {activeTab === "Verification Charge" && (
        <form onSubmit={handleSubmit(handleSendInvoice)} className="flex flex-col items-center gap-3 mt-10">
          <TextInput
            label="Tutor/Guardian Id"
            placeholder="Enter tutor/guardian id"
           {...register("userId", {
              required: "Tutor/Guardian Id is required",
            })}
          />

          {/* Due Date */}
          <TextInput
            label="Due Date"
            error={errors.dueDate}
            type="date"
            {...register("dueDate", {
              required: "Due Date is required",
            })}
          />

          <Button
            type="submit"
            label="Send"
            variant="primary"
            className="py-[14px] lg:py-[14px] mt-2 text-nowrap text-xs lg:text-xs"
            isDisabled={isLoading || isFetching}
            isLoading={isLoading || isFetching}
          />
        </form>
      )}

      <form onSubmit={handleSubmit(handleSendInvoice)} className="space-y-4">
        {jobData?.data && (
          <div className="flex flex-col gap-3">
            {/* Tutor Name */}
            <TextInput
              label="Tutor Name"
              placeholder="Enter tutor name"
              error={errors.tutorName}
              {...register("tutorName", {
                required: "Tutor Name is required",
              })}
            />

            {/* Phone Number */}
            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              error={errors.phoneNumber}
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              })}
            />

            {/* Job Title */}
            <TextInput
              label="Job Title"
              placeholder="Enter job title"
              error={errors.jobTitle}
              {...register("jobTitle", {
                required: "Job Title is required",
              })}
            />

            {/* Amount */}
            <TextInput
              label="Amount"
              placeholder="Enter amount"
              error={errors.amount}
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Amount must be a number",
                },
              })}
            />

            {/* Due Date */}
            <TextInput
              label="Due Date"
              error={errors.dueDate}
              type="date"
              {...register("dueDate", {
                required: "Due Date is required",
              })}
            />
          </div>
        )}

        {jobData?.data && (
          <div className="flex justify-end">
            <Button
              type="submit"
              label="Send Invoice"
              variant="primary"
              className="py-2 lg:py-2"
              isLoading={isSending}
              isDisabled={isSending}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default SendInvoiceForm;
