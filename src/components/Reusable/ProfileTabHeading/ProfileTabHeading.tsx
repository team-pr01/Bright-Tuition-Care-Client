import { ICONS } from "../../../assets";

type TProfileTabHeadingProps = {
  heading: string;
  onClick: () => void;
  isProfileLocked: boolean;
};
const ProfileTabHeading: React.FC<TProfileTabHeadingProps> = ({
  heading,
  onClick,
  isProfileLocked,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
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
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileTabHeading;
