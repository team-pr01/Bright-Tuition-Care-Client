import { ICONS } from "../../../assets";

type TProfileTabHeadingProps = {
  heading: string;
  onClick: () => void;
  isProfileLocked: boolean;
  btnText?: string;
};
const ProfileTabHeading: React.FC<TProfileTabHeadingProps> = ({
  heading,
  onClick,
  isProfileLocked,
  btnText ="Edit Info",
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 justify-between w-full">
      <h1 className="text-neutral-5 font-semibold text-lg md:text-xl lg:text-2xl">
        {heading}
      </h1>
      {!isProfileLocked && (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-2 text-primary-10 font-medium cursor-pointer"
        >
          <img src={ICONS.pen} alt="pen-icon" className="size-4" />
          {btnText}
        </button>
      )}
    </div>
  );
};

export default ProfileTabHeading;
