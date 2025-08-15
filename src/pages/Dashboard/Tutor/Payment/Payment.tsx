import { useState } from "react";
import { ICONS } from "../../../../assets";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import Button from "../../../../components/Reusable/Button/Button";
import Modal from "../../../../components/Reusable/Modal/Modal";
import SelectPaymentMethod from "../../../../components/Dashboard/Payment/SelectPaymentMethod/SelectPaymentMethod";
import SelectedPaymentMethod from "../../../../components/Dashboard/Payment/SelectedPaymentMethod/SelectedPaymentMethod";

const Payment = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalType, setPaymentModalType] = useState<
    "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
  >("selectPaymentMethod");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bankTransfer" | "bKash" | "nagad" | string
  >("");

  return (
    <div className="font-Nunito flex flex-col justify-between gap-5 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-primary-40/10 rounded-2xl py-7 px-5 flex flex-col items-center gap-5">
          <img
            src={ICONS.platformCharge}
            alt="platform-charge"
            className="size-20"
          />

          <div className="text-neutral-10 text-center">
            <h1 className="font-bold text-xl">
              Platform Charge <span className="text-primary-10">500 BDT</span>
            </h1>
            <p className="text-sm mt-[6px]">
              After finalizing a job to a tutor, we ask for (55%-Home Tutoring;
              55%-Online Tutoring; 35%-Package Tutoring; 55%-Group Tutoring)
              advance of his/her first month's payment only once for each
              tuition job.
            </p>
          </div>

          <Button
            type="button"
            label="Pay Now"
            variant="tertiary"
            className="py-2 lg:py-2"
            onClick={() => {
              setIsPaymentModalOpen(true);
              setPaymentModalType("selectPaymentMethod");
            }}
          />
        </div>
      </div>

      <SupportBar />

      <Modal
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
        width="w-auto max-h-[600px] overflow-y-auto"
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
            amount={500}
          />
        )}
      </Modal>
    </div>
  );
};

export default Payment;
