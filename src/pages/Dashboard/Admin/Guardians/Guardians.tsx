/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Table, {
  type TableHead,
} from "../../../../components/Reusable/Table/Table";
import { FiEye, FiSlash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SuspendUserModal from "../../../../components/Admin/SharedAdmin/SuspendUserModal/SuspendUserModal";
import { useGetAllGuardiansQuery } from "../../../../redux/Features/Guardian/guardianApi";
import { formatDate } from "../../../../utils/formatDate";
import { HiOutlineUserCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { useActiveUserMutation } from "../../../../redux/Features/User/userApi";

export type TableAction<T> = {
  label: any;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
};

const Guardians = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedGuardianId, setSelectedGuardianId] = useState<string | null>(
    null
  );
  const [isSuspendUserModalOpen, setIsSuspendUserModalOpen] =
    useState<boolean>(false);

  // Updated table heads
  const guardianTheads: TableHead[] = [
    { key: "_id", label: "Guardian ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
    { key: "role", label: "Role" },
    { key: "registeredOn", label: "Registered On" },
    { key: "status", label: "Status" },
  ];

  const { data, isLoading, isFetching } = useGetAllGuardiansQuery({
    city: selectedCity,
    area: selectedArea,
    keyword: searchQuery,
    page,
    limit,
  });
  const [activeUser] = useActiveUserMutation();

  const handleActiveUser = async (id: string) => {
    try {
      await toast.promise(activeUser(id).unwrap(), {
        loading: "Loading...",
        success: "User re-activated successfully!",
        error: "Failed to reactivate user. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => navigate(`/dashboard/admin/guardian/${row._id}`),
    },
    {
      label: "Suspend",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        setSelectedGuardianId(row.userId);
        setIsSuspendUserModalOpen(true);
      },
    },
    {
      label: "Active User",
      icon: <HiOutlineUserCircle className="inline mr-2" />,
      onClick: (row) => {
        handleActiveUser(row.userId);
      },
    },
  ];

  // Formatted table data
  const tableData = data?.data?.guardians?.map((guardian: any) => ({
    _id: guardian.guardianId,
    userId: guardian.userId,
    name: (
      <div className="flex items-center gap-2 capitalize">
        <img
          src={guardian.imageUrl}
          alt={guardian?.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{guardian?.name}</span>
      </div>
    ),
    email: guardian?.email || "N/A",
    phoneNumber: guardian?.phoneNumber || "N/A",
    city: guardian?.city || "N/A",
    area: guardian?.area || "N/A",
    role: guardian?.role || "N/A",
    registeredOn: formatDate(guardian.createdAt),
    status: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          guardian.isSuspended
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {guardian.isSuspended ? "Suspended" : "Active"}
      </span>
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
        data={tableData || []}
        totalPages={data?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        actions={actions}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        areaOptions={areaOptions}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
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
