import { ICONS } from "../../../assets";

const SupportBar = () => {
  return (
    <div className="bg-primary-10 px-4 py-2 rounded-xl w-full flex items-center justify-between">
      <img src={ICONS.support} alt="" className="size-10" />
      <a
        href="tel: +880 1616-012365"
        className={`text-white text-xl font-bold leading-6 flex items-center gap-2`}
      >
        +880 1616-012365{" "}
        <span className="text-sm font-normal">(10:00 AM - 10:00PM)</span>
      </a>
      <img src={ICONS.sendWhite} alt="" className="size-12 animate-pulse" />
    </div>
  );
};

export default SupportBar;
