/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetMyApplicationsQuery,
} from "../../../../redux/Features/Tutor/tutorApi";
import type { TableHead } from "../../../../components/Reusable/Table/Table";
import Table from "../../../../components/Reusable/Table/Table";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useReApplyMutation, useWithdrawApplicationMutation } from "../../../../redux/Features/Application/applicationApi";

const MyApplications = () => {
  const { status } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [statusFilter, setStatusFilter] = useState<string>(
    status ? status : ""
  );

  const [reApply, { isLoading: isReApplyOnJobLoading }] =
    useReApplyMutation();
  const { data, isLoading, isFetching } = useGetMyApplicationsQuery({
    page,
    limit,
    keyword: searchQuery,
    status: statusFilter,
  });
  const [withdrawApplication, { isLoading: isWithdrawingApplication }] =
    useWithdrawApplicationMutation();

  //   Table heads
  const applicationTheads: TableHead[] = [
    { key: "jobId", label: "Job ID" },
    { key: "title", label: "Job title" },
    { key: "salary", label: "Salary" },
    { key: "location", label: "Location" },
    { key: "createdAt", label: "Applied On" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const tableData =
    data?.data?.applications?.map((app: any) => ({
      _id: app._id,
      jobId: app.job?.jobId || "N/A",
      title: app.job?.title || "N/A",
      salary: app.job?.salary
        ? `৳${app.job.salary.toLocaleString()}`
        : "Not specified",
      location: `${app.job?.city || ""}${
        app.job?.area ? `, ${app.job.area}` : ""
      }`,
      createdAt: new Date(app.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: (
        <div
          className={`px-2 py-1 rounded-xl font-Nunito w-fit capitalize ${
            app.status === "accepted"
              ? "bg-green-100 text-green-600"
              : app.status === "pending"
              ? "bg-orange-100 text-orange-600"
              : app.status === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {app.status}
        </div>
      ),
      action: (
        <>
          {app?.status === "withdrawn" ? (
            <button
              onClick={() => handleReApplyOnJob(app?._id)}
              className="text-primary-10 hover:underline cursor-pointer disabled:cursor-not-allowed"
              disabled={isReApplyOnJobLoading}
            >
              {isReApplyOnJobLoading ? "Please wait..." : "Re-Apply"}
            </button>
          ) : (
            <button
              onClick={() => handleWithdrawApplication(app._id)}
              className="text-primary-10 hover:underline cursor-pointer disabled:cursor-not-allowed"
              disabled={isWithdrawingApplication}
            >
              {isWithdrawingApplication
                ? "Please wait..."
                : "Withdraw Application"}
            </button>
          )}
        </>
      ),
    })) || [];

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  const handleWithdrawApplication = async (id: string) => {
    try {
      const res = await withdrawApplication(id).unwrap();
      if (res?.success) {
        toast.success("Application withdrawn successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error withdrawing application. Please try again."
      );
    }
  };

  const handleReApplyOnJob = async (id: string) => {
    try {
      const response = await reApply(id).unwrap();
      if (response?.success) {
        toast.success(response.message || "Re-applied on job successfully.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error applying on job. Please try again."
      );
    }
  };

  const statusFilterDropdown = (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
    >
      <option value="">All Applications</option>
      <option value="applied">Applied</option>
      <option value="withdrawn">Withdrawn</option>
      <option value="shortlisted">Shortlisted</option>
      <option value="appointed">Appointed</option>
      <option value="confirmed">Confirmed</option>
      <option value="rejected">Rejected</option>
    </select>
  );
  return (
    <div>
      <Table<any>
        title="My Applications"
        description="All the applications you have made."
        theads={applicationTheads}
        data={tableData || []}
        totalPages={data?.data?.meta?.totalPages}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={isLoading || isFetching}
        onSearch={handleSearch}
        limit={limit}
        setLimit={setLimit}
        selectedCity={null}
        selectedArea={null}
        children={statusFilterDropdown}
      />
    </div>
  );
};

export default MyApplications;
