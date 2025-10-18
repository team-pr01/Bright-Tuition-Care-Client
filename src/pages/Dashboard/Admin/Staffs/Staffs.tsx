/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type {
  TableAction,
  TableHead,
} from "../../../../components/Reusable/Table/Table";
import Table from "../../../../components/Reusable/Table/Table";
import Button from "../../../../components/Reusable/Button/Button";
import AddNewStaffModal from "../../../../components/Admin/StaffsPage/AddOrUpdateStaffModal/AddOrUpdateStaffModal";

const Staffs = () => {
  const [isStaffModalOpen, setIsStaffModalOpen] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit">("add");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isLoading = false;

  // Table headers
  const staffTheads: TableHead[] = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "joinedDate", label: "Joined Date" },
  ];

  // Mock data
  const allStaffs: any[] = [
    {
      _id: "Staff-001",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+44 1234 567890",
      joinedDate: "2025-01-15",
      profilePhoto: "https://i.pravatar.cc/40?img=10",
    },
    {
      _id: "Staff-002",
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+44 9876 543210",
      joinedDate: "2025-03-20",
      profilePhoto: "https://i.pravatar.cc/40?img=11",
    },
  ];

  // Actions
  const actions: TableAction<any>[] = [
    {
      label: "Edit Info",
      icon: <FiEdit2 className="inline mr-2" />,
      onClick: (row) => {
        setModalType("edit");
        setSelectedStaffId(row?._id);
        setIsStaffModalOpen(true);
      },
    },
    {
      label: "Delete",
      icon: <FiTrash2 className="inline mr-2" />,
      onClick: (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
          alert(`Deleted ${row.name}`);
        }
      },
    },
  ];

  // Format table data
  const tableData = allStaffs.map((staff) => ({
    ...staff,
    name: (
      <div className="flex items-center gap-2">
        <img
          src={staff.profilePhoto}
          alt={staff.name}
          className="size-8 rounded-full object-cover"
        />
        <span>{staff.name}</span>
      </div>
    ),
  }));

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  const addStaffButton = (
    <Button
      label="Add New Staff"
      onClick={() => {
        setModalType("add");
        setIsStaffModalOpen(true);
      }}
      className="px-3 lg:px-3 py-2 lg:py-2 border-none"
    />
  );

  return (
    <div>
      <Table<any>
        title="All Staffs"
        description="Manage all staff members on the platform."
        theads={staffTheads}
        data={tableData}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading}
        onSearch={handleSearch}
        actions={actions}
        limit={limit}
        setLimit={setLimit}
        children={addStaffButton}
        selectedCity={null}
      />

      <AddNewStaffModal
        isStaffModalOpen={isStaffModalOpen}
        setIsStaffModalOpen={setIsStaffModalOpen}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
};

export default Staffs;
