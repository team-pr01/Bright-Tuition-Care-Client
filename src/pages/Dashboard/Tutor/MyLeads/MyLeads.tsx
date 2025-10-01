/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from "../../../../components/Reusable/Modal/Modal";
import Table, {
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Reusable/Button/Button";

type TFormData = {
  paymentNumber: string;
};

const MyLeads = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isLoading = false;

  //   Table heads
  const leadTheads: TableHead[] = [
    { key: "_id", label: "ID" },
    { key: "guardianPhoneNumber", label: "Guardian Phone Number" },
    { key: "class", label: "Class" },
    { key: "guardianAddress", label: "Guardian Address" },
    { key: "details", label: "Details" },
    { key: "createdAt", label: "Added On" },
    { key: "paymentNumber", label: "Payment Number" }, // ✅ new column
    { key: "status", label: "Status" },
  ];

  // Mock data
  const myLeads: any[] = [
    {
      _id: "Lead-001",
      guardianPhoneNumber: "+880 1711 223344",
      class: "Class 8",
      guardianAddress: "Banani, Dhaka",
      details: "Looking for an English tutor for his son.",
      createdAt: "2025-09-15",
      paymentNumber: "+880 1888 112233", // ✅ has number
      status: "confirmed",
    },
    {
      _id: "Lead-002",
      guardianPhoneNumber: "+880 1922 334455",
      class: "Class 10",
      guardianAddress: "Cumilla Cantonment, Cumilla",
      details: "Needs a Math and Science tutor for daughter.",
      createdAt: "2025-09-16",
      // no paymentNumber
      status: "pending",
    },
    {
      _id: "Lead-003",
      guardianPhoneNumber: "+880 1533 445566",
      class: "Class 6",
      guardianAddress: "Gulshan, Dhaka",
      details: "Searching for a tutor in general subjects.",
      createdAt: "2025-09-18",
      paymentNumber: "+880 1999 445566", // ✅ has number
      status: "confirmed",
    },
    {
      _id: "Lead-004",
      guardianPhoneNumber: "+880 1777 889900",
      class: "Class 9",
      guardianAddress: "Chattogram City",
      details: "Wants a Physics tutor for her son.",
      createdAt: "2025-09-19",
      // no paymentNumber
      status: "pending",
    },
  ];

  // Format table data
  const tableData = myLeads.map((lead) => ({
    ...lead,
    paymentNumber: lead?.paymentNumber ? (
      <span className="text-gray-700">{lead.paymentNumber}</span>
    ) : (
      <button
        onClick={() => {
          setIsPaymentModalOpen(true);
          setSelectedLeadId(lead?._id);
        }}
        className="text-blue-500 cursor-pointer"
      >
        Add Number
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

  const handleAddPaymentNumber = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div>
      <Table<any>
        title="Leads"
        description="See your leads here."
        theads={leadTheads}
        data={tableData}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
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
          {/*Bkash/Nagad Personal Number */}
          <TextInput
            label="Bkash/Nagad Personal Number"
            type="number"
            placeholder="Enter your bkash/nagad personal number"
            error={errors.paymentNumber}
            {...register("paymentNumber", {
              required: "Payment number is required",
            })}
          />
          <Button
            type="submit"
            label="Submit"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex items-center justify-center"
          />
        </form>
      </Modal>
    </div>
  );
};

export default MyLeads;
