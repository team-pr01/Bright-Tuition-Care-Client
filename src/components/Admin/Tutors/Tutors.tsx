/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Table, {
  type TableAction,
  type TableHead,
} from "../../Reusable/Table/Table";
import { useState } from "react";
import { FiEye, FiSlash } from "react-icons/fi";
import SuspendUserModal from "../SharedAdmin/SuspendUserModal/SuspendUserModal";
import { VscLock, VscUnlock } from "react-icons/vsc";
import toast from "react-hot-toast";
import {
  useGetAllTutorsQuery,
  useSetTutorOfTheMonthMutation,
} from "../../../redux/Features/Tutor/tutorApi";
import { HiOutlineUserCircle } from "react-icons/hi";
import type { TTutor } from "../../../types/tutor.types";
import { formatDate } from "../../../utils/formatDate";
import {
  useActiveUserMutation,
  useToggleProfileStatusMutation,
} from "../../../redux/Features/User/userApi";
import { IMAGES } from "../../../assets";
import UnlockRequestReasonModal from "./UnlockRequestReasonModal";

const Tutors = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [isSuspendUserModalOpen, setIsSuspendUserModalOpen] =
    useState<boolean>(false);
  const [unlockReason, setUnlockReason] = useState<string>("");
  const [isUnlockRequestReasonModalOpen, setIsUnlockRequestReasonModalOpen] =
    useState<boolean>(false);

  const { data, isLoading, isFetching } = useGetAllTutorsQuery({
    city: selectedCity,
    area: selectedArea,
    keyword: searchQuery,
    page,
    limit,
  });
  const [activeUser] = useActiveUserMutation();
  const [toggleProfileStatus] = useToggleProfileStatusMutation();
  const [setTutorOfTheMonth] = useSetTutorOfTheMonthMutation();

  const handleActiveTutor = async (id: string) => {
    try {
      await toast.promise(activeUser(id).unwrap(), {
        loading: "Loading...",
        success: "Tutor re-activated successfully!",
        error: "Failed to reactivate tutor. Please try again.",
      });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to reactivate tutor. Please try again."
      );
    }
  };

  const handleToggleTutorProfile = async (id: string) => {
    try {
      await toast.promise(toggleProfileStatus(id).unwrap(), {
        loading: "Loading...",
        success: "Status changed successfully!",
        error: "Failed to change status. Please try again.",
      });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to change status. Please try again."
      );
    }
  };

  const handleSetTutorOfTheMonth = async (id: string) => {
    try {
      await toast.promise(setTutorOfTheMonth(id).unwrap(), {
        loading: "Please wait...",
        success: "Tutor set as Tutor of the Month successfully!",
        error: "Failed. Please try again.",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed. Please try again.");
    }
  };

  // Table headers
  const tutorTheads: TableHead[] = [
    { key: "tutorId", label: "Tutor ID" },
    { key: "name", label: "Name" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
    { key: "registeredOn", label: "Registered On" },
    { key: "isVerified", label: "Verification Status" },
    { key: "status", label: "Status" },
    { key: "profileStatus", label: "Profile Status" },
    { key: "tutorOfTheMonth", label: "Tutor of the Month" },
    { key: "hasAppliedForUnlock", label: "Applied to Unlock Profile" },
  ];

  // Action Menu
  const actions: TableAction<any>[] = [
    {
      label: "View Profile",
      icon: <FiEye className="inline mr-2" />,
      onClick: (row) => navigate(`/dashboard/admin/tutor/${row._id}`),
    },
    {
      label: "Deactivate",
      icon: <FiSlash className="inline mr-2" />,
      onClick: (row) => {
        setSelectedTutorId(row.userId);
        setIsSuspendUserModalOpen(true);
      },
    },
    {
      label: "Active Tutor",
      icon: <HiOutlineUserCircle className="inline mr-2" />,
      onClick: (row) => {
        handleActiveTutor(row.userId);
      },
    },
    {
      label: "Lock Profile",
      icon: <VscLock className="inline mr-2" />,
      onClick: (row) => handleToggleTutorProfile(row?.userId),
    },
    {
      label: "Unlock Profile",
      icon: <VscUnlock className="inline mr-2" />,
      onClick: (row) => handleToggleTutorProfile(row?.userId),
    },
  ];

  // Formatted table data
  const tableData = data?.data?.tutors?.map((tutor: TTutor) => ({
    _id: tutor._id,
    userId: tutor.userId,
    tutorId: tutor.tutorId,
    name: (
      <div className="flex gap-2">
        <img
          src={tutor.imageUrl || IMAGES.dummyAvatar}
          alt={tutor?.name}
          className="size-7 rounded-full object-cover"
        />
        <div>
          <p className="capitalize">{tutor?.name}</p>
          <p>{tutor?.phoneNumber || "N/A"}</p>
          <p>{tutor?.email || "N/A"}</p>
        </div>
      </div>
    ),
    city: tutor?.city || "N/A",
    area: tutor?.area || "N/A",
    registeredOn: formatDate(tutor.createdAt),
    isVerified: tutor.isVerified ? "Verified" : "Not Verified",
    status: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          tutor.isSuspended
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {tutor.isSuspended ? "Deactivated" : "Active"}
      </span>
    ),
    profileStatus: (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
          tutor.profileStatus === "locked"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {tutor.profileStatus}
      </span>
    ),
    tutorOfTheMonth: (
      <>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize mr-2 ${
            tutor?.tutorOfTheMonth
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-orange-500"
          }`}
        >
          {tutor?.tutorOfTheMonth ? "Yes" : "No"}
        </span>
        {!tutor.tutorOfTheMonth && (
          <button
            onClick={() => handleSetTutorOfTheMonth(tutor._id)}
            className="text-xs font-Nunito text-neutral-10 underline cursor-pointer"
          >
            Set
          </button>
        )}
      </>
    ),
    hasAppliedForUnlock: (
      <button
        onClick={() => {
          setIsUnlockRequestReasonModalOpen(true);
          setUnlockReason(tutor.unlockRequestReason || "No reason provided");
        }}
        className={`${
          tutor.hasAppliedForUnlock
            ? "text-blue-600 underline"
            : "text-neutral-500"
        } text-xs font-Nunito cursor-pointer`}
      >
        {tutor.hasAppliedForUnlock ? "Yes" : "No"}
      </button>
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
        selectedGuardianId={selectedTutorId}
        isSuspendUserModalOpen={isSuspendUserModalOpen}
        setIsSuspendUserModalOpen={setIsSuspendUserModalOpen}
      />

      {isUnlockRequestReasonModalOpen && (
        <UnlockRequestReasonModal
          unlockReason={unlockReason}
          isUnlockRequestReasonModalOpen={isUnlockRequestReasonModalOpen}
          setIsUnlockRequestReasonModalOpen={setIsUnlockRequestReasonModalOpen}
        />
      )}
    </div>
  );
};

export default Tutors;
