/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import type { TableHead } from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import Table from "../../../../components/Reusable/Table/Table";
import { FiEye } from "react-icons/fi";
import { useGetAllApplicationsByJobIdQuery } from "../../../../redux/Features/Application/applicationApi";
import { formatDate } from "../../../../utils/formatDate";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import toast from "react-hot-toast";

type Application = {
  id: number;
  name: any;
  photo: string;
  appliedDate: string;
  jobTitle: string;
  tutorId: string;
  jobId: string;
  cvUrl: string;
};

// Table headers
const applicationTheads: TableHead[] = [
  { key: "name", label: "Applicant Name" },
  // { key: "email", label: "Email" },
  // { key: "phoneNumber", label: "Phone Number" },
  { key: "location", label: "Location" },
  { key: "appliedDate", label: "Applied Date" },
  { key: "status", label: "Status" },
  { key: "jobId", label: "Job Id" },
  { key: "cv", label: "View CV" },
];

const Applications = () => {
  const { jobId } = useParams();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const path = user?.role === "admin" ? "admin" : "guardian";
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const navigate = useNavigate();

  const {
    data: applications,
    isLoading,
    isFetching,
  } = useGetAllApplicationsByJobIdQuery({
    jobId: jobId as string,
    page,
    limit,
    keyword: searchQuery,
  });

  const tableData =
    applications?.data?.applications?.map((application: any) => {
      return {
        id: application._id,
        jobId: application.jobId || "N/A",
        name: (
          <div>
            <span className="block font-medium">{application.userName}</span>
            <span className="block text-sm text-gray-500">
              {application.tutorCustomId}
            </span>
          </div>
        ),
        // email: application.userEmail,
        // phoneNumber: application.userPhoneNumber,
        location: `${application.userArea}, ${application.userCity}`,
        appliedDate: formatDate(application.createdAt),
        status: <span className="capitalize bg-primary-10/10 text-primary-10 px-3 py-1 rounded-full text-xs font-bold font-Nunito">{application.status}</span>,
        appliedOn: new Date(application.appliedOn).toLocaleDateString(),
        cv: (
          <button
            onClick={() => {
              if (application.status === "withdrawn") {
                toast.error("Cannot view CV. Application is withdrawn.");
                return;
              }

              navigate(
                `/dashboard/${path}/application/${application._id}/resume/${application.tutorId}?status=${application.status}&jobId=${application.jobId}`
              );
            }}
            className="text-primary-10 cursor-pointer flex items-center gap-1 hover:underline"
          >
            <FiEye className="size-4" /> View CV
          </button>
        ),
      };
    }) || [];

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  return (
    <div>
      <Table<Application>
        title="Applications Data"
        description="Manage all applications"
        theads={applicationTheads}
        data={tableData || []}
        totalPages={applications?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
        selectedArea={null}
      />
    </div>
  );
};

export default Applications;
