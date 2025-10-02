/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiFileText } from "react-icons/fi";

type InvoiceCardProps = {
  invoice: any;
  onSelect: (invoice: any) => void;
};

const InvoiceCard = ({ invoice, onSelect }: InvoiceCardProps) => {
  return (
    <div className="border border-neutral-55/50 p-4 rounded-lg bg-white flex justify-between">
      <div className="flex flex-col gap-2">
        <p className="font-semibold flex items-center gap-2">
          <FiFileText size={20} /> {invoice.id}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Due Date: {invoice.dueDate || "N/A"}
        </p>
        <p className="text-sm text-gray-500">Amount: ৳ {invoice.charge}</p>

        <button
          onClick={() => onSelect(invoice)}
          className="px-3 py-1 bg-primary-10 text-white text-sm rounded-md hover:bg-primary-40 transition cursor-pointer mt-1 w-fit"
        >
          View Details
        </button>
      </div>

      <div
        className={`${
          invoice.status === "Paid" ? "bg-green-600" : "bg-red-500"
        } font-medium px-3 py-1 rounded-md text-sm text-white h-fit`}
      >
        {invoice.status}
      </div>
    </div>
  );
};

export default InvoiceCard;