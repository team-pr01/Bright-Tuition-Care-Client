import { ICONS } from "../../../assets";

const SupportBar = () => {
  return (
    <div className="bg-primary-10 px-2 md:px-4 py-2 rounded-xl w-full flex items-center justify-between">
      <img src={ICONS.support} alt="" className="size-5 lg:size-10" />
      <a
        href="tel:09617-785588"
        className={`text-white text-xs md:text-xl font-bold leading-6 flex items-center gap-2`}
      >
        09617-785588{" "}
        <span className="text-[10px] md:text-sm font-normal">
          (09:00 AM - 10:00PM)
        </span>
      </a>
      <img
        src={ICONS.sendWhite}
        alt=""
        className="size-4 lg:size-12 animate-pulse"
      />
    </div>
  );
};

export default SupportBar;