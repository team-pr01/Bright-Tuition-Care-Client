/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import type { TableHead } from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import Table from "../../../../components/Reusable/Table/Table";
import { FiEye } from "react-icons/fi";

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
  { key: "appliedDate", label: "Applied Date" },
  { key: "jobTitle", label: "Job Title" },
  { key: "tutorId", label: "Tutor ID" },
  { key: "jobId", label: "Job ID" },
  { key: "cv", label: "View CV" },
];

const Applications = () => {
  const { jobId } = useParams();
  console.log("Job/Context ID:", jobId);
  const path = "admin";

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const loading = false;

  const applications: Application[] = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://i.pravatar.cc/40?img=1",
      appliedDate: "2025-09-15",
      jobTitle: "Need a Math Tutor",
      tutorId: "TUT123",
      jobId: "JOB456",
      cvUrl: "/cvs/johndoe.pdf",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://i.pravatar.cc/40?img=2",
      appliedDate: "2025-09-16",
      jobTitle: "Need a Math Tutor",
      tutorId: "TUT456",
      jobId: "JOB789",
      cvUrl: "/cvs/janesmith.pdf",
    },
  ];

  const tableData = applications.map((application) => ({
    ...application,
    jobTitle: application.jobTitle,
    name: (
      <div className="flex items-center gap-2">
        <img
          src={application.photo}
          alt={application.name}
          className="size-8 rounded-full object-cover"
        />
        <span>{application.name}</span>
      </div>
    ),
    cv: (
      <Link
        to={`/dashboard/${path}/applications/resume/${application.tutorId}`}
        className="text-primary-10 cursor-pointer flex items-center gap-1"
      >
        <FiEye className="size-4" /> View
      </Link>
    ),
  }));

  const handleSearch = (q: string) => {
    console.log("Search query:", q);
  };

  return (
    <div>
      <Table<Application>
        title="Applications Data"
        description="Manage all applications"
        theads={applicationTheads}
        data={tableData}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={loading}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
      />
    </div>
  );
};

export default Applications;
