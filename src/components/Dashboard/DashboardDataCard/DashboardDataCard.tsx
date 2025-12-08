import { Link } from "react-router-dom";

type TDashboardDataCardProps = {
  title: string;
  badgeText?: string | null;
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
  badgeText,
  description,
  icon,
  btnLabel,
  path,
  titleColor,
  valueColor,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-primary-40/10 p-5 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
      <img src={icon} alt="" className="w-24" />
      <div>
        <h1 className={`text-xl lg:text-[25px] font-semibold ${titleColor}`}>
          {title}{" "}
          <span className={`text-2xl md:text-[30px] font-bold ${valueColor}`}>
            {value}
          </span>{" "}
          {badgeText && (
            <span className="bg-primary-10 px-2 py-1 text-[10px] text-white rounded-3xl">
              {badgeText}
            </span>
          )}
        </h1>
        <p className="mb-5 md:mb-8 text-sm md:text-base mt-2 md:mt-1">
          {description}
        </p>

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
