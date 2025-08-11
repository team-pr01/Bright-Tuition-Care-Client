import { Link } from "react-router-dom";

type TDashboardOverviewCardProps = {
  title: string;
  value: string;
  textColor: string;
  path: string;
};
const DashboardOverviewCard: React.FC<TDashboardOverviewCardProps> = ({
  title,
  value,
  textColor,
  path,
}) => {
  return (
    <Link
      to={path}
      className={`bg-gradient-to-r from-slate-50 to-sky-50 rounded-2xl border border-primary-40/10 py-[22px] px-5 font-Nunito ${textColor}`}
    >
      <h1 className="text-4xl font-bold text-center">
        {value}
      </h1>
      <h2 className="text-lg font-semibold text-center mt-2">
        {title}
      </h2>
    </Link>
  );
};

export default DashboardOverviewCard;
