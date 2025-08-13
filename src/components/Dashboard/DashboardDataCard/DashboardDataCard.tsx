import { Link } from "react-router-dom";

type TDashboardDataCardProps = {
  title: string;
  value: string;
  description: string;
  icon: string;
  btnLabel: string;
  path: string;
  titleColor?: string;
  valueColor?: string;
};
const DashboardDataCard: React.FC<TDashboardDataCardProps> = ({
  title,
  value,
  description,
  icon,
  btnLabel,
  path,
  titleColor,
  valueColor,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex items-center gap-8">
      <img src={icon} alt="" className="w-24" />
      <div>
        <h1 className={`text-[28px] font-semibold ${titleColor}`}>
          {title}{" "}
          <span className={`text-[33px] font-bold ${valueColor}`}>{value}</span>
        </h1>
        <p className="mb-8">{description}</p>

        <Link
          to={path}
          className="bg-gradient-to-r from-cyan-500 to-primary-10 text-white text-sm py-2 px-4 rounded-md mt-5"
        >
          {btnLabel}
        </Link>
      </div>
    </div>
  );
};

export default DashboardDataCard;
