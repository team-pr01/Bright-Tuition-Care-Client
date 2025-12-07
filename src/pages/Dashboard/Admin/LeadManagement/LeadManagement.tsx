/* eslint-disable @typescript-eslint/no-explicit-any */
import Table, {
  type TableAction,
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import { FaCheck, FaMoneyBillWave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  useGetAllLeadsQuery,
  useUpdateLeadInfoMutation,
} from "../../../../redux/Features/Lead/leadApi";
import type { TLead } from "../../../../types/lead.types";
import { formatDate } from "../../../../utils/formatDate";
import toast from "react-hot-toast";

const LeadManagement = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedBy, setAddedBy] = useState("all");

  const {
    data: allLeads,
    isLoading,
    isFetching,
  } = useGetAllLeadsQuery({ keyword: searchQuery, page, limit, addedBy });

  //   Table heads
  const leadTheads: TableHead[] = [
    { key: "leadId", label: "Lead ID" },
    { key: "tutorId", label: "Tutor ID" },
    { key: "addedBy", label: "Added By" },
    { key: "guardianPhoneNumber", label: "Guardian Phone Number" },
    { key: "class", label: "Class" },
    { key: "address", label: "Guardian Address" },
    { key: "details", label: "Details" },
    { key: "createdAt", label: "Added On" },
    { key: "paymentDetails", label: "Payment Details" },
    { key: "status", label: "Status" },
  ];

  // Format table data
  const tableData = allLeads?.data?.leads?.map((lead: TLead) => ({
    ...lead,
    leadId: lead?.leadId || "N/A",
    _id: lead?._id || "N/A",
    tutorId: lead?.tutorId?.tutorId || "N/A",
    class: lead?.class || "N/A",
    address: lead?.address || "N/A",
    details: lead?.details || "N/A",
    addedBy: (
      <p>
        {lead?.userId?.name ? lead?.userId?.name : "N/A"}
        <span className="block">
          {lead?.userId?.phoneNumber ? lead?.userId?.phoneNumber : "N/A"}
        </span>
      </p>
    ),
    paymentDetails: (
      <p>
        {lead?.paymentMethod ? lead?.paymentMethod : "N/A"}
        <span className="block">
          {lead?.paymentAccountNumber ? lead?.paymentAccountNumber : "N/A"}
        </span>
      </p>
    ),
    status: (
      <div
        className={`px-2 py-1 rounded-xl font-Nunito w-fit capitalize ${
          lead?.status === "confirmed" || lead?.status === "paid"
            ? "bg-green-100 text-green-600"
            : "bg-orange-100 text-orange-600"
        }`}
      >
        {lead?.status}
      </div>
    ),
    createdAt: formatDate(lead?.createdAt),
  }));

  const [updateLeadInfo] = useUpdateLeadInfoMutation();

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      const payload = {
        status,
      };
      await toast.promise(updateLeadInfo({ id, data: payload }).unwrap(), {
        loading: "Loading...",
        success: `Status updated to ${status}`,
        error: "Failed to update status. Please try again.",
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update status. Please try again."
      );
    }
  };

  const actions: TableAction<any>[] = [
    {
      label: "Confirm",
      icon: <FaCheck className="text-green-600" />,
      onClick: (row) => handleUpdateLeadStatus(row._id, "confirmed"),
    },
    {
      label: "Cancel",
      icon: <MdCancel className="text-red-600" />,
      onClick: (row) => handleUpdateLeadStatus(row._id, "cancelled"),
    },
    {
      label: "Mark as Paid",
      icon: <FaMoneyBillWave className="text-green-600" />,
      onClick: (row) => handleUpdateLeadStatus(row._id, "paid"),
    },
  ];

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  const roleBasedFilterDropdown = (
    <select
      value={addedBy}
      onChange={(e) => setAddedBy(e.target.value)}
      className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
    >
      <option value="all">All Leads</option>
      <option value="guardian">Leads from Guardian</option>
      <option value="tutor">Leads from Tutor</option>
    </select>
  );

  return (
    <div>
      <Table<any>
        title="All Leads & Tuition Requests"
        description="Manage all leads here."
        theads={leadTheads}
        data={tableData || []}
        actions={actions}
        totalPages={allLeads?.data?.meta?.totalPages}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
        selectedArea={null}
        children={roleBasedFilterDropdown}
      />
    </div>
  );
};

export default LeadManagement;
