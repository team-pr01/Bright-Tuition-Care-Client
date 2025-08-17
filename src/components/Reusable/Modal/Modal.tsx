import { RxCross1 } from "react-icons/rx";

type TModalProps = {
  heading?: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
};
const Modal: React.FC<TModalProps> = ({
  heading,
  isModalOpen,
  setIsModalOpen,
  children,
  width = "w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%]",
}) => {
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-neutral-5/60 backdrop-blur-xs flex items-center justify-center font-Nunito transition-all duration-500`}
    >
      <div
        className={`${
          isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${width} bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-3 md:p-6 transition-all duration-300 relative`}
      >
        <div className="flex items-center justify-between w-full">
          <h1 className="text-base md:text-xl font-semibold ">{heading}</h1>
          <RxCross1
            className="text-lg dark:text-[#abc2d3]/70 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
