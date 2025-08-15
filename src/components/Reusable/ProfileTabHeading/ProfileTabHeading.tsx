import { ICONS } from "../../../assets";

type TProfileTabHeadingProps = {
  heading: string;
  onClick: () => void;
};
const ProfileTabHeading: React.FC<TProfileTabHeadingProps> = ({
  heading,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-neutral-5 font-semibold text-2xl">{heading}</h1>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 text-primary-10 font-medium cursor-pointer"
      >
        <img src={ICONS.pen} alt="pen-icon" className="size-4" />
        Edit
      </button>
    </div>
  );
};

export default ProfileTabHeading;
