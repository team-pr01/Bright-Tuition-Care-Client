/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InvoiceCard from "../../../../components/Dashboard/Tutor/InvoicePage/InvoiceCard/InvoiceCard";
import InvoicePreview from "../../../../components/Dashboard/Tutor/InvoicePage/InvoicePreview/InvoicePreview";
import Button from "../../../../components/Reusable/Button/Button";
import SendInvoiceForm from "../../../../components/Admin/InvoiceManagementPage/SendInvoiceForm/SendInvoiceForm";
import Modal from "../../../../components/Reusable/Modal/Modal";

const invoices = [
  {
    _id: "INV-101",
    charge: 2000,
    status: "due",
    issueDate: "2025-10-01",
    dueDate: "2025-10-10",
    student: {
      name: "John Doe",
      tutorId: "T-501",
      phone: "0123456789",
    },
    jobId: "JOB-202",
    details: "Need Bangla Medium student tuition for class 9 student.",
  },
  {
    _id: "INV-102",
    charge: 1800,
    status: "paid",
    issueDate: "2025-09-20",
    paidDate: "2025-09-25",
    student: {
      name: "Sarah Lee",
      tutorId: "T-502",
      phone: "0198765432",
    },
    jobId: "JOB-303",
    details: "Math tuition for class 8 student.",
  },
];
const InvoiceManagement = () => {
  const [isSendInvoiceModalOpen, setIsSendInvoiceModalOpen] =
    useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [status, setStatus] = useState<string>("");
  return (
    <div className="font-Nunito flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Total Invoice (2)</h3>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
          >
            <option value="">All Status</option>
            {["pending", "paid"]?.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status}
              </option>
            ))}
          </select>
          <Button
            label="Send Invoice"
            onClick={() => {
              setIsSendInvoiceModalOpen(true);
            }}
            className="px-3 lg:px-3 py-2 lg:py-2 border-none"
          />
        </div>
      </div>
      {!selectedInvoice ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice._id}
              invoice={invoice}
              onSelect={setSelectedInvoice}
            />
          ))}
        </div>
      ) : (
        <InvoicePreview
          invoice={selectedInvoice}
          onBack={() => setSelectedInvoice(null)}
        />
      )}

      <Modal
      heading="Send Invoice"
        isModalOpen={isSendInvoiceModalOpen}
        setIsModalOpen={setIsSendInvoiceModalOpen}
        width="w-[90%] md:w-[30%] overflow-y-auto"
      >
        <SendInvoiceForm />
      </Modal>
    </div>
  );
};

export default InvoiceManagement;
