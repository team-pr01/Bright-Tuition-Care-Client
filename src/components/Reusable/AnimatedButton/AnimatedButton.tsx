import { Link } from "react-router-dom";

const AnimatedButton = () => {
  return (
    <Link
      to={"/hire-a-tutor"}
      className="bg-primary-10 py-2 lg:py-3 px-4 lg:px-6 text-white text-sm md:text-base leading-[24px] w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 animate-pulse-button"
    >
      Hire A Tutor (It's Free)
    </Link>
  );
};

export default AnimatedButton;
