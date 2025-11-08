/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../../../components/Reusable/Modal/Modal";
import Table, {
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Reusable/Button/Button";
import SelectDropdown from "../../../../components/Reusable/SelectDropdown/SelectDropdown";
import {
  useGetMyLeadsQuery,
  useUpdateLeadInfoMutation,
} from "../../../../redux/Features/Lead/leadApi";
import type { TLead } from "../../../../types/lead.types";
import toast from "react-hot-toast";

type TFormData = {
  paymentMethod: string;
  paymentAccountNumber: string;
};

const MyLeads = () => {
  const [updateLeadInfo, { isLoading: isUpdatingInfo }] =
    useUpdateLeadInfoMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: myLeads,
    isLoading,
    isFetching,
  } = useGetMyLeadsQuery({ page, limit, keyword: searchQuery });

  //   Table heads
  const leadTheads: TableHead[] = [
    { key: "_id", label: "ID" },
    { key: "guardianPhoneNumber", label: "Guardian Phone Number" },
    { key: "class", label: "Class" },
    { key: "address", label: "Guardian Address" },
    { key: "details", label: "Details" },
    { key: "createdAt", label: "Added On" },
    { key: "paymentAccountNumber", label: "Payment Method" },
    { key: "status", label: "Status" },
  ];

  // Formatted table data
  const tableData = myLeads?.data?.leads?.map((lead: TLead) => ({
    ...lead,
    paymentAccountNumber: lead?.paymentAccountNumber ? (
      <span className="text-gray-700">
        {lead?.paymentMethod}, {lead?.paymentAccountNumber}
      </span>
    ) : (
      <button
        onClick={() => {
          setIsPaymentModalOpen(true);
          setSelectedLeadId(lead?._id);
        }}
        className="text-blue-500 cursor-pointer"
      >
        Add Payment Method
      </button>
    ),
    status: (
      <div
        className={`px-2 py-1 rounded-xl font-Nunito w-fit capitalize ${
          lead?.status === "confirmed"
            ? "bg-green-100 text-green-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {lead?.status}
      </div>
    ),
  }));

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  const handleAddPaymentNumber = async (data: TFormData) => {
    try {
      const payload = {
        ...data,
      };
      const res = await updateLeadInfo({
        id: selectedLeadId,
        data: payload,
      }).unwrap();
      if (res?.success) {
        toast.success("Payment info updated successfully.");
        reset();
        setIsPaymentModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error updating payment info. Please try again."
      );
    }
  };
  
  return (
    <div>
      <Table<any>
        title="Leads"
        description="See your leads here."
        theads={leadTheads}
        data={tableData || []}
        totalPages={myLeads?.data?.meta?.totalPages}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
        selectedArea={null}
      />

      <Modal
        heading="Add Payment Number"
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
        width="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[25%] h-[90vh] 2xl:h-fit overflow-y-auto"
      >
        <form
          onSubmit={handleSubmit(handleAddPaymentNumber)}
          className="space-y-4 mt-5"
        >
          {/* Payment Method */}
          <SelectDropdown
            label="Payment Method"
            options={["Bkash", "Nagad", "Rocket"]}
            error={errors.paymentMethod}
            {...register("paymentMethod")}
          />
          {/*Bkash/Nagad Personal Number */}
          <TextInput
            label="Bkash/Nagad Personal Number"
            type="number"
            placeholder="Enter your bkash/nagad personal number"
            error={errors.paymentAccountNumber}
            {...register("paymentAccountNumber", {
              required: "Payment number is required",
            })}
          />
          <Button
            type="submit"
            label="Submit"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex items-center justify-center"
            isLoading={isUpdatingInfo}
            isDisabled={isUpdatingInfo}
          />
        </form>
      </Modal>
    </div>
  );
};

export default MyLeads;
