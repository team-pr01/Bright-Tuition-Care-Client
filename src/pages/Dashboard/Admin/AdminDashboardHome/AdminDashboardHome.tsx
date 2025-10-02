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

// --- 1. Data Interfaces ---

interface MonthlyRegistration {
  name: string;
  Tutor: number;
  Guardian: number;
}

// New interface for the Jobs Posted Chart
interface JobPostCount {
  name: string;
  JobsPosted: number;
}

// --- 2. Mock Data ---

const monthlyRegData: MonthlyRegistration[] = [
  { name: "Jan", Tutor: 45, Guardian: 25 },
  { name: "Feb", Tutor: 60, Guardian: 48 },
  { name: "Mar", Tutor: 75, Guardian: 55 },
  { name: "Apr", Tutor: 50, Guardian: 32 },
  { name: "May", Tutor: 40, Guardian: 35 },
  { name: "Jun", Tutor: 45, Guardian: 52 },
  { name: "Jul", Tutor: 30, Guardian: 25 },
  { name: "Aug", Tutor: 55, Guardian: 40 },
  { name: "Sep", Tutor: 65, Guardian: 50 },
  { name: "Oct", Tutor: 70, Guardian: 60 },
  { name: "Nov", Tutor: 58, Guardian: 45 },
  { name: "Dec", Tutor: 62, Guardian: 55 },
];

// Mock data for the new Jobs Posted chart (12 months)
const jobPostData: JobPostCount[] = [
  { name: "Jan", JobsPosted: 120 },
  { name: "Feb", JobsPosted: 400 },
  { name: "Mar", JobsPosted: 150 },
  { name: "Apr", JobsPosted: 220 },
  { name: "May", JobsPosted: 250 },
  { name: "Jun", JobsPosted: 300 },
  { name: "Jul", JobsPosted: 280 },
  { name: "Aug", JobsPosted: 350 },
  { name: "Sep", JobsPosted: 310 },
  { name: "Oct", JobsPosted: 380 },
  { name: "Nov", JobsPosted: 320 },
  { name: "Dec", JobsPosted: 400 },
];

// --- 3. Custom Tooltip Components ---

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

// --- 4. Chart Card Component ---

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 min-h-[400px]">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="h-[300px] w-full">{children}</div>
  </div>
);

// --- 5. Main Dashboard Component ---

const AdminDashboardHome = () => {
  const tutorColor = "#3B82F6"; // Blue for Tutor
  const guardianColor = "#10B981"; // Green for Guardian

  const jobsAreaColor = "#6366F1";
  const jobsGradientStop1 = "#818CF8";
  const jobsGradientStop2 = "#ffffff";

  return (
    <div className="font-Nunito flex flex-col gap-5">
      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-6">
        {/* Total Guardians */}
        <DashboardOverviewCard
          title="Total"
          additionalTitle="Guardians"
          value="1,250"
          textColor="text-neutral-10"
          path="/dashboard/admin/guardians"
          icon={<FaUserFriends className="text-[#3B82F6]" />} // Blue
        />

        {/* Registered Tutors */}
        <DashboardOverviewCard
          title="Registered"
          additionalTitle="Tutors"
          value="450"
          textColor="text-neutral-10"
          path="/dashboard/admin/tutors"
          icon={<FaChalkboardTeacher className="text-[#10B981]" />} // Green
        />

        {/* Posted Jobs */}
        <DashboardOverviewCard
          title="Posted"
          additionalTitle="Jobs"
          value="320"
          textColor="text-neutral-10"
          path="/dashboard/admin/posted-jobs"
          icon={<FaBriefcase className="text-[#F59E0B]" />} // Amber/Yellow
        />

        {/* Pending Jobs */}
        <DashboardOverviewCard
          title="Pending"
          additionalTitle="Jobs"
          value="45"
          textColor="text-neutral-10"
          path="/dashboard/admin/posted-jobs"
          icon={<FaClock className="text-[#EF4444]" />} // Red
        />

        {/* Total Payment Received */}
        <DashboardOverviewCard
          title="Total"
          additionalTitle="Payment"
          value="৳85,000"
          textColor="text-neutral-10"
          path="/dashboard/admin/payments-management"
          icon={<FaDollarSign className="text-[#8B5CF6]" />} // Purple
        />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Card 1: Monthly Registrations (Line Chart) --- */}
        <ChartCard title="Monthly Registrations">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyRegData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }} // reduce left margin
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis width={40} domain={[0, 80]} stroke="#6b7280" />{" "}
              {/* fixed width */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Tutor"
                stroke={tutorColor}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: tutorColor, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="Guardian"
                stroke={guardianColor}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: guardianColor, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* --- Card 2: Jobs Posted (Area Chart) --- */}
        <ChartCard title="Jobs Posted Per Month">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={jobPostData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={jobsGradientStop1}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={jobsGradientStop2}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 450]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="JobsPosted"
                stroke={jobsAreaColor}
                strokeWidth={3}
                fill="url(#colorJobs)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: jobsAreaColor,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
