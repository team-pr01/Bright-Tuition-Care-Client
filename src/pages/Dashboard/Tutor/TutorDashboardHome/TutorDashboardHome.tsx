import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import DashboardDataCard from "../../../../components/Dashboard/DashboardDataCard/DashboardDataCard";
import DashboardOverviewCard from "../../../../components/Dashboard/DashboardOverviewCard/DashboardOverviewCard";
import NoticeBoard from "../../../../components/Dashboard/NoticeBoard/NoticeBoard";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import {
  FaBriefcase,
  FaClipboardCheck,
  FaUserCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useGetTutorDashboardStatsQuery } from "../../../../redux/Features/Tutor/tutorApi";
import LogoLoader from "../../../../components/Reusable/LogoLoader/LogoLoader";
const TutorDashboardHome = () => {
  const { data, isLoading } = useGetTutorDashboardStatsQuery({});
  console.log(data);
  const tutorStats = data?.data || {};
  const applications = tutorStats?.applications || {};

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = tutorStats?.profileCompleted || 0;

  const buildJobBoardPath = (tutorStats?: {
    preferredCities?: string[];
    preferredLocations?: string[];
  }) => {
    const params = new URLSearchParams();

    tutorStats?.preferredCities?.forEach((city) => {
      if (city) params.append("city", city);
    });

    tutorStats?.preferredLocations?.forEach((loc) => {
      if (loc) params.append("area", loc);
    });

    return `/dashboard/tutor/job-board?${params.toString()}`;
  };

  const formatCount = (value?: number) => String(value ?? 0).padStart(2, "0");

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-Nunito">
        <LogoLoader />
      </div>
    );
  }

  // const exampleTutor = {
  //   id: "738219",
  //   name: "John Smith",
  //   rating: 4.9,
  //   title: "Senior Mathematics Tutor",
  //   month: "November",
  //   year: "2024",
  // };
  return (
    <div className="flex flex-col gap-4 md:gap-0 font-Nunito">
      {/* Status cards */}
      <div className="flex items-center overflow-x-auto w-full gap-3 md:gap-6 bg-primary-10 md:bg-[#F2F5FC] py-5 px-3 lg:px-6 rounded-b-3xl md:rounded-b-none">
        <DashboardOverviewCard
          title="Applied"
          additionalTitle="Jobs"
          value={formatCount(applications?.applied)}
          textColor="text-white md:text-neutral-10"
          path="/dashboard/tutor/my-applications/applied"
          icon={<FaBriefcase />}
        />

        <DashboardOverviewCard
          title="Shortlisted"
          additionalTitle="Jobs"
          value={formatCount(applications?.shortlisted)}
          textColor="text-white md:text-primary-10"
          path="/dashboard/tutor/my-applications/shortlisted"
          icon={<FaClipboardCheck />}
        />

        <DashboardOverviewCard
          title="Appointed"
          value={formatCount(applications?.appointed)}
          textColor="text-white md:text-[#9C9700]"
          path="/dashboard/tutor/my-applications/appointed"
          icon={<FaUserCheck />}
        />

        <DashboardOverviewCard
          title="Confirmed"
          value={formatCount(applications?.confirmed)}
          textColor="text-white md:text-green-500"
          path="/dashboard/tutor/my-applications/confirmed"
          icon={<FaCheckCircle />}
        />

        <DashboardOverviewCard
          title="Cancelled"
          value={formatCount(applications?.cancelled)}
          textColor="text-white md:text-rose-500"
          path="/dashboard/tutor/my-applications/cancelled"
          icon={<FaTimesCircle />}
        />
      </div>

      <div className="px-3 lg:px-6 flex flex-col gap-4 lg:gap-7">
        <NoticeBoard notices={tutorStats?.notices} />
        {/* bg-gradient-to-r from-slate-50 to-sky-50 */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <TutorOfTheMonth tutor={exampleTutor} /> */}
          <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
            {/* Progress Circle */}
            <div className="relative size-32 flex-shrink-0">
              <svg viewBox="0 0 128 128" className="size-full -rotate-90">
                {/* Background Fill */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="currentColor"
                  className="text-neutral-100"
                />

                {/* Track */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-gray-200"
                />

                {/* Progress */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  className="text-primary-10 transition-all duration-700 ease-out"
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-10">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h1 className="text-xl lg:text-[28px] font-semibold text-primary-10">
                Profile Completed{" "}
                {progress !== 100 && (
                  <span className="text-2xl md:text-[33px] font-bold text-primary-10">
                    ({progress}%)
                  </span>
                )}
              </h1>

              <p className="mb-5 md:mb-8 text-sm md:text-base mt-2 md:mt-0">
                {progress === 100
                  ? "Please check the job board regularly and apply for tuition jobs that best match your profile."
                  : "A complete and well-organized profile improves your chances of being selected by guardians. Complete your tutor profile for the best responses."}
              </p>

              <Link
                to={
                  progress === 100
                    ? "/dashboard/tutor/job-board"
                    : "/dashboard/tutor/my-profile"
                }
                className="inline-block bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md"
              >
                {tutorStats?.profileCompleted === 100
                  ? "Apply Now"
                  : "Complete Profile"}
              </Link>
            </div>
          </div>

          <DashboardDataCard
            title={"Jobs Near You"}
            description={"Check out your nearby tuition jobs."}
            icon={ICONS.animatedLocation}
            value={""}
            titleColor={"text-primary-10/80"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={buildJobBoardPath(tutorStats)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardDataCard
            title={"Status"}
            description={"Get better response by verifying your profile."}
            icon={
              tutorStats?.isVerified
                ? ICONS.profileVerified
                : ICONS.profileUnverified
            }
            value={tutorStats?.isVerified ? "Verified" : "Not Verified"}
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            badgeText={
              tutorStats?.hasConfirmedAnyJob && !tutorStats?.isVerified
                ? "Recommended"
                : null
            }
            btnLabel={tutorStats?.isVerified ? "Verified" : "Verify Now"}
            path={"/dashboard/tutor/settings/profile-verification"}
          />

          <DashboardDataCard
            title={"Confirmation Letters"}
            description={
              tutorStats?.confirmationLetterCount === 0
                ? "You have not confirmed any tutors yet."
                : `You have successfully confirmed ${
                    tutorStats?.confirmationLetterCount
                  } tutor${
                    tutorStats?.confirmationLetterCount > 1 ? "s" : ""
                  }. Please click here to view and sign your confirmation letters to avoid any future complications.`
            }
            icon={ICONS.confirmationLetter}
            value={
              tutorStats?.confirmationLetterCount < 10
                ? `0${tutorStats?.confirmationLetterCount}`
                : tutorStats?.confirmationLetterCount || "00"
            }
            titleColor={"text-primary-10"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={"/dashboard/tutor/confirmation-letters"}
          />

          <DashboardDataCard
            title={"Invoice"}
            description={
              tutorStats?.invoiceCount === 0
                ? "No invoice is available because you have not confirmed any tuition jobs yet."
                : `You have ${tutorStats?.invoiceCount} invoices for your confirmed tuition jobs. Please visit the Payment section to view and complete the payments.`
            }
            icon={ICONS.invoice}
            value={
              tutorStats?.invoiceCount < 10
                ? `0${tutorStats?.invoiceCount}`
                : tutorStats?.invoiceCount || "00"
            }
            titleColor={"text-primary-10/80"}
            valueColor={"text-primary-10"}
            btnLabel={"View All"}
            path={"/dashboard/tutor/invoice"}
          />
        </div>

        <SupportBar />
      </div>
    </div>
  );
};

export default TutorDashboardHome;
