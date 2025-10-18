/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsArrowLeft } from "react-icons/bs";
import Button from "../../../../Reusable/Button/Button";
import Modal from "../../../../Reusable/Modal/Modal";
import { useState } from "react";
import SelectPaymentMethod from "../../../Payment/SelectPaymentMethod/SelectPaymentMethod";
import SelectedPaymentMethod from "../../../Payment/SelectedPaymentMethod/SelectedPaymentMethod";

const InvoicePreview = ({
  invoice,
  onBack,
}: {
  invoice: any;
  onBack: () => void;
}) => {
  const user = { role: "tutor" };
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalType, setPaymentModalType] = useState<
    "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
  >("selectPaymentMethod");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bankTransfer" | "bKash" | "nagad" | string
  >("");
  return (
    <div className="bg-white shadow-md border border-primary-10/30 rounded-2xl p-5 lg:p-7 max-w-[600px] mx-auto font-Nunito">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary-10 mb-6 cursor-pointer"
      >
        <BsArrowLeft size={18} /> Back to Invoices
      </button>

      {/* Payment Helpline */}
      {user?.role !== "admin" && (
        <div className="border border-neutral-55/50 p-3 mb-6 rounded">
          <p className="font-semibold">Payment Helpline</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="font-semibold">Contact:</p>

            <a
              href="tel:01810786588"
              className="hover:underline text-primary-10"
            >
              {" "}
              01810-786588
            </a>
          </div>
        </div>
      )}

      {/* Bill To Section */}
      <div className="border border-neutral-55/50 rounded p-4">
        <h3 className="text-center font-semibold mb-4">Bill To</h3>

        <p>
          <span className="font-semibold">Name:</span> {invoice.student.name}
        </p>
        <p>
          <span className="font-semibold">Tutor ID:</span>{" "}
          {invoice.student.tutorId}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {invoice.student.phone}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p>
            <span className="font-semibold">Issue Date:</span>{" "}
            {invoice.issueDate}
          </p>
          <p>
            <span className="font-semibold">Due Date:</span>{" "}
            {invoice.dueDate || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            <span
              className={`${
                invoice.status === "paid" ? "text-green-600" : "text-red-500"
              } font-semibold text-sm h-fit w-fit`}
            >
              {invoice.status}
            </span>
          </p>
          {invoice.paidDate && (
            <p>
              <span className="font-semibold">Paid Date:</span>{" "}
              {invoice.paidDate}
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="font-semibold">Invoice Details:</p>
          <p>{invoice.details}</p>
        </div>

        <div className="mt-4">
          <p>
            <span className="font-semibold">Job ID:</span> {invoice.jobId}
          </p>
          <p>
            <span className="font-semibold">Invoice ID:</span> {invoice.id}
          </p>
          <p className="font-bold mt-2">
            <span className="font-semibold">Amount:</span> ৳{invoice.charge}
          </p>
        </div>

        {invoice?.status === "due" && user.role === "tutor" && (
          <div className="mt-6 flex items-center justify-center">
            <Button
              type="submit"
              label="Pay Now"
              variant="primary"
              className="py-2 lg:py-2"
              onClick={() => {
                setIsPaymentModalOpen(true);
                setPaymentModalType("selectPaymentMethod");
              }}
            />
          </div>
        )}
      </div>

      <Modal
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
        width="w-[90%] md:w-auto max-h-[600px] overflow-y-auto"
      >
        {paymentModalType === "selectPaymentMethod" ? (
          <SelectPaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setPaymentModalType={setPaymentModalType}
          />
        ) : (
          <SelectedPaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setPaymentModalType={setPaymentModalType}
            amount={invoice?.charge}
          />
        )}
      </Modal>
    </div>
  );
};

export default InvoicePreview;
