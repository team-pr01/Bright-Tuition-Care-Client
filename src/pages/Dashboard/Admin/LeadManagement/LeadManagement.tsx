/* eslint-disable @typescript-eslint/no-explicit-any */
import Table, {
  type TableAction,
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import { FaCheck, FaMoneyBillWave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const LeadManagement = () => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isLoading = false;

  //   Table heads
  const leadTheads: TableHead[] = [
    { key: "_id", label: "ID" },
    { key: "addedBy", label: "Added By" },
    { key: "guardianPhoneNumber", label: "Guardian Phone Number" },
    { key: "class", label: "Class" },
    { key: "guardianAddress", label: "Guardian Address" },
    { key: "details", label: "Details" },
    { key: "createdAt", label: "Added On" },
    { key: "paymentNumber", label: "Payment Number" },
    { key: "status", label: "Status" },
  ];

  // Mock data
  const allLeads: any[] = [
    {
      _id: "Lead-001",
      tutorName: "John Doe",
      tutorPhoneNumber: "John Doe",
      guardianPhoneNumber: "+880 1711 223344",
      class: "Class 8",
      guardianAddress: "Banani, Dhaka",
      details: "Looking for an English tutor for his son.",
      createdAt: "2025-09-15",
      paymentNumber: "+880 1888 112233",
      status: "confirmed",
    },
    {
      _id: "Lead-002",
      tutorName: "John Doe",
      tutorPhoneNumber: "John Doe",
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
      tutorName: "John Doe",
      tutorPhoneNumber: "John Doe",
      guardianPhoneNumber: "+880 1533 445566",
      class: "Class 6",
      guardianAddress: "Gulshan, Dhaka",
      details: "Searching for a tutor in general subjects.",
      createdAt: "2025-09-18",
      paymentNumber: "+880 1999 445566",
      status: "confirmed",
    },
    {
      _id: "Lead-004",
      tutorName: "John Doe",
      tutorPhoneNumber: "John Doe",
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
  const tableData = allLeads.map((lead) => ({
    ...lead,
    addedBy: (
      <p>
        {lead?.tutorName ? lead?.tutorName : "N/A"}
        {lead?.tutorPhoneNumber ? lead?.tutorPhoneNumber : "N/A"}
      </p>
    ),
    paymentNumber: (
      <span className="text-gray-700">
        {lead?.paymentNumber ? lead?.paymentNumber : "N/A"}
      </span>
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

  const actions: TableAction<any>[] = [
    {
      label: "Confirm",
      icon: <FaCheck className="text-green-600" />,
      onClick: (row) => console.log("object"),
    },
    {
      label: "Cancel",
      icon: <MdCancel className="text-red-600" />,
      onClick: (row) => console.log("object"),
    },
    {
      label: "Mark as Paid",
      icon: <FaMoneyBillWave className="text-green-600" />,
      onClick: (row) => console.log("object"),
    },
  ];

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  return (
    <div>
      <Table<any>
        title="All Leads"
        description="Manage all leads here."
        theads={leadTheads}
        data={tableData}
        actions={actions}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default LeadManagement;
