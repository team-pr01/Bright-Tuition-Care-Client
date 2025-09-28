/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Table, {
  type TableAction,
  type TableHead,
} from "../../Reusable/Table/Table";
import { useState } from "react";
import { FiEye, FiSlash } from "react-icons/fi";
import SuspendUserModal from "../SharedAdmin/SuspendUserModal/SuspendUserModal";

const Tutors = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [isSuspendUserModalOpen, setIsSuspendUserModalOpen] =
    useState<boolean>(false);

  const isLoading = false;

  // Table headers
  const tutorTheads: TableHead[] = [
    { key: "_id", label: "Tutor ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "role", label: "Role" },
    { key: "registeredOn", label: "Registered On" },
    { key: "status", label: "Status" },
    { key: "profileStatus", label: "Profile Status" },
  ];

  // Mock data
  const allTutors: any[] = [
    {
      _id: "Tutor-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+44 1234 567890",
      role: "Tutor",
      registeredOn: "2025-09-15",
      status: "Active",
      profileStatus: "Locked",
      imageUrl: "https://i.pravatar.cc/40?img=1",
    },
    {
      _id: "Tutor-002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+44 9876 543210",
      role: "Tutor",
      registeredOn: "2025-09-16",
      status: "Pending",
      profileStatus: "Unlocked",
      imageUrl: "https://i.pravatar.cc/40?img=2",
    },
  ];

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => navigate(`/dashboard/admin/tutor/${row._id}`),
    },
    {
      label: "Suspend",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        setSelectedTutorId(row._id);
        setIsSuspendUserModalOpen(true);
      },
    },
  ];

  // Format table data
  const tableData = allTutors.map((tutor) => ({
    ...tutor,
    name: (
      <div className="flex items-center gap-2">
        <img
          src={tutor.imageUrl}
          alt={tutor.name}
          className="size-8 rounded-full object-cover"
        />
        <span>{tutor.name}</span>
      </div>
    ),
  }));

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  return (
    <div>
      <Table<any>
        title="All Registered Tutors"
        description="Manage all the tutors registered on the platform."
        theads={tutorTheads}
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
        selectedGuardianId={selectedTutorId}
        isSuspendUserModalOpen={isSuspendUserModalOpen}
        setIsSuspendUserModalOpen={setIsSuspendUserModalOpen}
      />
    </div>
  );
};

export default Tutors;
