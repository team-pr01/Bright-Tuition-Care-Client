/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, {
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { FiEye, FiSlash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SuspendUserModal from "../../../../components/Admin/SharedAdmin/SuspendUserModal/SuspendUserModal";

export type TableAction<T> = {
  label: any;
  onClick: (row: T) => void;
};

const Guardians = () => {
    const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedGuardianId, setSelectedGuardianId] = useState<string | null>(
    null
  );
  const [isSuspendUserModalOpen, setIsSuspendUserModalOpen] =
    useState<boolean>(false);

  const isLoading = false;

  // Updated table heads
  const guardianTheads: TableHead[] = [
    { key: "_id", label: "Guardian ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
    { key: "role", label: "Role" },
    { key: "registeredOn", label: "Registered On" },
    { key: "status", label: "Status" },
  ];

  // Mock data
  const allGuardiansOrStudents: any[] = [
    {
      _id: "G-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+44 1234 567890",
      city: "Dhaka",
      area: "Banani",
      role: "Guardian",
      registeredOn: "2025-09-15",
      status: "Active",
      photo: "https://i.pravatar.cc/40?img=1",
    },
    {
      _id: "S-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+44 9876 543210",
      city: "Dhaka",
      area: "Banani",
      role: "Guardian",
      registeredOn: "2025-09-16",
      status: "Pending",
      photo: "https://i.pravatar.cc/40?img=2",
    },
  ];

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => navigate(`/dashboard/admin/guardian/${row._id}`),
    },
    // {
    //   label: "Edit Info",
    //   icon: <FiEdit className="inline mr-2" />,
    //   onClick: (row) => console.log("Edit Info:", row),
    // },
    {
      label: "Suspend",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        setSelectedGuardianId(row._id);
        setIsSuspendUserModalOpen(true);
      },
    },
  ];

  // Format table data
  const tableData = allGuardiansOrStudents.map((guardian) => ({
    ...guardian,
    name: (
      <div className="flex items-center gap-2">
        <img
          src={guardian.photo}
          alt={guardian.name}
          className="size-8 rounded-full object-cover"
        />
        <span>{guardian.name}</span>
      </div>
    ),
  }));

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  return (
    <div>
      <Table<any>
        title="All Guardians/Students"
        description="Manage all the guardians and students registered on the platform."
        theads={guardianTheads}
        data={tableData}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading}
        onSearch={handleSearch}
        actions={actions}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        areaOptions={areaOptions}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        setAreaOptions={setAreaOptions}
        limit={limit}
        setLimit={setLimit}
      />
      <SuspendUserModal
        selectedGuardianId={selectedGuardianId}
        isSuspendUserModalOpen={isSuspendUserModalOpen}
        setIsSuspendUserModalOpen={setIsSuspendUserModalOpen}
      />
    </div>
  );
};

export default Guardians;
