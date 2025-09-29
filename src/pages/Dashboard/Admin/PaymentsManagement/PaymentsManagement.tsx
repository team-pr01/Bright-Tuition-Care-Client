/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import type {
  TableAction,
  TableHead,
} from "../../../../components/Reusable/Table/Table";
import Table from "../../../../components/Reusable/Table/Table";

const PaymentsManagement = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<
    string | null
  >(null);
  const [isProofModalOpen, setIsProofModalOpen] = useState<boolean>(false);

  // Table headers
  const paymentTheads: TableHead[] = [
    { key: "_id", label: "Payment ID" },
    { key: "senderName", label: "Sender Name" },
    { key: "senderAccountNumber", label: "Sender Account" },
    { key: "transactionId", label: "Transaction ID" },
    { key: "paymentMethod", label: "Payment Method" },
    { key: "amount", label: "Amount" },
    { key: "paidFor", label: "Paid For" },
    { key: "date", label: "Date" },
    { key: "paymentProof", label: "Payment Proof" },
  ];

  // Mock data
  const allPayments: any[] = [
    {
      _id: "PAY-001",
      senderName: "John Doe",
      senderAccountNumber: "+44 1234 567890",
      transactionId: "TXN-001",
      paymentMethod: "Credit Card",
      amount: 500,
      paidFor: "Platform Charge",
      date: "2025-09-28",
      paymentProof:
        "https://www.google.com/imgres?q=razorpay%20test%20card&imgurl=https%3A%2F%2Frazorpay.com%2Fdocs%2Fbuild%2Fbrowser%2Fassets%2Fimages%2Fsubscriptions-test-6.jpg&imgrefurl=https%3A%2F%2Frazorpay.com%2Fdocs%2Fpayments%2Fsubscriptions%2Ftest%2F&docid=_bGcD4V6yRgs3M&tbnid=Yb8RPRRzPAhZ-M&vet=12ahUKEwicl5WOrv6PAxX-SWwGHXMSBg0QM3oECCQQAA..i&w=551&h=358&hcb=2&ved=2ahUKEwicl5WOrv6PAxX-SWwGHXMSBg0QM3oECCQQAA",
      status: "Pending",
    },
    {
      _id: "PAY-002",
      senderName: "Jane Smith",
      senderAccountNumber: "+44 9876 543210",
      transactionId: "TXN-002",
      paymentMethod: "Bkash",
      amount: 1200,
      paidFor: "Verification",
      date: "2025-09-25",
      paymentProof:
        "https://www.google.com/imgres?q=razorpay%20test%20card&imgurl=https%3A%2F%2Frazorpay.com%2Fdocs%2Fbuild%2Fbrowser%2Fassets%2Fimages%2Fsubscriptions-test-6.jpg&imgrefurl=https%3A%2F%2Frazorpay.com%2Fdocs%2Fpayments%2Fsubscriptions%2Ftest%2F&docid=_bGcD4V6yRgs3M&tbnid=Yb8RPRRzPAhZ-M&vet=12ahUKEwicl5WOrv6PAxX-SWwGHXMSBg0QM3oECCQQAA..i&w=551&h=358&hcb=2&ved=2ahUKEwicl5WOrv6PAxX-SWwGHXMSBg0QM3oECCQQAA",
      status: "Approved",
    },
  ];

  // Actions
  const actions: TableAction<any>[] = [
    {
      label: "Approve",
      icon: <FiCheck className="inline text-green-600" />,
      onClick: (row) => {
        alert(`Approved Payment ${row._id}`);
      },
    },
  ];

  // Format table data
  const tableData = allPayments?.map((payment) => ({
    ...payment,
    amount: `৳${payment.amount}`,
    paymentProof: (
      <button
        className="text-primary-10 underline cursor-pointer"
        onClick={() => {
          setSelectedPaymentProof(payment.paymentProof);
          setIsProofModalOpen(true);
        }}
      >
        View Proof
      </button>
    ),
  }));

  const handleSearch = (q: string) => {
    setSearchQuery(q);
  };

  const statusFilterDropdown = (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer"
    >
      <option value="">All Payments</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
    </select>
  );

  return (
    <div>
      <Table<any>
        title="All Payments"
        description="Manage all payments on the platform."
        theads={paymentTheads}
        data={tableData}
        totalPages={5}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
        isLoading={false}
        onSearch={handleSearch}
        actions={actions}
        limit={limit}
        setLimit={setLimit}
        filters={statusFilterDropdown}
      />

      {isProofModalOpen && selectedPaymentProof && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          {/* Close Button */}
          <button
            onClick={() => setIsProofModalOpen(false)}
            className="absolute size-10 top-5 right-5 text-white text-2xl p-2 rounded-full hover:bg-gray-800 transition flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>

          {/* Fullscreen Image */}
          <img
            src={selectedPaymentProof}
            alt="Payment Proof"
            className="max-h-full max-w-full object-contain rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentsManagement;
