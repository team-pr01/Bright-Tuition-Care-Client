import { useParams } from "react-router-dom";
import type { TableHead } from "../../../../components/Reusable/Table/Table";
import { useState } from "react";
import Table from "../../../../components/Reusable/Table/Table";
import { FiEye } from "react-icons/fi";

type Application = {
  id: number;
  name: string;
  photo: string;
  appliedDate: string;
  jobTitle: string;
  tutorId: string;
  jobId: string;
  cvUrl: string;
};

// Define headers
const applicationTheads: TableHead[] = [
  { key: "name", label: "Applicant Name" },
  { key: "appliedDate", label: "Applied Date" },
  { key: "jobTitle", label: "Job Title" },
  { key: "tutorId", label: "Tutor ID" },
  { key: "jobId", label: "Job ID" },
  { key: "cv", label: "CV" },
];

const Applications = () => {
  const { jobId } = useParams();
  console.log("Job/Context ID:", jobId);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  // 🔹 Transform data for Table (so "photo + name" + CV button render properly)
  const tableData = applications.map((app) => ({
    ...app,
    jobTitle: app.jobTitle,
    name: (
      <div className="flex items-center gap-2">
        <img
          src={app.photo}
          alt={app.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>{app.name}</span>
      </div>
    ),
    cv: (
      <a
        href={app.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-10 cursor-pointer"
      >
        <FiEye className="w-5 h-5" />
      </a>
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
      />
    </div>
  );
};

export default Applications;
