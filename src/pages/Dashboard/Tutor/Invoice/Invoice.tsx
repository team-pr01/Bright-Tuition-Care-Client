/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InvoicePreview from "../../../../components/Dashboard/Tutor/InvoicePage/InvoicePreview/InvoicePreview";
import InvoiceCard from "../../../../components/Dashboard/Tutor/InvoicePage/InvoiceCard/InvoiceCard";

const invoices = [
  {
    id: "INV-101",
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
    id: "INV-102",
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

const Invoice = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  return (
    <div className="font-Nunito">
      {!selectedInvoice ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
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
    </div>
  );
};

export default Invoice;
