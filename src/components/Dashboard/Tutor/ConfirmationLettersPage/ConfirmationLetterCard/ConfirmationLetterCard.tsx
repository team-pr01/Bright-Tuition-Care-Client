import { FaFileInvoice } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import type { TConfirmationLetter } from "../../../../../types/confirmationLetter.types";

const ConfirmationLetterCard = ({
  letter,
  setSelectedLetterId,
  setIsLetterPreviewOpen,
}: {
  letter: TConfirmationLetter;
  setSelectedLetterId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLetterPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      key={letter?._id}
      className="bg-white font-Nunito shadow-lg rounded-2xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaFileInvoice className="text-3xl text-primary-10" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Confirmation Letter
            {/* <span className="max-w-[160px] truncate" title={letter?._id}>
              #{letter?._id}
            </span> */}
            {/* <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(letter?._id || "");
                toast.success("Letter ID copied to clipboard");
              }}
              className="text-xs underline text-primary-10 hover:text-blue-600 cursor-pointer"
            >
              Copy
            </button> */}
          </h3>

          <p className="text-sm text-gray-500">
            Job ID: {letter?.jobId?.jobId}
          </p>
        </div>
      </div>

      <div className="mb-4 space-y-1 capitalize">
        <p className="text-sm text-neutral-20">
          <span className="font-medium">Tutor:</span> {letter?.tutorId?.name}
        </p>
        <p className="text-sm text-neutral-20">
          <span className="font-medium">Guardian:</span>{" "}
          {letter?.guardianId?.name || "N/A"}
        </p>
        <p className="text-sm text-neutral-20">
          <span className="font-medium">Tuition:</span> {letter?.jobId?.title}
        </p>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span className="flex items-center gap-1 text-xs text-neutral-20">
          <FiCalendar className="text-neutral-20" />
          {new Date(letter?.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => {
            setSelectedLetterId(letter?._id);
            setIsLetterPreviewOpen(true);
          }}
          className="text-sm bg-primary-10 text-white px-3 py-1 rounded hover:bg-primary-40 transition cursor-pointer"
        >
          View Letter
        </button>
      </div>
    </div>
  );
};

export default ConfirmationLetterCard;
