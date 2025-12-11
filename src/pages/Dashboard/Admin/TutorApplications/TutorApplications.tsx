/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAllApplicationOfATutorQuery } from "../../../../redux/Features/Application/applicationApi";
import { formatDate } from "../../../../utils/formatDate";
import type { TableHead } from "../../../../components/Reusable/Table/Table";
import Table from "../../../../components/Reusable/Table/Table";

const TutorApplications = () => {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const {
    data: applications,
    isLoading,
    isFetching,
  } = useGetAllApplicationOfATutorQuery({
    userId: userId as string,
    page,
    limit,
  });

  console.log(applications);

  // Table headers
  const applicationTheads: TableHead[] = [
    { key: "appliedDate", label: "Applied Date" },
    { key: "status", label: "Status" },
    { key: "jobTitle", label: "Job Title" },
    // { key: "cv", label: "View CV" },
  ];

  const tableData =
    applications?.data?.applications?.map((application: any) => {
      return {
        id: application._id,
        status: <span className="capitalize">{application.status}</span>,
        jobTitle: application.job?.title || "N/A",
        appliedDate: formatDate(application.createdAt),
        // cv: (
        //   <button
        //     onClick={() => {
        //       if (application.status === "withdrawn") {
        //         toast.error("Cannot view CV. Application is withdrawn.");
        //         return;
        //       }

        //       navigate(
        //         `/dashboard/${path}/application/${application._id}/resume/${application.tutorId}`
        //       );
        //     }}
        //     className="text-primary-10 cursor-pointer flex items-center gap-1 hover:underline"
        //   >
        //     <FiEye className="size-4" /> View CV
        //   </button>
        // ),
      };
    }) || [];
  return (
    <div>
      <Table<any>
        title="Applications Data"
        description="Manage all applications"
        theads={applicationTheads}
        data={tableData || []}
        totalPages={applications?.data?.meta?.totalPages || 1}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
        selectedArea={null}
      />
    </div>
  );
};

export default TutorApplications;
