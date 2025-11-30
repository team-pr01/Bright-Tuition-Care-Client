/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import {
  FaUserFriends,
  FaChalkboardTeacher,
  FaBriefcase,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { useGetAdminStatsQuery } from "../../../../redux/Features/Admin/adminApi";

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p: any, index: number) => (
          <p key={index} style={{ color: p.color }}>
            {`${p.name}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- Chart Card ---
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-white py-5 rounded-xl shadow-lg border border-gray-100 min-h-[400px]">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 pl-5">{title}</h2>
    <div className="h-[300px] w-full">{children}</div>
  </div>
);

// --- Main Component ---
const AdminDashboardHome = () => {
  const { data: adminStats } = useGetAdminStatsQuery({});
  console.log(adminStats);

  const tutorColor = "#3B82F6";
  const guardianColor = "#10B981";

  // Job chart colors
  const jobsAreaColor = "#6366F1"; // Jobs posted
  const confirmedColor = "#10B981"; // ✅ Green
  const cancelledColor = "#EF4444"; // ❌ Red

  return (
    <div className="font-Nunito flex flex-col gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-6">
        <DashboardOverviewCard
          title="Total"
          additionalTitle="Guardians"
          value={adminStats?.data?.totalGuardians || 0}
          textColor="text-neutral-10"
          path="/dashboard/admin/guardians"
          icon={<FaUserFriends className="text-[#3B82F6]" />}
        />

        <DashboardOverviewCard
          title="Registered"
          additionalTitle="Tutors"
          value={adminStats?.data?.totalTutors || 0}
          textColor="text-neutral-10"
          path="/dashboard/admin/tutors"
          icon={<FaChalkboardTeacher className="text-[#10B981]" />}
        />

        <DashboardOverviewCard
          title="All"
          additionalTitle="Jobs"
          value={adminStats?.data?.totalJobs || 0}
          textColor="text-neutral-10"
          path="/dashboard/admin/all-jobs"
          icon={<FaBriefcase className="text-[#F59E0B]" />}
        />

        <DashboardOverviewCard
          title="Pending"
          additionalTitle="Jobs"
          value={adminStats?.data?.pendingJobs || 0}
          textColor="text-neutral-10"
          path="/dashboard/admin/posted-jobs"
          icon={<FaClock className="text-[#EF4444]" />}
        />

        <DashboardOverviewCard
          title="Total"
          additionalTitle="Payment"
          value={`৳${adminStats?.data?.totalPayment || 0}`}
          textColor="text-neutral-10"
          path="/dashboard/admin/payments-management"
          icon={<FaDollarSign className="text-[#8B5CF6]" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Registrations */}
        <ChartCard title="Monthly Registrations">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adminStats?.data?.monthlyRegData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Tutor"
                stroke={tutorColor}
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Guardian"
                stroke={guardianColor}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* ✅ Jobs Posted / Confirmed / Cancelled */}
        <ChartCard title="Jobs Status Per Month">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adminStats?.data?.jobPostData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* All Jobs */}
              <Area
                type="monotone"
                dataKey="Posted"
                stroke={jobsAreaColor}
                fill={jobsAreaColor}
                fillOpacity={0.1}
                strokeWidth={3}
                dot={false}
              />

              {/* ✅ Confirmed Jobs */}
              <Area
                type="monotone"
                dataKey="Confirmed"
                stroke={confirmedColor}
                fill={confirmedColor}
                fillOpacity={0.15}
                strokeWidth={3}
                dot={false}
              />

              {/* ❌ Cancelled Jobs */}
              <Area
                type="monotone"
                dataKey="Cancelled"
                stroke={cancelledColor}
                fill={cancelledColor}
                fillOpacity={0.15}
                strokeWidth={3}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
