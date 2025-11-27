import { RxCross1 } from "react-icons/rx";

const UnlockRequestReasonModal = ({
  unlockReason,
  isUnlockRequestReasonModalOpen,
  setIsUnlockRequestReasonModalOpen,
}: {
  unlockReason: string;
  isUnlockRequestReasonModalOpen: boolean;
  setIsUnlockRequestReasonModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`${
        isUnlockRequestReasonModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isUnlockRequestReasonModalOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        } w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg cursor-pointer absolute top-5 right-4"
          onClick={() => setIsUnlockRequestReasonModalOpen(false)}
        />

        <div className="w-full flex flex-col items-center gap-6">
          <div className="text-center text-neutral-900">
            <h1 className="text-xl font-semibold ">Unlock Reason</h1>
            <p className="text-sm mt-2">
              {unlockReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRequestReasonModal;
